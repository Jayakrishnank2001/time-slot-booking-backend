const mongoose = require('mongoose')

const timeSlotSchema = new mongoose.Schema({
    date: {
        type: Date,
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
        enum: ['available', 'booked', 'blocked'],
        default: 'available'
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        default: null
    }
});
  
module.exports=mongoose.model('TimeSlot',timeSlotSchema)
  