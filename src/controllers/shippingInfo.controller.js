import { connectToDB } from "@/lib/db";
import ShippingInfo from "@/models/shippingInfo.model";
import { NextResponse } from "next/server";

export const createShippingInfo = async (data) => {
  await connectToDB();

  const { user, addresses } = data;

  if (!user) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  let existingInfo = await ShippingInfo.findOne({ user });

  if (existingInfo) {
    existingInfo.addresses.push(addresses[0]);
    await existingInfo.save();

    return NextResponse.json(
      { message: "Address added successfully", shippingInfo: existingInfo },
      { status: 200 }
    );
  } else {
    const newShippingInfo = new ShippingInfo(data);
    await newShippingInfo.save();

    return NextResponse.json(
      {
        message: "Shipping info created successfully",
        shippingInfo: newShippingInfo,
      },
      { status: 201 }
    );
  }
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
