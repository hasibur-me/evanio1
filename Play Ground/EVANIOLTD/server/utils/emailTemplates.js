// Email Templates System
// Professional HTML email templates with support for variables

const getEmailTemplate = (templateName, variables = {}) => {
  const templates = {
    // Base template wrapper
    base: (content, variables = {}) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${variables.subject || 'Evanio'}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #1e40af;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Evanio</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 20px; background-color: #ffffff; max-width: 600px; margin: 0 auto;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4; color: #666666; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Evanio. All rights reserved.</p>
              <p style="margin: 10px 0 0 0;">
                <a href="${variables.frontendUrl || 'http://localhost:5173'}" style="color: #1e40af; text-decoration: none;">Visit our website</a> | 
                <a href="${variables.frontendUrl || 'http://localhost:5173'}/contact" style="color: #1e40af; text-decoration: none;">Contact Support</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,

    // Welcome Email
    welcome: (variables) => {
      const content = `
        <h2 style="color: #1e40af; margin-top: 0;">Welcome to Evanio, ${variables.name}!</h2>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Thank you for joining Evanio. We're excited to have you on board!
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Your account has been successfully created. You can now access your dashboard and start using our services.
        </p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${variables.dashboardUrl || variables.frontendUrl + '/dashboard'}" 
             style="display: inline-block; padding: 12px 30px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
            Go to Dashboard
          </a>
        </div>
        <p style="color: #666666; line-height: 1.6; font-size: 14px;">
          If you have any questions, feel free to reach out to our support team. We're here to help!
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, { ...variables, subject: 'Welcome to Evanio' });
    },

    // Order Confirmation
    orderConfirmation: (variables) => {
      const content = `
        <h2 style="color: #1e40af; margin-top: 0;">Order Confirmation</h2>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Hi ${variables.name},
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Thank you for your order! We've received your order and it's being processed.
        </p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #1e40af; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Order Number:</strong> ${variables.orderNumber}</p>
          <p style="margin: 0 0 10px 0;"><strong>Service:</strong> ${variables.service}</p>
          <p style="margin: 0 0 10px 0;"><strong>Amount:</strong> $${variables.amount?.toFixed(2) || '0.00'}</p>
          <p style="margin: 0;"><strong>Status:</strong> ${variables.status || 'Pending'}</p>
        </div>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${variables.orderUrl || variables.frontendUrl + '/dashboard/orders'}" 
             style="display: inline-block; padding: 12px 30px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
            View Order Details
          </a>
        </div>
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, { ...variables, subject: `Order Confirmation - ${variables.orderNumber}` });
    },

    // Order Status Update
    orderStatusUpdate: (variables) => {
      const statusColors = {
        'pending': '#f59e0b',
        'confirmed': '#3b82f6',
        'in-progress': '#8b5cf6',
        'completed': '#10b981',
        'cancelled': '#ef4444'
      };
      const statusColor = statusColors[variables.status] || '#666666';
      
      const content = `
        <h2 style="color: #1e40af; margin-top: 0;">Order Status Update</h2>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Hi ${variables.name},
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Your order status has been updated:
        </p>
        <div style="background-color: #f8f9fa; border-left: 4px solid ${statusColor}; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Order Number:</strong> ${variables.orderNumber}</p>
          <p style="margin: 0 0 10px 0;"><strong>Service:</strong> ${variables.service}</p>
          <p style="margin: 0 0 10px 0;">
            <strong>New Status:</strong> 
            <span style="display: inline-block; padding: 4px 12px; background-color: ${statusColor}; color: #ffffff; border-radius: 4px; font-size: 14px;">
              ${variables.status}
            </span>
          </p>
          ${variables.message ? `<p style="margin: 10px 0 0 0; color: #666666;">${variables.message}</p>` : ''}
        </div>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${variables.orderUrl || variables.frontendUrl + '/dashboard/orders'}" 
             style="display: inline-block; padding: 12px 30px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
            View Order
          </a>
        </div>
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, { ...variables, subject: `Order Update - ${variables.orderNumber}` });
    },

    // Payment Success
    paymentSuccess: (variables) => {
      const content = `
        <h2 style="color: #10b981; margin-top: 0;">Payment Successful! ✅</h2>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Hi ${variables.name},
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Your payment has been processed successfully. Thank you for your business!
        </p>
        <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Payment Amount:</strong> $${variables.amount?.toFixed(2) || '0.00'}</p>
          <p style="margin: 0 0 10px 0;"><strong>Payment Method:</strong> ${variables.paymentMethod || 'Stripe'}</p>
          ${variables.orderNumber ? `<p style="margin: 0;"><strong>Order Number:</strong> ${variables.orderNumber}</p>` : ''}
        </div>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${variables.paymentUrl || variables.frontendUrl + '/dashboard/payments'}" 
             style="display: inline-block; padding: 12px 30px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
            View Payment Details
          </a>
        </div>
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, { ...variables, subject: 'Payment Successful' });
    },

    // Document Uploaded
    documentUploaded: (variables) => {
      const content = `
        <h2 style="color: #1e40af; margin-top: 0;">New Document Available</h2>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Hi ${variables.name},
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          A new document has been uploaded to your account.
        </p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #1e40af; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Document Title:</strong> ${variables.documentTitle}</p>
          ${variables.description ? `<p style="margin: 0; color: #666666;">${variables.description}</p>` : ''}
        </div>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${variables.documentUrl || variables.frontendUrl + '/dashboard/documents'}" 
             style="display: inline-block; padding: 12px 30px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
            View Documents
          </a>
        </div>
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, { ...variables, subject: 'New Document Available' });
    },

    // Ticket Reply
    ticketReply: (variables) => {
      const content = `
        <h2 style="color: #1e40af; margin-top: 0;">Response to Your Support Ticket</h2>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          Hi ${variables.name},
        </p>
        <p style="color: #333333; line-height: 1.6; font-size: 16px;">
          We have responded to your support ticket.
        </p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #1e40af; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Ticket Number:</strong> ${variables.ticketNumber}</p>
          <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${variables.ticketSubject}</p>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
            <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;"><strong>Response:</strong></p>
            <p style="margin: 0; color: #333333; white-space: pre-wrap;">${variables.message || 'Please check your dashboard for the full response.'}</p>
          </div>
        </div>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${variables.ticketUrl || variables.frontendUrl + '/dashboard/tickets'}" 
             style="display: inline-block; padding: 12px 30px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
            View Ticket
          </a>
        </div>
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, { ...variables, subject: `Response to: ${variables.ticketSubject}` });
    },

    // Custom Email (for admin composer)
    custom: (variables) => {
      const content = `
        <h2 style="color: #1e40af; margin-top: 0;">${variables.subject || 'Message from Evanio'}</h2>
        <div style="color: #333333; line-height: 1.6; font-size: 16px; white-space: pre-wrap;">
          ${variables.message || ''}
        </div>
        ${variables.actionUrl ? `
          <div style="margin: 30px 0; text-align: center;">
            <a href="${variables.actionUrl}" 
               style="display: inline-block; padding: 12px 30px; background-color: #1e40af; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600;">
              ${variables.actionText || 'Take Action'}
            </a>
          </div>
        ` : ''}
        <p style="color: #333333; line-height: 1.6; font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>The Evanio Team</strong>
        </p>
      `;
      return templates.base(content, variables);
    }
  };

  return templates[templateName] ? templates[templateName](variables) : null;
};

export default getEmailTemplate;

