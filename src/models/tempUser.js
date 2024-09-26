const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: '15m',
        default: Date.now
    }
});

module.exports = mongoose.model('TempUser', tempUserSchema);