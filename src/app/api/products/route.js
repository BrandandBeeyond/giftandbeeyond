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

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "At least one product image is required" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const imageFile of imageFiles) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

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
      color,
      images: uploadedImages,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
