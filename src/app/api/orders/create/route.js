import { connectToDB } from "@/lib/db";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();

    
    const {
      user,
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      orderStatus = "processing",
    } = body;

    if (!user || !shippingInfo || !paymentInfo || !orderItems) {
      
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      user,
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      orderStatus,
    });

   
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
