import { deleteProduct, getProductById, updateProduct } from "@/controllers/product.controller";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
     return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const updatedProduct = await updateProduct(params.id, data);
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const deletedProduct = await deleteProduct(params.id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}