const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send email notification
const sendEmail = async(to, subject, text) => {
    try {
        const msg = {
            to,
            from: process.env.SENDGRID_EMAIL, // Verified sender email
            subject,
            text,
        };
        await sgMail.send(msg);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error.message);
        return { success: false, error: error.message };
    }
};

// Send SMS notification
const sendSMS = async(to, message) => {
    try {
        console.log("Sending SMS to:", to);
        console.log("From Twilio Number:", process.env.TWILIO_PHONE_NUMBER);
        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Twilio verified number
            to,
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { sendEmail, sendSMS };