import { createProduct, getProducts } from "@/controllers/product.controller";
import { NextResponse } from "next/server";

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
    const data = await req.json();
    const newProduct = await createProduct(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
