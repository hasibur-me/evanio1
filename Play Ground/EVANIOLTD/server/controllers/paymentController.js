import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { sendPaymentSuccessEmail } from '../utils/email.js';

// Lazy initialize Stripe only if API key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key') {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({ message: 'Stripe is not configured' });
    }

    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description || 'Evanio Service',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment=canceled`,
      client_reference_id: req.user._id.toString(),
    });

    // Create payment record
    const payment = await Payment.create({
      userId: req.user._id,
      stripeSessionId: session.id,
      amount,
      status: 'pending',
    });

    // Add to user's payments array
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

export const paymentSuccess = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({ message: 'Stripe is not configured' });
    }

    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ message: 'Session ID required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Update payment status
    const payment = await Payment.findOne({ stripeSessionId: session_id });
    if (payment) {
      payment.status = session.payment_status === 'paid' ? 'completed' : 'failed';
      await payment.save();

      if (payment.status === 'completed') {
        const user = await User.findById(payment.userId);
        if (user) {
          user.notifications.push({
            message: `Payment of $${payment.amount} completed successfully`,
            type: 'payment',
            read: false
          });
          await user.save();

          // Send email
          await sendPaymentSuccessEmail(user.email, user.name, payment.amount);
        }
      }
    }

    res.json({ message: 'Payment processed', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    let payments;
    
    if (req.user.role === 'admin') {
      payments = await Payment.find()
        .populate('userId', 'name email')
        .sort({ date: -1 });
    } else {
      payments = await Payment.find({ userId: req.user._id })
        .sort({ date: -1 });
    }

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Webhook handler for Stripe
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
    
    const payment = await Payment.findOne({ stripeSessionId: session.id });
    if (payment) {
      payment.status = 'completed';
      await payment.save();

      const user = await User.findById(payment.userId);
      if (user) {
        user.notifications.push({
          message: `Payment of $${payment.amount} completed successfully`,
          type: 'payment',
          read: false
        });
        await user.save();
        
        await sendPaymentSuccessEmail(user.email, user.name, payment.amount);
      }
    }
  }

  res.json({ received: true });
};


