import { connectToDB } from "@/lib/db";
import { getGenerateToken } from "@/lib/jwt";
import { otpStore } from "@/lib/otpstore";
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

    const storedOtp = otpStore.get(email);

    if (!storedOtp || storedOtp !== otp) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.isVerified = true;
    await user.save();
    otpStore.delete(email);

    const token = getGenerateToken(user);

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
