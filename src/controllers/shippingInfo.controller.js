import { createShippingInfo } from "@/app/api/shippingInfo/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const newShippingInfo = await createShippingInfo(data);
    return NextResponse.json(newShippingInfo, { status: 201 });
  } catch (error) {
    console.error("Error creating shipping info:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
