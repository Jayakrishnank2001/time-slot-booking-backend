const Booking = require('../models/booking')
const User = require('../models/user')
const TimeSlot = require('../models/timeSlot');
const booking = require('../models/booking');

const getUserData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getTimeSlots = async (req, res) => {
    try {
        const { date } = req.query;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const timeSlots = await TimeSlot.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            status: 'available'
        });
        res.status(200).json({ status: 'success', timeSlots: timeSlots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const bookTimeSlot = async (req, res, io) => {
    try {
        const { slotId, userId } = req.body;
        const updatedSlot = await TimeSlot.findByIdAndUpdate(slotId, { status: 'booked' }, { new: true });
        const newBooking = new Booking({
            userId: userId,
            timeSlotId: slotId,
            status: 'confirmed'
        });
        await newBooking.save();
        io.emit('timeSlotBooked', updatedSlot);
        res.status(200).json({ status: 'success', message: 'Time slot booked successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking time slot' });
    }
}

const getBookedSlots = async (req, res) => {
    try {
        const { userId } = req.params
        const bookedSlots = await Booking.find({ userId })
            .populate('timeSlotId')
            .exec();
        res.status(200).json(bookedSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking time slot' });
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: 'canceled' }, { new: true })
        await TimeSlot.findByIdAndUpdate(updatedBooking.timeSlotId, { status: 'available' }, { new: true })
        res.status(200).json({ status: 'success', message: 'Booking canceled successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking time slot' });
    }
}



module.exports = {
    getUserData,
    getTimeSlots,
    bookTimeSlot,
    getBookedSlots,
    cancelBooking
}