const User = require('../models/user')
const TimeSlot = require('../models/timeSlot')
const Booking = require('../models/booking')

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

const getSlots = async (req, res) => {
    try {
        const { date, userId } = req.query
        const bookingDate = new Date(date)
        const currentTime = new Date();
        const slots = await TimeSlot.find().sort({ startTime: 1 })
        const bookings = await Booking.find({
            userId: userId,
            bookingDate: {
                $gte: new Date(bookingDate.setHours(0, 0, 0, 0)),
                $lt: new Date(bookingDate.setHours(23, 59, 59, 999))
            },
            status: 'confirmed'
        }).populate('timeSlotId')
        const filteredSlots = slots.filter(slot => {
            const isBooked = bookings.some(booking =>
                booking.timeSlotId._id.toString() === slot._id.toString()
            );
            const slotDateTime = new Date(bookingDate.toDateString() + ' ' + slot.startTime);
            const isPastSlot = bookingDate.toDateString() === currentTime.toDateString() &&
                slotDateTime < currentTime;
            return !isBooked && !isPastSlot;
        });
        res.status(200).json({ status: 'success', slots: filteredSlots })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const bookSlot = async (req, res) => {
    try {
        const { userId, timeSlotId, invitee, bookingDate } = req.body
        const utcDate = new Date(bookingDate);
        const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
        const booking = new Booking({
            userId,
            timeSlotId,
            invitee,
            bookingDate: istDate
        })
        await booking.save()
        res.status(200).json({ status: 'success', message: 'Slot Booked Successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getBookedSlots = async (req, res) => {
    try {
        const { userId } = req.params
        const bookedSlots = await Booking.find({ userId: userId }).populate('timeSlotId')
        res.status(200).json(bookedSlots)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body
        await Booking.findByIdAndUpdate(bookingId, { status: 'canceled' })
        res.status(200).json({ status: 'success', message: 'Booking Canceled Successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    getUserData,
    getSlots,
    bookSlot,
    getBookedSlots,
    cancelBooking
}