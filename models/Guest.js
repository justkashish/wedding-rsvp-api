const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    rsvpStatus: { type: String, enum: ['Pending', 'Confirmed', 'Declined'], default: 'Pending' },
    weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Guest', GuestSchema);