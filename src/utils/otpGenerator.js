const nodemailer = require('nodemailer')
const randomstring=require('randomstring')

const generateOTP = () => {
    return randomstring.generate({
      length: 6,
      charset: 'numeric',
    });
};

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'jayk16122001@gmail.com',
      pass: 'bxtnutkzabiwyqwf',
    },
});
  
const sendOTPByEmail = (email, otp) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: 'jayk16122001@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for registration: ${otp}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log('OTP sent via email:', info.response);
          resolve();
        }
      });
    });
};


module.exports = {
    generateOTP,
    sendOTPByEmail
}
  