const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMiddleware = require('../middlewares/userAuth');

router.get('/user-details/:userId', userAuthMiddleware, userController.getUserData);
router.get('/get-slots', userAuthMiddleware, userController.getSlots)
router.post('/book-slot', userAuthMiddleware, userController.bookSlot)
router.get('/get-bookedSlots/:userId', userAuthMiddleware, userController.getBookedSlots)
router.put('/cancel-booking',userAuthMiddleware,userController.cancelBooking)

module.exports=router
