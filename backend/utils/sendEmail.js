// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com", // required in production
//     port: 587,          // ✅ use 587 instead of 465 (required in production)
//     secure: false,      // ✅ must be false for 587 (required in production)
//     family: 4,          // ✅ force IPv4 (fix ENETUNREACH error) (required in production)
//     //service: "gmail", // works in development
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const sendEmail = async (to, subject, text) => {

//     console.log("SMTP VERIFICATION IS IN PROGRESS :");
//     await transporter.verify();
//     console.log("SMTP VERIFIED");

//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         text,
//     });

//     console.log("EMAIL SENT");
// };

// module.exports = sendEmail;

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    console.log("BEFORE EMAIL SEND...")
    const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        text,
    });
    console.log("EMAIL SEND SUCCESSFULLY...")
    console.log(response);
};

module.exports = sendEmail;