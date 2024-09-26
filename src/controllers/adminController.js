const TimeSlot=require('../models/timeSlot')

const createTimeSlot = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;
        const queryDate = new Date(date);
        const existingSlot = await TimeSlot.findOne({
            date: queryDate,
            $or: [
                { 
                    startTime: { $lt: endTime }, 
                    endTime: { $gt: startTime } 
                }
            ]
        });
        if (existingSlot) {
            return res.json({status: 'error', message: 'There is already a slot in this time range'});
        }
        const newTimeSlot = new TimeSlot({
            date,
            startTime,
            endTime
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