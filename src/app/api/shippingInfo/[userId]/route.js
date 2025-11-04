import { connectToDB } from "@/lib/db";
import ShippingInfo from "@/models/shippingInfo.model";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await connectToDB();

    const { userId } = await context.params;

    const shippingInfo = await ShippingInfo.findOne({ user: userId });

    return NextResponse.json(shippingInfo || { addresses: [] }, {
      status: 200,
    });
  } catch (error) {
    console.error("GET Shipping error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
