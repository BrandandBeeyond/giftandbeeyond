import {
  createCategory,
  getAllCategories,
} from "@/controllers/category.controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const categoryname = formData.get("categoryname");
    const subcategories = formData.get("subcatgories");

    let parsedSubcategories = [];

    if (subcategories) {
      const temp = JSON.parse(subcategories);
      if (Array.isArray(temp)) {
        parsedSubcategories = temp.filter((id) => id !== "null" && !!id);
      }
    }

    const newCategory = await createCategory({
      categoryname,
      subcategories: parsedSubcategories,
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating categories:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
