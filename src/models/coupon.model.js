import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    eligibleBank: {
      type: String,
      default: null,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Coupon || mongoose.model("Coupon",CouponSchema);
