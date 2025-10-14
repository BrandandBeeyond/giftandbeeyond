import { connectToDB } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { SendOtpEmail } from "@/lib/nodemailer";

import OTP from "@/models/otp.model";
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

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }


    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email:normalizedEmail });

    if (user) {
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

     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({email:normalizedEmail, otp:otpCode});
    
    await SendOtpEmail(normalizedEmail, otpCode);

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
