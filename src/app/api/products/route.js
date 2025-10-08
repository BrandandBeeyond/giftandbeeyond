import { createProduct, getProducts } from "@/controllers/product.controller";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "@/config/config";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const uploadToCloundinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Cloudinary upload timed out"));
    }, 15000);

    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        clearTimeout(timeout);
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    const imageFiles = formData.getAll("images");
    const name = formData.get("name");
    const description = formData.get("description");
    const productSku = formData.get("productSku");
    const stock = formData.get("stock");
    const price = formData.get("price");
    const color = formData.get("color");

    let parsedColor = [];

    if (color) {
      const temp = JSON.parse(color);
      if (Array.isArray(temp)) {
        parsedColor = temp.filter((id) => id !== "null" && !!id);
      }
    } else {
      console.warn("Failed to parse color JSON:", err);
      parsedColor = [];
    }

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "At least one product image is required" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const imageFile of imageFiles) {
      console.log("📤 Uploading image...");
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await uploadToCloundinary(buffer);

      uploadedImages.push({
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      });
    }

    const newProduct = await createProduct({
      name,
      description,
      productSku,
      stock,
      price,
      color: parsedColor,
      images: uploadedImages,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
