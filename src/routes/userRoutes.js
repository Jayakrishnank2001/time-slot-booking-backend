const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMiddleware = require('../middlewares/userAuth');

module.exports = (io) => {
    router.get('/user-details/:userId', userAuthMiddleware, userController.getUserData);
    router.get('/get-timeSlots', userAuthMiddleware, userController.getTimeSlots);
    router.get('/booked-slots/:userId', userAuthMiddleware, userController.getBookedSlots)
    router.put('/cancel-booking',userAuthMiddleware,userController.cancelBooking)
    router.post('/book-time-slot', userAuthMiddleware, (req, res) => userController.bookTimeSlot(req, res, io));
    return router;
};
