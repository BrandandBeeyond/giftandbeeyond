import { createColor, getAllColors } from "@/controllers/color.controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allcolors = await getAllColors();
    return NextResponse.json(allcolors, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
    try {
         const data = await req.json();
         const newColor = await createColor(data);
         return NextResponse.json(newColor, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}