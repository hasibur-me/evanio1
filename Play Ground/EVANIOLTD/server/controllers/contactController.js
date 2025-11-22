import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/email.js';

// Public contact form endpoint (doesn't require authentication)
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, whatsapp, subject, message, service, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide name and email' });
    }

    // Try to find user by email, if exists, create a ticket for them
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    let ticketId = null;

    if (user) {
      // User exists, create a ticket
      const ticket = await Ticket.create({
        userId: user._id,
        subject: subject || 'Contact Form Inquiry',
        message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || whatsapp || 'N/A'}\n\nMessage:\n${message || 'No message provided'}`,
        type: 'inquiry',
      });

      // Add to user's tickets array
      user.tickets.push(ticket._id);
      await user.save();
      ticketId = ticket._id;
    }

    // Always save to Contact collection for admin access
    const contactData = {
      name,
      email: email.toLowerCase().trim(),
      phone: phone || null,
      whatsapp: whatsapp || null,
      subject: subject || 'Contact Form Inquiry',
      message: message || '',
      service: service || null,
      source: source || 'contact_form',
      userId: user ? user._id : null,
      ticketId: ticketId,
      status: 'new',
    };

    const contact = await Contact.create(contactData);
    
    console.log('Contact created successfully:', {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      source: contact.source,
    });

    // Send confirmation email to user
    try {
      await sendContactEmail(email, name, subject || 'Contact Form Inquiry', message || '');
      console.log('Confirmation email sent to:', email);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: contact._id,
      ticketId: ticketId,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: error.message || 'Failed to submit contact form. Please try again.' });
  }
};

// Get all contacts (Admin only)
export const getContacts = async (req, res) => {
  try {
    const { status, source, search, page = 1, limit = 50 } = req.query;
    
    const query = {};
    
    // Only add status to query if it's provided and not 'all'
    if (status && status !== 'all' && status.trim() !== '') {
      query.status = status;
    }
    
    // Only add source to query if it's provided and not 'all'
    if (source && source !== 'all' && source.trim() !== '') {
      query.source = source;
    }
    
    // Add search query if provided
    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } },
        { phone: { $regex: search.trim(), $options: 'i' } },
        { whatsapp: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    console.log('Contact query:', JSON.stringify(query, null, 2));

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await Contact.find(query)
      .populate('userId', 'name email')
      .populate('ticketId', 'subject status')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Contact.countDocuments(query);

    console.log(`Found ${contacts.length} contacts (total: ${total})`);

    res.json({
      contacts,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch contacts' });
  }
};

// Get single contact (Admin only)
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('ticketId', 'subject status messages');

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch contact' });
  }
};

// Update contact status (Admin only)
export const updateContact = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (status) {
      contact.status = status;
    }
    
    if (notes !== undefined) {
      contact.notes = notes;
    }

    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: error.message || 'Failed to update contact' });
  }
};

// Delete contact (Admin only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: error.message || 'Failed to delete contact' });
  }
};




