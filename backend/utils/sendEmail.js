const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // required in production
    port: 587,          // ✅ use 587 instead of 465 (required in production)
    secure: false,      // ✅ must be false for 587 (required in production)
    family: 4,          // ✅ force IPv4 (fix ENETUNREACH error) (required in production)
    //service: "gmail", // works in development
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });
};

module.exports = sendEmail;

