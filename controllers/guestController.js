const mongoose = require('mongoose');
const Guest = require('../models/Guest');
const { sendEmail, sendSMS } = require('../services/notificationService');
const { generateQR } = require('../utils/generateQR');

const formatPhoneNumber = (phone) => {
    if (!phone.startsWith("+")) {
        return `+91${phone}`; // Change +91 to your country code
    }
    return phone;
};

// Add Guest & Send Invitation
exports.addGuest = async(req, res) => {
    try {
        const guest = new Guest(req.body);
        await guest.save();

        const formattedPhone = formatPhoneNumber(guest.phone);
        console.log("Formatted Phone:", formattedPhone);

        const message = `Hello ${guest.name}, you're invited! RSVP here: https://rsvp.yourwebsite.com/guest/${guest._id}`;
        await sendEmail(guest.email, "You're Invited!", message);
        await sendSMS(formattedPhone, message);

        res.status(201).json({ message: "Guest added successfully", guest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get guest list by wedding ID
exports.getGuestList = async(req, res) => {
    try {
        const guests = await Guest.find({ weddingId: req.params.weddingId });
        res.json({ message: "Guest list retrieved successfully", guests });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update RSVP Status & Notify
exports.updateRSVP = async(req, res) => {
    try {
        const guest = await Guest.findByIdAndUpdate(req.params.guestId, req.body, { new: true });

        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        if (process.env.WEBHOOK_URL) {
            const axios = require('axios');
            await axios.post(process.env.WEBHOOK_URL, {
                message: `${guest.name} has updated their RSVP to ${guest.rsvpStatus}.`
            });
        }

        res.json({ message: "RSVP updated successfully", guest });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Guest
exports.deleteGuest = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.guestId)) {
            return res.status(400).json({ error: "Invalid guest ID format" });
        }

        const guest = await Guest.findByIdAndDelete(req.params.guestId);
        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        res.status(200).json({ message: "Guest deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generate QR Code for Guest RSVP
exports.getGuestQR = async(req, res) => {
    try {
        const qrCode = await generateQR(req.params.guestId);
        res.json({ message: "QR Code generated successfully", qrCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};