import { EMAIL_PASS, EMAIL_USER } from "@/config/config";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const SendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "OTP Verification From Gift and Beeyond",
    text: `${otp} is your OTP to proceed further with Beeyond. OTPs are confidential.`,
  };

  await transporter.sendMail(mailOptions);
};
