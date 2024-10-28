const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Using Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

module.exports = createTransporter;