import {
  createSubCategory,
  getAllSubCategories,
} from "@/controllers/category.controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subcategories = await getAllSubCategories();

    return NextResponse.json(subcategories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
  

    const {subcategoryname} = await req.json();

    const newsubCategory = await createSubCategory({subcategoryname});

   

    return NextResponse.json(newsubCategory, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating subcategory:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
