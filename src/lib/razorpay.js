import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "@/config/config";
import Razorpay from "razorpay";

export const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});
