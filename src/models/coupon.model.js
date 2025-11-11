import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: ["percent", "amount"],
      required: true,
    },
    discountPercent: {
      type: Number,
      default: null,
      min: [0, "Discount percent cannot be negative"],
      max: [100, "Discount percent cannot exceed 100"],
    },
    discountAmount: {
      type: Number,
      default: null,
      min: [0, "Discount amount cannot be negative"],
    },

    description: {
      type: String,
      default: null,
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
    isNewUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

CouponSchema.pre("save", function (next) {
  if (this.discountType === "percent" && this.discountType === null) {
    return next(new Error("Discount percent is required for percent type"));
  }
  if (this.discountType === "amount" && this.discountAmount == null) {
    return next(new Error("Discount amount is required for amount type"));
  }
  next();
});

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
