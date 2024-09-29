const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMiddleware = require('../middlewares/userAuth');

router.get('/user-details/:userId', userAuthMiddleware, userController.getUserData);


module.exports=router
