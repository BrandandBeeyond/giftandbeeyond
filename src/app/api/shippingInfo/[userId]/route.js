import { connectToDB } from "@/lib/db";
import ShippingInfo from "@/models/shippingInfo.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { userId } = params;

    const shippingInfo = await ShippingInfo.findOne({ user: userId });

    return NextResponse.json(shippingInfo || { addresses: [] }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
