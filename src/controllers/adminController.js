const Booking = require('../models/booking')
const TimeSlot=require('../models/timeSlot')


const createTimeSlot = async (req, res) => {
    try {
        const { date, startTime, endTime, status } = req.body;
        const newTimeSlot = new TimeSlot({
            date,
            startTime,
            endTime,
            status
        });
        await newTimeSlot.save();
        res.status(201).json({status:'success',message: 'Time slot created successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating time slot', error });
    }
}


module.exports = {
    createTimeSlot
}