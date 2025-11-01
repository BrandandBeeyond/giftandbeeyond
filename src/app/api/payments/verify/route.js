import { RAZORPAY_SECRET } from "@/config/config";
import { connectToDB } from "@/lib/db";
import Payment from "@/models/payment.model";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const sign = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid Signature" },
        { status: 400 }
      );
    }

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return NextResponse.json({ success: true, message: "Payment verified" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
