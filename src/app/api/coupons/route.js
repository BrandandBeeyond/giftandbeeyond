import { getAllCoupons } from "@/controllers/coupon.controller";
import { connectToDB } from "@/lib/db";
import Coupon from "@/models/coupon.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const {
      code,
      discountPercent,
      description,
      minOrderAmount,
      eligibleBank,
      expiryDate,
    } = body;

    const exists = await Coupon.findOne({ code: code.toUpperCase() });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "coupon code already exists" },
        { status: 400 }
      );
    }

    const newCoupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercent,
      description,
      minOrderAmount,
      eligibleBank,
      expiryDate,
    });

    return NextResponse.json(
      {
        success: true,
        coupon: newCoupon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create Coupon Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const coupons = await getAllCoupons();

    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
