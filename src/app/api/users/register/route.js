import { connectToDB } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { getGenerateToken } from "@/lib/jwt";
import { SendOtpEmail } from "@/lib/nodemailer";
import { otpStore } from "@/lib/otpstore";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedpassword = await hashPassword(password);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      isVerified: false,
    });

    await newUser.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);
    await SendOtpEmail(email, otp);

    return NextResponse.json(
      {
        message:
          "User Registered successfully Please verify the OTP sent to your email to activate your account",
        userId: newUser._id,
        email: newUser.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
