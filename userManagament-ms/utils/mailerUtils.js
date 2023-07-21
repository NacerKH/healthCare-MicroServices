
const nodemailer = require('nodemailer');

// Configure nodemailer with your email service provider settings
const transporter = nodemailer.createTransport({
    // Configure your email service provider settings here
  
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

module.exports=transporter;