import { connectToDB } from "@/lib/db";
import { getGenerateToken } from "@/lib/jwt";
import OTP from "@/models/otp.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const storedOtp = await OTP.findOne({ email: normalizedEmail, otp });

    if (!storedOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.isVerified = true;
    await user.save();

    await storedOtp.deleteOne();

    const token = getGenerateToken(user);

    const response = NextResponse.json(
      {
        message: "OTP verified successfully",
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isVerified: user.isVerified,
        },
        token,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
