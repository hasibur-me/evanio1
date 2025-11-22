# Email Setup Guide

## Issue: Email sending is not working

The email system uses **Resend** for sending emails. To fix email sending, you need to configure your Resend API key.

## Steps to Fix:

### 1. Get a Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Navigate to **API Keys** in your dashboard
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 2. Configure Environment Variables

Create or update `server/.env` file with:

```env
# Resend Email Service
RESEND_API_KEY=re_your_actual_api_key_here

# Optional: Custom sender email (must be verified in Resend)
EMAIL_FROM=Evanio <hello@yourdomain.com>

# Optional: Admin email for notifications
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Verify Your Domain (Optional but Recommended)

For production:
1. Go to Resend Dashboard → **Domains**
2. Add your domain
3. Add the DNS records provided by Resend
4. Wait for verification (usually takes a few minutes)
5. Update `EMAIL_FROM` in `.env` to use your verified domain

### 4. Test Email Sending

After configuring, restart your server:

```bash
cd server
npm run dev
```

Then test by:
- Submitting the contact form
- Registering a new user
- Sending an email from admin dashboard

### 5. Check Email Logs

The server will now log email status:
- ✅ `Email sent successfully` - Email was sent
- ❌ `EMAIL ERROR` - Configuration issue
- ❌ `Error sending email` - Sending failed

## Common Issues:

### Issue: "Resend API key not configured"
**Solution:** Make sure `RESEND_API_KEY` is set in `server/.env` and the server is restarted.

### Issue: "Invalid API key"
**Solution:** Check that your API key is correct and starts with `re_`. Regenerate if needed.

### Issue: "Domain not verified"
**Solution:** For production, verify your domain in Resend. For development, use `onboarding@resend.dev` as the sender.

### Issue: Emails going to spam
**Solution:** 
- Verify your domain in Resend
- Set up SPF and DKIM records
- Use a custom `EMAIL_FROM` with your verified domain

## Email Templates Available:

- `welcome` - New user registration
- `orderConfirmation` - Order placed
- `orderStatusUpdate` - Order status changed
- `paymentSuccess` - Payment completed
- `documentUploaded` - Document available
- `ticketReply` - Support ticket response
- `custom` - Custom email content

## Testing Without Resend (Development):

If you want to test without setting up Resend, the system will:
- Log email attempts to console
- Not fail the request (graceful degradation)
- Show what emails would have been sent

However, for production, you **must** configure Resend or another email service.


