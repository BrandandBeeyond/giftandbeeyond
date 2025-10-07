import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "@/config/config";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { createKit, getAllKits } from "@/controllers/kit.controller";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      reject(new Error("Cloudinary upload timed out"));
    }, 15000);

    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: "kits" },
      (error, result) => {
        clearTimeout(timeOut);
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export async function GET() {
  try {
    const kits = await getAllKits();

    return NextResponse.json(kits, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const includes = formData.get("includes");
    const displayImageFile = formData.get("displayImage");

    let parsedIncludes = [];

    if (includes) {
      const temp = JSON.parse(includes);
      if (Array.isArray(temp)) {
        parsedIncludes = temp.filter((id) => id !== "null" && !!id);
      }
    }

    if (!displayImageFile) {
      return NextResponse.json(
        { error: "Display image is required" },
        { status: 400 }
      );
    }

    const buffer = await Buffer.from(await displayImageFile.arrayBuffer());
    const uploadResult = await uploadToCloudinary(buffer);

    const newKit = await createKit({
      name,
      description,
      price,
      includes: parsedIncludes,
      displayImage: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    return NextResponse.json(newKit, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating kit:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
