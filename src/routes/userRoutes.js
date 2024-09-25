const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userAuth = require('../middlewares/userAuth')



module.exports=router