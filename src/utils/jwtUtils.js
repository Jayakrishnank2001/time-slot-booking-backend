const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is missing in the environment variables.');
    process.exit(1);
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

const generateToken = (payload) => {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign(payload, jwtSecret, { expiresIn: '5h' });
};


module.exports = {
    verifyToken,
    generateToken
};

