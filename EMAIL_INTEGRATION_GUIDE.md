# Node Mail Integration Guide

## Overview
The HRMetricS website now has full Node.js email integration using Nodemailer for all contact and demo request forms. When users submit forms, emails are automatically sent to the configured recipient.

## Implemented Features

### 1. Contact Form (`/contact`)
- **Location**: `src/pages/contact.jsx`
- **Endpoint**: `/contactMail.php` or `/api/contact-mail`
- **Handler**: `handleContactForm` in `server/server.cjs`
- **Features**:
  - Validates official email addresses (blocks free email domains)
  - Rate limiting (20 seconds between submissions)
  - Honeypot spam protection
  - Loading states and success/error messages
  - Form reset on successful submission

### 2. Book Demo Modal
- **Location**: `src/components/LeadModals.jsx` (BookDemoForm)
- **Endpoint**: `/sendMail.php` or `/api/send-mail`
- **Handler**: `handleBookDemo` in `server/server.cjs`
- **Features**:
  - Official email validation
  - Required fields: name, company, email, phone, employees
  - Rate limiting and spam protection

### 3. Schedule Demo Modal
- **Location**: `src/components/LeadModals.jsx` (ScheduleDemoForm)
- **Endpoint**: `/sheduleMail.php` or `/api/schedule-mail`
- **Handler**: `handleScheduleDemo` in `server/server.cjs`
- **Features**:
  - Official email validation
  - Interested modules checkboxes
  - Challenges/requirements text area
  - Rate limiting and spam protection

## Email Configuration

### Environment Variables (`.env`)
```env
# Mail destination (where leads should go)
HRMETRICS_LEAD_TO=seenivasan@bsyssolutions.com

# SMTP config (Gmail example: use an App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=seenivasan@bsyssolutions.com
SMTP_PASS=your_app_password_here

# Optional: customize From header
MAIL_FROM_NAME=HRMetricS Website
MAIL_FROM_EMAIL=seenivasan@bsyssolutions.com
```

### Setting Up Gmail SMTP
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password
4. Update `SMTP_PASS` in `.env` with this app password

### Alternative SMTP Providers
You can use other SMTP providers by updating these variables:
- **Outlook/Hotmail**: `SMTP_HOST=smtp-mail.outlook.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`
- **SendGrid**: `SMTP_HOST=smtp.sendgrid.net`, `SMTP_PORT=587`
- **AWS SES**: `SMTP_HOST=email-smtp.[region].amazonaws.com`

## Email Templates

### Contact Form Email
```
Subject: HRMetricS Lead - Contact Form

New contact form submission received:

Name: [Name]
Company: [Company]
Official Email: [Email]
Phone: [Phone]
Employees: [Employees count]
Address: [Address]
City: [City]
Pincode: [Pincode]
Message: [Message]

Meta:
IP: [IP Address]
User-Agent: [Browser info]
Origin: [Page origin]
Referer: [Referring page]
Time (server): [Timestamp]
```

### Book Demo Email
```
Subject: HRMetricS Lead - Book Demo / Try Free

New lead received:

Name: [Name]
Company: [Company]
Official Email: [Email]
Phone: [Phone]
Employees: [Employees count]

Meta:
IP: [IP Address]
User-Agent: [Browser info]
Origin: [Page origin]
Referer: [Referring page]
Time (server): [Timestamp]
```

### Schedule Demo Email
```
Subject: HRMetricS Lead - Schedule a Demo

New demo schedule request received:

Name: [Name]
Company: [Company]
Official Email: [Email]
Phone: [Phone]
Employees: [Employees count]
Interested Modules: [Selected modules]
Challenges: [Challenges/requirements]

Meta:
IP: [IP Address]
User-Agent: [Browser info]
Origin: [Page origin]
Referer: [Referring page]
Time (server): [Timestamp]
```

## Security Features

### 1. Email Validation
- Blocks free email domains (gmail.com, yahoo.com, hotmail.com, outlook.com, aol.com, icloud.com, yopmail.com)
- Ensures business/official email addresses
- RFC-compliant email format validation

### 2. Rate Limiting
- Prevents spam by limiting submissions to once every 20 seconds per IP
- Different rate limits for each form type

### 3. Honeypot Protection
- Hidden field (`website`) that bots might fill
- If filled, submission is silently rejected

### 4. Input Sanitization
- All inputs are normalized and trimmed
- HTML special characters are escaped in emails
- Phone numbers are validated (7-20 digits)

## Testing

### Manual Testing Steps

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Test Contact Form**:
   - Navigate to `/contact`
   - Fill in all required fields with a valid business email
   - Click "Get in Touch"
   - Verify success message appears
   - Check email inbox for the notification

3. **Test Book Demo**:
   - Click any "Book a demo" button on the site
   - Fill in the modal form
   - Submit and verify success message
   - Check email inbox

4. **Test Schedule Demo**:
   - Click "Schedule a demo" button
   - Fill in the detailed form
   - Select interested modules
   - Submit and verify success message
   - Check email inbox

### Testing Error Cases

1. **Free Email**: Try using gmail.com/yahoo.com - should show error
2. **Missing Fields**: Leave required fields empty - should show validation error
3. **Invalid Phone**: Enter less than 7 or more than 20 digits - should show error
4. **Rate Limit**: Submit form twice quickly - second submission should be blocked

## Troubleshooting

### Emails Not Sending?

1. **Check SMTP Credentials**:
   ```bash
   # Test SMTP connection
   telnet smtp.gmail.com 465
   ```

2. **Verify Environment Variables**:
   ```bash
   # In server directory
   cat .env | grep SMTP
   ```

3. **Check Server Logs**:
   ```bash
   # Look for errors in console
   npm run dev
   ```

4. **Common Issues**:
   - **Authentication Failed**: Double-check SMTP_USER and SMTP_PASS
   - **Connection Timeout**: Check firewall/antivirus blocking port 465/587
   - **Invalid Credentials**: For Gmail, ensure you're using an App Password, not your regular password

### Form Not Submitting?

1. **Check Browser Console** for JavaScript errors
2. **Verify API Endpoint** is accessible:
   ```bash
   curl -X POST http://localhost:3002/contactMail.php
   ```
3. **Check Network Tab** in browser DevTools for failed requests

## Deployment Notes

### For Production (PM2 on Windows)
The server is already configured to run with PM2. See `DEPLOY_WINDOWS_PM2.md` for deployment instructions.

### Environment Variables in Production
Make sure to set these environment variables on your production server:
- `HRMETRICS_LEAD_TO`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
- `SMTP_USER`, `SMTP_PASS`
- `MAIL_FROM_NAME`, `MAIL_FROM_EMAIL`

### SSL/TLS Considerations
- Port 465 with `SMTP_SECURE=true` uses implicit SSL
- Port 587 with `SMTP_SECURE=false` uses STARTTLS
- Choose based on your SMTP provider's requirements

## API Endpoints Summary

| Form Type | Legacy Endpoint | Modern Endpoint | Method |
|-----------|----------------|-----------------|--------|
| Contact Form | `/contactMail.php` | `/api/contact-mail` | POST |
| Book Demo | `/sendMail.php` | `/api/send-mail` | POST |
| Schedule Demo | *(removed)* | `/api/schedule-mail` | POST |

All endpoints accept `application/x-www-form-urlencoded` data and return JSON responses when requested via `Accept: application/json` header or `X-Requested-With: XMLHttpRequest`.

## Response Format

### Success Response (200)
```json
{
  "status": "ok",
  "message": "Submitted successfully."
}
```

### Error Response (400/429/500)
```json
{
  "status": "error",
  "message": "Error description here."
}
```

## Maintenance

### Monitoring Email Delivery
- Check server logs for any send failures
- Monitor email bounce rates
- Keep SMTP credentials secure and rotate periodically

### Updating Email Templates
Edit the `handleContactForm`, `handleBookDemo`, and `handleScheduleDemo` functions in `server/server.cjs` to modify email content.

### Adding New Forms
1. Create form handler function in `server/server.cjs`
2. Add route for the endpoint
3. Create React component with form submission logic
4. Follow the existing pattern for validation and error handling

## Support

For issues with:
- **SMTP Configuration**: Check your email provider's documentation
- **Form Validation**: Review the validation functions in the code
- **Server Errors**: Check `server/server.cjs` logs
- **Frontend Issues**: Check React components in `src/`

---

**Last Updated**: 2026-04-15  
**Version**: 1.0.0