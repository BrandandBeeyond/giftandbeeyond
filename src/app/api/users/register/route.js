import { connectToDB } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { getGenerateToken } from "@/lib/jwt";
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
      NextResponse.json(
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
    });

    await newUser.save();

    const token = getGenerateToken(newUser);

    return NextResponse.json(
      { message: "User Registered successfully", token, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
