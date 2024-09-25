const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'booked'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model('Booking', bookingSchema);