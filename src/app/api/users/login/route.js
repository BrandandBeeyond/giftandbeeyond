import { connectToDB } from "@/lib/db";
import { comparePassword } from "@/lib/hash";
import { getGenerateToken } from "@/lib/jwt";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 404 }
      );
    }

    const token = getGenerateToken(user);

    const response = NextResponse.json(
      { message: "Login successful", token, user },
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
    console.error("❌ Login Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
