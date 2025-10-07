import { connectToDB } from "@/lib/db";
import Category from "@/models/category.model";
import Subcategory from "@/models/subcategory.model";

export const getAllCategories = async () => {
  await connectToDB();
  const categories = await Category.find({}).populate("subcategories");
  return categories;
};
export const getAllSubCategories = async () => {
  await connectToDB();
  const subcategories = await Subcategory.find({});
  return subcategories;
};

export const createCategory = async (data) => {
  await connectToDB();
  const newCategory = new Category(data);
  return await newCategory.save();
};

export const createSubCategory = async (data) => {
  await connectToDB();
  const newsubCategory = new Subcategory(data);
  return await newsubCategory.save();
};
