import { Resend } from 'resend';
import getEmailTemplate from './emailTemplates.js';
import User from '../models/User.js';

// Lazy initialize Resend only if API key is available
const getResend = () => {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key') {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Check if user wants to receive this type of email
const shouldSendEmail = async (email, emailType) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.emailPreferences) {
      return true; // Default to sending if preferences not set
    }
    
    const preferences = user.emailPreferences;
    
    // Always send critical emails (payment, order status)
    if (['payment', 'order'].includes(emailType)) {
      return preferences.receiveCriticalEmails !== false;
    }
    
    // Check specific preference
    const preferenceMap = {
      'welcome': 'receiveWelcomeEmails',
      'order': 'receiveOrderEmails',
      'payment': 'receivePaymentEmails',
      'document': 'receiveDocumentEmails',
      'ticket': 'receiveTicketEmails',
      'marketing': 'receiveMarketingEmails',
      'system': 'receiveSystemEmails'
    };
    
    const preferenceKey = preferenceMap[emailType];
    if (!preferenceKey) return true; // Default to sending
    
    return preferences[preferenceKey] !== false;
  } catch (error) {
    console.error('Error checking email preferences:', error);
    return true; // Default to sending on error
  }
};

// Send email with template and preference checking
export const sendEmail = async (email, templateName, variables = {}) => {
  const resend = getResend();
  if (!resend) {
    const errorMsg = 'Resend API key not configured. Please set RESEND_API_KEY in your .env file.';
    console.error('❌ EMAIL ERROR:', errorMsg);
    console.error('📧 Email that would have been sent:', {
      to: email,
      template: templateName,
      subject: variables.subject || 'N/A'
    });
    return { success: false, error: errorMsg };
  }

  // Check email preferences
  const emailType = templateName === 'welcome' ? 'welcome' : 
                    templateName.includes('order') ? 'order' :
                    templateName.includes('payment') ? 'payment' :
                    templateName.includes('document') ? 'document' :
                    templateName.includes('ticket') ? 'ticket' : 'system';
  
  const canSend = await shouldSendEmail(email, emailType);
  if (!canSend) {
    console.log(`Email preferences: User ${email} has opted out of ${emailType} emails.`);
    return { success: false, skipped: true, reason: 'User preferences' };
  }

  try {
    const html = getEmailTemplate(templateName, {
      ...variables,
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
    });

    if (!html) {
      throw new Error(`Template ${templateName} not found`);
    }

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Evanio <onboarding@resend.dev>',
      to: email,
      subject: variables.subject || getSubjectForTemplate(templateName, variables),
      html: html
    });

    console.log(`✅ Email sent successfully: ${templateName} to ${email} (ID: ${result.data?.id})`);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error(`❌ Error sending ${templateName} email to ${email}:`, error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data || 'No response data',
      status: error.response?.status || 'No status'
    });
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
};

// Get subject line for template
const getSubjectForTemplate = (templateName, variables) => {
  const subjects = {
    'welcome': 'Welcome to Evanio',
    'orderConfirmation': `Order Confirmation - ${variables.orderNumber || ''}`,
    'orderStatusUpdate': `Order Update - ${variables.orderNumber || ''}`,
    'paymentSuccess': 'Payment Successful',
    'documentUploaded': 'New Document Available',
    'ticketReply': `Response to: ${variables.ticketSubject || 'Your Support Ticket'}`,
    'custom': variables.subject || 'Message from Evanio'
  };
  return subjects[templateName] || 'Message from Evanio';
};

export const sendWelcomeEmail = async (email, name) => {
  return await sendEmail(email, 'welcome', { name });
};

export const sendPaymentSuccessEmail = async (email, name, amount, orderNumber = null, paymentMethod = 'Stripe') => {
  return await sendEmail(email, 'paymentSuccess', { 
    name, 
    amount, 
    orderNumber,
    paymentMethod 
  });
};

export const sendDocumentUploadedEmail = async (email, name, documentTitle, description = null) => {
  return await sendEmail(email, 'documentUploaded', { 
    name, 
    documentTitle,
    description 
  });
};

export const sendTicketReplyEmail = async (email, name, ticketSubject, ticketNumber, message = null) => {
  return await sendEmail(email, 'ticketReply', { 
    name, 
    ticketSubject,
    ticketNumber,
    message 
  });
};

// New email functions using templates
export const sendOrderConfirmationEmail = async (email, name, orderNumber, service, amount, status = 'pending') => {
  return await sendEmail(email, 'orderConfirmation', { 
    name, 
    orderNumber, 
    service, 
    amount, 
    status 
  });
};

export const sendOrderStatusUpdateEmail = async (email, name, orderNumber, service, status, message = null) => {
  return await sendEmail(email, 'orderStatusUpdate', { 
    name, 
    orderNumber, 
    service, 
    status, 
    message 
  });
};

export const sendCustomEmail = async (email, subject, message, actionUrl = null, actionText = null) => {
  return await sendEmail(email, 'custom', { 
    subject, 
    message, 
    actionUrl, 
    actionText 
  });
};

export const sendContactEmail = async (email, name, subject, message) => {
  // Send confirmation email to user
  await sendEmail(email, 'custom', {
    subject: 'Thank You for Contacting Us',
    message: `Hi ${name},\n\nWe have received your message regarding: "${subject}"\n\nOur team will review your inquiry and get back to you as soon as possible.\n\nThank you for reaching out!`
  });

  // Send notification email to admin (optional - if you have an admin email configured)
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(adminEmail, 'custom', {
      subject: `New Contact Form Submission: ${subject}`,
      message: `New contact form submission:\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`
    });
  }
};

export const sendServiceRequestEmail = async (email, name, service) => {
  // Send confirmation email to user
  await sendEmail(email, 'custom', {
    subject: 'Service Request Received',
    message: `Hi ${name},\n\nThank you for requesting our ${service} service.\n\nWe have received your service request and our team will review it shortly. We'll contact you within 24 hours to discuss your project in detail.\n\nIf you have any questions in the meantime, please don't hesitate to reach out.`
  });

  // Send notification email to admin (optional - if you have an admin email configured)
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(adminEmail, 'custom', {
      subject: `New Service Request: ${service}`,
      message: `New service request:\n\nFrom: ${name} (${email})\nService: ${service}\n\nPlease review this service request in the admin dashboard.`
    });
  }
};

