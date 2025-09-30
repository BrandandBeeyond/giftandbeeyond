import Product from "@/models/product.model";
import { connectToDB } from "@/lib/db";

export const getProducts = async (req, res) => {
    await connectToDB();
    return await Product.find({}).populate('color');
}

export const getProductById = async (id) => {
  await connectToDB();
  return await Product.findById(id).populate('color');
};

export const createProduct = async (data) => {
  await connectToDB();
  const newProduct = new Product(data);
  return await newProduct.save();
};

export const updateProduct = async (id, data) => {
  await connectToDB();
  return await Product.findByIdAndUpdate(id, data, { new: true }).populate('color');
};

export const deleteProduct = async (id) => {
  await connectToDB();
  return await Product.findByIdAndDelete(id);
};
