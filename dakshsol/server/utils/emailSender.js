// server/utils/emailSender.js
import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

// Configure Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587, // Standard TLS port
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        // Required for some SMTP servers like Gmail, prevents self-signed certificate errors
        ciphers: 'SSLv3' 
    }
});

/**
 * @function sendEmail
 * @description Function to send an email using the configured transporter.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} html - HTML body.
 */
const sendEmail = asyncHandler(async ({ to, subject, html }) => {
  try {
    const mailOptions = {
        from: `Daksh Waterproofing <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Email sending failed for ${to}: ${error.message}`);
    // Throw an error to be caught by the express-async-handler
    throw new new Error('Failed to send email notification.');
  }
});

/**
 * @function sendOtpEmail
 * @description Sends the verification OTP email.
 */
export const sendOtpEmail = (userEmail, otpCode) => {
    const subject = 'Daksh Waterproofing Solutions: Your Verification Code (OTP)';
    const html = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #1e40af;">Verify Your Account</h2>
            <p>Thank you for signing up with Daksh Waterproofing. Please use the following code to complete your registration:</p>
            <div style="background-color: #f0f4ff; padding: 15px; border-radius: 4px; text-align: center;">
                <span style="font-size: 28px; font-weight: bold; color: #b45309;">${otpCode}</span>
            </div>
            <p style="font-size: 12px; color: #6b7280;">This code is valid for 10 minutes.</p>
        </div>
    `;
    return sendEmail({ to: userEmail, subject, html });
};

/**
 * @function sendBookingNotification
 * @description Sends booking confirmation or reschedule notice.
 */
export const sendBookingNotification = (userEmail, bookingDetails, type = 'Confirmed') => {
    let statusColor = '#22c55e'; // Green for Confirmed/Completed
    if (type.includes('Rescheduled')) statusColor = '#f59e0b'; // Amber
    if (type.includes('Cancelled')) statusColor = '#ef4444'; // Red

    const subject = `Daksh Waterproofing: Booking ${bookingDetails._id} - Status: ${type}`;
    const html = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #1e40af;">Booking Update: ${type}</h2>
            <p>Dear Customer,</p>
            <p>Your booking details have been updated:</p>
            
            <ul style="list-style: none; padding: 0;">
                <li><strong>Booking ID:</strong> ${bookingDetails._id}</li>
                <li><strong>Service:</strong> ${bookingDetails.service.name}</li>
                <li><strong>New Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${type}</span></li>
                <li><strong>Scheduled Time:</strong> ${new Date(bookingDetails.preferredTime).toLocaleString()}</li>
                <li><strong>Location:</strong> ${bookingDetails.location.address}</li>
            </ul>

            <p>Thank you for choosing Daksh Waterproofing Solutions.</p>
        </div>
    `;
    // We need to fetch the service name, so ensure bookingDetails is populated or passed correctly
    const serviceName = bookingDetails.service?.name || 'Waterproofing Service'; 
    return sendEmail({ to: userEmail, subject, html });
};
