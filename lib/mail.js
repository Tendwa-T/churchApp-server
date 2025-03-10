const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMail(email, subject, text, doc) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADDR,
      to: email,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: "invoice.pdf",
          content: doc,
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendFailedEmail(email, subject, text) {
  try {
    const mailOptions = {
      to: email,
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { sendMail, sendFailedEmail };
