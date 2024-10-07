const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeSlotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
        required: true
    },
    bookedDate: {
        type: Date,
        default: Date.now
    },
    invitee: {
        type: String
    },
    status: {
        type: String,
        enum: ['confirmed', 'canceled'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        required: true
    },
    endTime: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Booking', bookingSchema);