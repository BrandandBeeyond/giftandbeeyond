import { connectToDB } from "@/lib/db";
import ShippingInfo from "@/models/shippingInfo.model";

export const createShippingInfo = async (data) => {
  await connectToDB();

  const newShippingInfo = new ShippingInfo(data);
  return await newShippingInfo.save();
};

export const getShippingInfoByUser = async (userId) => {
  await connectToDB();
  return await ShippingInfo.find({ user: userId });
};

export const updateShippingInfo = async (userId, updatedData) => {
  await connectToDB();

  return await ShippingInfo.findByIdAndUpdate(
    { user: userId },
    { $set: updatedData },
    { new: true }
  );
};

export const deleteShippingInfo = async (userId) => {
  await connectToDB();
  return await ShippingInfo.findOneAndDelete({ user: userId });
};
