const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) create transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //  2) define the email options
  const mailOptions = {
    from: 'saman',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
