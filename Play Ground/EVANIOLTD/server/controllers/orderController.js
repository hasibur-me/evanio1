import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import Stripe from 'stripe';
import { triggerEmailSequence } from '../utils/emailSequences.js';
import { sendWebhookEvent } from '../utils/webhookSender.js';
import { sendOrderConfirmationEmail } from '../utils/email.js';

// Lazy initialize Stripe only if API key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key') {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// Get default workflow steps for an order
const getDefaultWorkflowSteps = (service) => {
  const defaultSteps = [
    { stepId: 'payment', stepName: 'Payment Confirmation', status: 'pending' },
    { stepId: 'planning', stepName: 'Planning & Preparation', status: 'pending' },
    { stepId: 'design', stepName: 'Design & Development', status: 'pending' },
    { stepId: 'review', stepName: 'Review & Feedback', status: 'pending' },
    { stepId: 'revision', stepName: 'Revisions', status: 'pending' },
    { stepId: 'finalization', stepName: 'Finalization', status: 'pending' },
    { stepId: 'delivery', stepName: 'Delivery & Handover', status: 'pending' }
  ];

  // Service-specific steps
  const serviceSteps = {
    'website-development': [
      { stepId: 'payment', stepName: 'Payment Confirmation', status: 'pending' },
      { stepId: 'planning', stepName: 'Planning & Wireframing', status: 'pending' },
      { stepId: 'design', stepName: 'UI/UX Design', status: 'pending' },
      { stepId: 'development', stepName: 'Development', status: 'pending' },
      { stepId: 'testing', stepName: 'Testing & QA', status: 'pending' },
      { stepId: 'review', stepName: 'Client Review', status: 'pending' },
      { stepId: 'deployment', stepName: 'Deployment & Launch', status: 'pending' }
    ],
    'logo-branding': [
      { stepId: 'payment', stepName: 'Payment Confirmation', status: 'pending' },
      { stepId: 'research', stepName: 'Research & Discovery', status: 'pending' },
      { stepId: 'concepts', stepName: 'Concept Development', status: 'pending' },
      { stepId: 'refinement', stepName: 'Design Refinement', status: 'pending' },
      { stepId: 'review', stepName: 'Client Review', status: 'pending' },
      { stepId: 'finalization', stepName: 'Finalization', status: 'pending' },
      { stepId: 'delivery', stepName: 'Asset Delivery', status: 'pending' }
    ]
  };

  return serviceSteps[service] || defaultSteps;
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      service,
      serviceSlug,
      package: packageName,
      addons,
      amount,
      paymentMethod,
      customerDetails,
      projectBrief
    } = req.body;

    if (!service || !serviceSlug || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const workflowSteps = getDefaultWorkflowSteps(serviceSlug);
    
    // Calculate estimated delivery date (default: 14 days from now)
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 14);

    const order = await Order.create({
      userId: req.user._id,
      service,
      serviceSlug,
      package: packageName || '',
      addons: addons || [],
      amount,
      paymentMethod,
      customerDetails: customerDetails || {
        name: req.user.name,
        email: req.user.email,
        phone: '',
        company: ''
      },
      projectBrief: projectBrief || '',
      workflowSteps: workflowSteps,
      estimatedDeliveryDate: estimatedDeliveryDate,
      timeline: [{
        event: 'created',
        title: 'Order Created',
        description: `Order ${service}${packageName ? ` - ${packageName}` : ''} has been created`,
        changedBy: req.user._id,
        metadata: {
          service: service,
          amount: amount,
          paymentMethod: paymentMethod
        }
      }]
    });

    // Add order to user's orders array
    const user = await User.findById(req.user._id);
    if (user) {
      user.orders.push(order._id);
      await user.save();

      // Add notification
      user.notifications.push({
        message: `Order ${order.orderNumber} created successfully`,
        type: 'order',
        read: false
      });
      await user.save();
    }

    // Trigger order placed email sequence
    await triggerEmailSequence('orderPlaced', order._id);
    
    // Check if this is user's first order and complete referral if applicable
    const userOrders = await Order.countDocuments({ userId: req.user._id });
    if (userOrders === 1) {
      const { completeReferral } = await import('./referralController.js');
      await completeReferral(order._id, req.user._id);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create checkout session for Stripe payment
export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({ message: 'Stripe is not configured' });
    }

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await Order.findById(orderId).populate('userId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (order.paymentStatus !== 'pending') {
      return res.status(400).json({ message: 'Order already processed' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${order.service}${order.package ? ` - ${order.package}` : ''}`,
              description: order.projectBrief || `Order for ${order.service}`,
            },
            unit_amount: Math.round(order.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?order_id=${order._id}&canceled=true`,
      client_reference_id: order._id.toString(),
      metadata: {
        orderId: order._id.toString(),
      },
    });

    // Create payment record
    const payment = await Payment.create({
      userId: req.user._id,
      stripeSessionId: session.id,
      amount: order.amount,
      status: 'pending',
    });

    // Update order with payment info
    order.stripeSessionId = session.id;
    order.paymentId = payment._id;
    await order.save();

    // Add payment to user's payments array
    const user = await User.findById(req.user._id);
    if (user) {
      user.payments.push(payment._id);
      await user.save();
    }

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Process bank transfer payment
export const processBankTransfer = async (req, res) => {
  try {
    const { orderId, bankTransferDetails } = req.body;

    if (!orderId || !bankTransferDetails) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate required bank transfer details
    if (!bankTransferDetails.transactionId || !bankTransferDetails.transactionId.trim()) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    if (!bankTransferDetails.bankName || !bankTransferDetails.bankName.trim()) {
      return res.status(400).json({ message: 'Bank name is required' });
    }

    if (!bankTransferDetails.accountNumber || !bankTransferDetails.accountNumber.trim()) {
      return res.status(400).json({ message: 'Account number is required' });
    }

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (order.paymentMethod !== 'bank_transfer') {
      return res.status(400).json({ message: 'Invalid payment method for this order' });
    }

    // Update order with bank transfer details
    order.bankTransferDetails = {
      transactionId: bankTransferDetails.transactionId.trim(),
      bankName: bankTransferDetails.bankName.trim(),
      accountNumber: bankTransferDetails.accountNumber.trim(),
      notes: bankTransferDetails.notes || '',
      proofOfPayment: bankTransferDetails.proofOfPayment || ''
    };
    order.paymentStatus = 'pending'; // Will be confirmed by admin
    await order.save();

    // Add notification to admin
    const adminUsers = await User.find({ role: 'admin' });
    for (const admin of adminUsers) {
      admin.notifications.push({
        message: `Bank transfer payment submitted for order ${order.orderNumber}`,
        type: 'order',
        read: false
      });
      await admin.save();
    }

    // Add notification to user
    const user = await User.findById(req.user._id);
    if (user) {
      user.notifications.push({
        message: `Bank transfer details submitted for order ${order.orderNumber}. Payment is pending admin confirmation.`,
        type: 'order',
        read: false
      });
      await user.save();
    }

    res.json({ message: 'Bank transfer details submitted successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for the authenticated user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('paymentId')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('paymentId')
      .populate('userId', 'name email')
      .populate('notes.author', 'name email')
      .populate('timeline.changedBy', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Filter out internal notes for non-admin users
    if (req.user.role !== 'admin') {
      order.notes = order.notes.filter(note => !note.isInternal);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('paymentId')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, adminNotes } = req.body;
    
    // Validate that at least one field is being updated
    if (!orderStatus && !paymentStatus && adminNotes === undefined) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    const order = await Order.findById(req.params.id).populate('userId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    let hasChanges = false;
    const oldStatus = order.orderStatus;

    if (orderStatus && orderStatus.trim() && orderStatus !== order.orderStatus) {
      order.orderStatus = orderStatus;
      hasChanges = true;
    }

    if (paymentStatus && paymentStatus.trim() && paymentStatus !== order.paymentStatus) {
      // If marking payment as completed, also update order status
      if (paymentStatus === 'completed' && order.paymentStatus !== 'completed') {
        if (order.orderStatus === 'pending') {
          order.orderStatus = 'confirmed';
          hasChanges = true;
          
          // Add timeline event for status change
          if (!order.timeline) order.timeline = [];
          order.timeline.push({
            event: 'status_changed',
            title: 'Order Confirmed',
            description: 'Order status automatically updated to confirmed after payment',
            changedBy: req.user._id,
            metadata: {
              oldStatus: 'pending',
              newStatus: 'confirmed',
              reason: 'payment_received'
            }
          });
        }
        
        // Add timeline event for payment
        if (!order.timeline) order.timeline = [];
        order.timeline.push({
          event: 'payment_received',
          title: 'Payment Received',
          description: `Payment of $${order.amount?.toFixed(2)} has been confirmed`,
          changedBy: req.user._id,
          metadata: {
            amount: order.amount,
            paymentMethod: order.paymentMethod
          }
        });
      } else if (paymentStatus === 'failed') {
        if (!order.timeline) order.timeline = [];
        order.timeline.push({
          event: 'payment_failed',
          title: 'Payment Failed',
          description: 'Payment processing failed',
          changedBy: req.user._id,
          metadata: {
            oldStatus: oldPaymentStatus
          }
        });
      }
      
      order.paymentStatus = paymentStatus;
      hasChanges = true;
      
      // Update payment record if exists
      if (order.paymentId) {
        const payment = await Payment.findById(order.paymentId);
        if (payment && payment.status !== paymentStatus) {
          payment.status = paymentStatus === 'completed' ? 'completed' : (paymentStatus === 'failed' ? 'failed' : payment.status);
          await payment.save();
        }
      }
    }

    if (adminNotes !== undefined && adminNotes !== order.adminNotes) {
      order.adminNotes = adminNotes || '';
      hasChanges = true;
    }

    if (!hasChanges) {
      return res.json({ message: 'No changes to update', order });
    }

    await order.save();

    // Trigger email sequence if order status changed
    if (orderStatus && orderStatus !== oldStatus) {
      await triggerEmailSequence('orderStatusChanged', order._id, oldStatus, orderStatus);
    }

        // Trigger follow-up email if order is completed
        if (orderStatus === 'completed' && oldStatus !== 'completed') {
          await triggerEmailSequence('orderCompletedFollowUp', order._id);
          // Trigger webhook event
          await sendWebhookEvent('order.completed', {
            orderId: order._id,
            orderNumber: order.orderNumber,
            service: order.service,
            amount: order.amount,
            userId: order.userId
          });
        }
        
        // Trigger webhook for order status update
        if (orderStatus && orderStatus !== oldStatus) {
          await sendWebhookEvent('order.updated', {
            orderId: order._id,
            orderNumber: order.orderNumber,
            oldStatus,
            newStatus: orderStatus,
            service: order.service,
            amount: order.amount
          });
        }
        
        // Trigger webhook for payment status update
        if (paymentStatus && paymentStatus !== oldPaymentStatus) {
          if (paymentStatus === 'completed') {
            await sendWebhookEvent('payment.completed', {
              orderId: order._id,
              orderNumber: order.orderNumber,
              amount: order.amount,
              paymentMethod: order.paymentMethod
            });
          } else if (paymentStatus === 'failed') {
            await sendWebhookEvent('payment.failed', {
              orderId: order._id,
              orderNumber: order.orderNumber,
              amount: order.amount,
              paymentMethod: order.paymentMethod
            });
          }
        }

    // Add notification to user
    const user = await User.findById(order.userId._id);
    if (user) {
      let messages = [];
      
      if (orderStatus) {
        messages.push(`Order ${order.orderNumber} status updated to ${orderStatus}`);
      }
      if (paymentStatus === 'completed') {
        messages.push(`Payment for order ${order.orderNumber} has been confirmed`);
      }
      if (adminNotes && adminNotes.trim()) {
        messages.push(`Admin note added to order ${order.orderNumber}`);
      }
      
      // Only create notification if there's at least one message
      if (messages.length > 0) {
        const message = messages.join('. ');
        if (message && message.trim()) {
          user.notifications.push({
            message: message.trim(),
            type: 'order',
            read: false
          });
          await user.save();
        }
      }
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stripe webhook handler for order completion
export const stripeWebhook = async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({ message: 'Stripe is not configured' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId || session.client_reference_id;

    if (orderId) {
      const order = await Order.findById(orderId).populate('userId');
      if (order && session.payment_status === 'paid') {
        order.paymentStatus = 'completed';
        order.orderStatus = 'confirmed';
        
        // Initialize workflow steps if not present
        if (!order.workflowSteps || order.workflowSteps.length === 0) {
          order.workflowSteps = getDefaultWorkflowSteps(order.serviceSlug);
        }
        
        // Mark payment step as completed
        const paymentStep = order.workflowSteps.find(s => s.stepId === 'payment');
        if (paymentStep) {
          paymentStep.status = 'completed';
          paymentStep.completedAt = new Date();
        }
        
        // Set next step as current if payment is completed
        const nextStep = order.workflowSteps.find(s => s.status === 'pending' && s.stepId !== 'payment');
        if (nextStep) {
          order.currentStep = nextStep.stepId;
        }
        
        await order.save();

        // Update payment record
        if (order.paymentId) {
          const payment = await Payment.findById(order.paymentId);
          if (payment) {
            payment.status = 'completed';
            await payment.save();
          }
        }

        // Add notification to user
        const user = await User.findById(order.userId._id);
        if (user) {
          user.notifications.push({
            message: `Payment for order ${order.orderNumber} completed successfully`,
            type: 'order',
            read: false
          });
          await user.save();
        }
      }
    }
  }

  res.json({ received: true });
};

// Update workflow steps for an order
export const updateOrderWorkflowSteps = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { stepId, stepName, status, notes } = req.body;
    const orderId = req.params.id;

    if (!stepId || !status) {
      return res.status(400).json({ message: 'Step ID and Status are required' });
    }

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Initialize workflow steps if not present
    if (!order.workflowSteps || order.workflowSteps.length === 0) {
      order.workflowSteps = getDefaultWorkflowSteps(order.serviceSlug);
      await order.save(); // Save after initialization
      // Reload to get the initialized steps
      order = await Order.findById(orderId);
    }

    // Find and update the step
    const stepIndex = order.workflowSteps.findIndex(step => step.stepId === stepId);
    if (stepIndex === -1) {
      return res.status(404).json({ message: 'Workflow step not found. Please try initializing workflow steps first.' });
    }

    const step = order.workflowSteps[stepIndex];
    const previousStatus = step.status;

    // Update step name if provided (admin can manually input step title)
    if (stepName !== undefined && stepName.trim() !== '') {
      step.stepName = stepName.trim();
    }

    // Update step status
    step.status = status;
    if (notes !== undefined) {
      step.notes = notes || '';
    }

    // Update completedAt timestamp
    if (status === 'completed' && previousStatus !== 'completed') {
      step.completedAt = new Date();
    } else if (status !== 'completed') {
      step.completedAt = null;
    }

    // Update current step
    if (status === 'in-progress') {
      order.currentStep = stepId;
    } else if (status === 'completed' && order.currentStep === stepId) {
      // Find next pending step
      const nextStep = order.workflowSteps.find(s => 
        s.status === 'pending' || s.status === 'in-progress'
      );
      order.currentStep = nextStep ? nextStep.stepId : null;
    }

    // Auto-update order status based on workflow
    const oldOrderStatus = order.orderStatus;
    if (order.workflowSteps.every(s => s.status === 'completed')) {
      order.orderStatus = 'completed';
      if (oldOrderStatus !== 'completed') {
        order.actualDeliveryDate = new Date();
        order.timeline.push({
          event: 'completed',
          title: 'Order Completed',
          description: 'All workflow steps have been completed',
          changedBy: req.user._id,
          metadata: { stepId: stepId }
        });
      }
    } else if (order.workflowSteps.some(s => s.status === 'in-progress')) {
      if (order.orderStatus === 'pending' || order.orderStatus === 'confirmed') {
        order.orderStatus = 'in-progress';
      }
    }

    // Add timeline event for step update
    if (status === 'completed' && previousStatus !== 'completed') {
      order.timeline.push({
        event: 'step_completed',
        title: `${step.stepName} Completed`,
        description: notes || `Step "${step.stepName}" has been marked as completed`,
        changedBy: req.user._id,
        metadata: { stepId: stepId, stepName: step.stepName }
      });
    } else if (status === 'in-progress' && previousStatus !== 'in-progress') {
      order.timeline.push({
        event: 'step_started',
        title: `${step.stepName} Started`,
        description: `Work on "${step.stepName}" has begun`,
        changedBy: req.user._id,
        metadata: { stepId: stepId, stepName: step.stepName }
      });
    }

    await order.save();

    // Add notification to user
    const user = await User.findById(order.userId._id);
    if (user) {
      let message = `Order ${order.orderNumber}: ${step.stepName} - ${status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Updated'}`;
      if (notes) {
        message += ` - ${notes}`;
      }
      user.notifications.push({
        message,
        type: 'order',
        read: false
      });
      await user.save();
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating workflow steps:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add note to order
export const addOrderNote = async (req, res) => {
  try {
    const { content, isInternal } = req.body;
    const orderId = req.params.id;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Note content is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Only admins can add internal notes
    const noteIsInternal = isInternal && req.user.role === 'admin';

    const note = {
      author: req.user._id,
      content: content.trim(),
      isAdmin: req.user.role === 'admin',
      isInternal: noteIsInternal
    };

    order.notes.push(note);

    // Add timeline event
    if (!order.timeline) order.timeline = [];
    order.timeline.push({
      event: 'note_added',
      title: noteIsInternal ? 'Internal Note Added' : 'Note Added',
      description: content.trim(),
      changedBy: req.user._id,
      metadata: { isInternal: noteIsInternal }
    });

    await order.save();

    // Populate author info
    await order.populate('notes.author', 'name email');
    await order.populate('timeline.changedBy', 'name email');

    res.json(order);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update estimated delivery date
export const updateEstimatedDeliveryDate = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { estimatedDeliveryDate } = req.body;
    const orderId = req.params.id;

    if (!estimatedDeliveryDate) {
      return res.status(400).json({ message: 'Estimated delivery date is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const oldDate = order.estimatedDeliveryDate;
    order.estimatedDeliveryDate = new Date(estimatedDeliveryDate);

    // Add timeline event if date changed
    if (!oldDate || oldDate.getTime() !== order.estimatedDeliveryDate.getTime()) {
      if (!order.timeline) order.timeline = [];
      order.timeline.push({
        event: 'status_changed',
        title: 'Estimated Delivery Date Updated',
        description: `Estimated delivery date set to ${new Date(estimatedDeliveryDate).toLocaleDateString()}`,
        changedBy: req.user._id,
        metadata: {
          oldDate: oldDate,
          newDate: order.estimatedDeliveryDate
        }
      });
    }

    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error updating delivery date:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get order timeline
export const getOrderTimeline = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate('timeline.changedBy', 'name email')
      .select('timeline orderNumber');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Sort timeline by date (newest first)
    const timeline = order.timeline.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ timeline });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ message: error.message });
  }
};

