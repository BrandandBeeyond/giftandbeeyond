import { connectToDB } from "@/lib/db";
import Color from "@/models/color.model";

export const getAllColors = async (req, res) => {
  await connectToDB();
  return await Color.find({});
};

export const createColor = async (data) => {
  await connectToDB();
  const newColor = new Color(data);
  return await newColor.save();
};

export const getColorById = async (id) => {
  await connectToDB();
  return await Color.findById(id);
};
