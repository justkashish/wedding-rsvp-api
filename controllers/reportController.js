const Guest = require('../models/Guest');

// Get RSVP Summary
exports.getRSVPSummary = async(req, res) => {
    try {
        const weddingId = req.params.weddingId;
        const confirmed = await Guest.countDocuments({ weddingId, rsvpStatus: 'Confirmed' });
        const pending = await Guest.countDocuments({ weddingId, rsvpStatus: 'Pending' });
        const declined = await Guest.countDocuments({ weddingId, rsvpStatus: 'Declined' });

        res.json({
            message: "RSVP summary retrieved successfully",
            confirmed,
            pending,
            declined
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Full Guest Report
exports.getGuestReport = async(req, res) => {
    try {
        const weddingId = req.params.weddingId;
        const guests = await Guest.find({ weddingId });

        res.json({
            message: "Guest report retrieved successfully",
            totalGuests: guests.length,
            guests
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};