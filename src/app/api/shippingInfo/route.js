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
