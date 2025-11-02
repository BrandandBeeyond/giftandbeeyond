import { connectToDB } from "@/lib/db";
import ShippingInfo from "@/models/shippingInfo.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();

    const { user, addresses } = data;

    if (!user) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let existingShipping = await ShippingInfo.findOne({ user });

    if (existingShipping) {
      existingShipping.addresses.push(addresses[0]);
      await existingShipping.save();
      return NextResponse.json(
        { shippingInfo: existingShipping },
        { status: 200 }
      );
    }

    const newShippingInfo = await ShippingInfo.create(data);
    return NextResponse.json(
      { shippingInfo: newShippingInfo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating shipping info:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
