import { connectToDB } from "@/lib/db"
import Coupon from "@/models/coupon.model";

export const getAllCoupons=async()=>{
    await connectToDB();
    const coupons = await Coupon.find({});
    return coupons;
} 