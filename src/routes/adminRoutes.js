const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const adminAuthMiddleware = require('../middlewares/adminAuth')

router.post('/create-slot',adminAuthMiddleware,adminController.createTimeSlot)

module.exports=router


