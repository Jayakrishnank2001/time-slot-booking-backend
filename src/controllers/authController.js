const User = require('../models/user')
const { generateOTP, sendOTPByEmail } = require('../utils/otpGenerator')
const bcrypt = require('bcrypt')
const TempUser = require('../models/tempUser')
const { generateToken } = require('../utils/jwtUtils')

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                const token = generateToken({
                    id: user.id,
                    email: user.email,
                })
                return res.status(200).json({ status: 'success', message: 'Authentication Successful', token: token })
            } else {
                return res.json({ status: 'error', message: 'Password is incorrect' })
            }
        } else {
            return res.json({ status: 'error', message: 'Email is incorrect' })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
}

const userSignup = async (req, res) => {
    try {
        const { userName, email, phone, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ status: 'error', message: 'Email is already registered' });
        }
        const otp = generateOTP()
        const hashedPassword = await bcrypt.hash(password, 10);
        const tempUser = new TempUser({
            userName,
            email,
            phone,
            password: hashedPassword,
            otp
        });
        await tempUser.save();
        await sendOTPByEmail(email, otp);
        return res.status(201).json({ status: 'success', message: 'OTP send to email' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
}

const otpVerify = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const tempUser = await TempUser.findOne({ email });
        if (tempUser.otp !== otp) {
            return res.json({ status: 'error', message: 'Invalid OTP' });
        }
        const newUser = new User({
            userName: tempUser.userName,
            email: tempUser.email,
            phone: tempUser.phone,
            password: tempUser.password
        });
        await newUser.save();
        await TempUser.deleteOne({ email });
        return res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
}

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body
        const tempUser = await TempUser.findOne({ email });
        const newOTP = generateOTP()
        console.log(newOTP, tempUser)
        tempUser.otp = newOTP;
        await tempUser.save();
        await sendOTPByEmail(email, newOTP);
        return res.status(201).json({ status: 'success', message: 'New OTP sent to Email' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'An error occurred' });
    }
}


module.exports = {
    userLogin,
    userSignup,
    otpVerify,
    resendOTP
}