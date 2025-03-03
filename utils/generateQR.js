const QRCode = require('qrcode');

const generateQR = async(guestId) => {
    try {
        const qrData = `https://rsvp.yourwebsite.com/guest/${guestId}`;
        return await QRCode.toDataURL(qrData);
    } catch (error) {
        console.error('Error generating QR Code:', error.message);
        throw new Error('Failed to generate QR code');
    }
};

module.exports = { generateQR };