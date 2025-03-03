const QRCode = require('qrcode');

const generateQR = async(guestId) => {
    try {
        const qrCodeData = `https://rsvp.yourwebsite.com/guest/${guestId}`;
        const qrCode = await QRCode.toDataURL(qrCodeData);
        return qrCode;
    } catch (error) {
        console.error('Error generating QR Code:', error.message);
    }
};

module.exports = { generateQR };