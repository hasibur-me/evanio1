import Invoice from '../models/Invoice.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';
import { generateInvoicePDF } from '../utils/pdfGenerator.js';

// Generate invoice from order
export const generateInvoice = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await Order.findById(orderId).populate('userId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if invoice already exists
    const existingInvoice = await Invoice.findOne({ orderId });
    if (existingInvoice) {
      return res.json(existingInvoice);
    }

    // Get user billing info
    const user = await User.findById(order.userId._id);
    const billingAddress = {
      name: user.name,
      email: user.email,
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      country: user.country || ''
    };

    // Create invoice items
    const items = [{
      description: `${order.service}${order.package ? ` - ${order.package}` : ''}`,
      quantity: 1,
      unitPrice: order.amount,
      total: order.amount
    }];

    // Add addons if any
    if (order.addons && order.addons.length > 0) {
      order.addons.forEach(addon => {
        items.push({
          description: addon.name,
          quantity: 1,
          unitPrice: addon.price,
          total: addon.price
        });
      });
    }

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = 0; // Add tax calculation if needed
    const discount = 0; // Add discount if any
    const total = subtotal + tax - discount;

    const invoice = await Invoice.create({
      orderId,
      userId: order.userId._id,
      items,
      subtotal,
      tax,
      discount,
      total,
      currency: user.currency || 'USD',
      billingAddress,
      paymentMethod: order.paymentMethod,
      paymentId: order.paymentId || null,
      status: order.paymentStatus === 'completed' ? 'paid' : 'sent',
      paidAt: order.paymentStatus === 'completed' ? order.updatedAt : null
    });

    // Generate PDF
    try {
      const pdfResult = await generateInvoicePDF(invoice, order, user);
      invoice.pdfUrl = pdfResult.url;
      await invoice.save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Continue without PDF
    }

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's invoices
export const getMyInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id })
      .populate('orderId', 'orderNumber service')
      .sort({ invoiceDate: -1 });

    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single invoice
export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate('orderId', 'orderNumber service')
      .populate('userId', 'name email');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if user owns this invoice or is admin
    if (invoice.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: error.message });
  }
};

// Send invoice via email
export const sendInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id).populate('userId').populate('orderId');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check permissions
    if (invoice.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Send email with invoice
    const invoiceUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/invoices/${invoice._id}`;
    
    await sendEmail(invoice.userId.email, 'custom', {
      subject: `Invoice ${invoice.invoiceNumber} from Evanio`,
      message: `Dear ${invoice.userId.name},\n\nPlease find your invoice ${invoice.invoiceNumber} attached.\n\nInvoice Total: $${invoice.total.toFixed(2)}\nDue Date: ${new Date(invoice.dueDate).toLocaleDateString()}\n\nView Invoice: ${invoiceUrl}\n\nThank you for your business!`,
      actionUrl: invoiceUrl,
      actionText: 'View Invoice'
    });

    invoice.sentAt = new Date();
    invoice.status = invoice.status === 'draft' ? 'sent' : invoice.status;
    await invoice.save();

    res.json({ message: 'Invoice sent successfully', invoice });
  } catch (error) {
    console.error('Error sending invoice:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const [invoices, total] = await Promise.all([
      Invoice.find(filter)
        .populate('userId', 'name email')
        .populate('orderId', 'orderNumber')
        .sort({ invoiceDate: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Invoice.countDocuments(filter)
    ]);

    res.json({
      invoices,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update invoice status (when payment is received)
export const updateInvoiceStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { status } = req.body;

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    invoice.status = status;
    if (status === 'paid') {
      invoice.paidAt = new Date();
    }

    await invoice.save();
    res.json(invoice);
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ message: error.message });
  }
};

