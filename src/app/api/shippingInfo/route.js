import {
  createShippingInfo,
  getShippingInfoByUser,
} from "@/controllers/shippingInfo.controller";
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const shipping = await getShippingInfoByUser(userId);
    return NextResponse.json(shipping, { status: 200 });
  } catch (error) {
    console.error("Error fetching shipping info:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
