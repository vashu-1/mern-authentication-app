import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  name: "vijayGM",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    debug: true, // Enable debug output
    logger: true, // Log information to the console
  },
});

export default transporter;
