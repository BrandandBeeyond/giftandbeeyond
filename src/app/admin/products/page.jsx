"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fetchColors } from "@/redux/actions/ColorAction";
import { createProduct, fetchProducts } from "@/redux/actions/ProductAction";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { colors } = useSelector((state) => state.colors);

  const [previewImages, setPreviewImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enableColorSelections, setEnableColorSelections] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
    productSku: "",
    price: "",
    color: "",
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const multipartFormData = new FormData();

    multipartFormData.append("name", formData.name);
    multipartFormData.append("description", formData.description);
    multipartFormData.append("stock", formData.stock);
    multipartFormData.append("productSku", formData.productSku);
    multipartFormData.append("price", formData.price);

    if (selectedColors.length > 0) {
      multipartFormData.append("color", JSON.stringify(selectedColors));
    } else {
      multipartFormData.append("color", null);
    }

    formData.images.forEach((file) => {
      multipartFormData.append("images", file);
    });

    dispatch(createProduct(multipartFormData)).then(() => {
      dispatch(fetchProducts());
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      stock: "",
      productSku: "",
      price: "",
      color: "",
      images: [],
    });
    setPreviewImages([]);
    setSelectedColors([]);
    setEnableColorSelections(false);
  };

  const handleDelete = (id) => {
    alert(`Delete product with ID: ${id}`);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price (₹)",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleEdit(row.id)}
            className="text-gray-600 hover:text-blue-800"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen);

            if (!isOpen) {
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-3 py-1">
              <PlusCircle size={18} />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="productSku">Product SKU</Label>
                  <Input
                    id="productSku"
                    value={formData.productSku}
                    onChange={(e) =>
                      setFormData({ ...formData, productSku: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-x-6 mb-3">
                  <Label htmlFor="color">Color</Label>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="color-toggle"
                      checked={enableColorSelections}
                      onCheckedChange={(checked) => {
                        setEnableColorSelections(checked);
                        if (!checked) {
                          setSelectedColors([]);
                          setFormData({ ...formData, color: "" });
                        }
                      }}
                    />
                  </div>
                </div>

                {enableColorSelections && (
                  <>
                    <div className="border rounded-md px-3 py-2 w-full">
                      <span className="text-sm text-muted-foreground">
                        Select colors
                      </span>
                      <div className="mt-3 grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                        {colors.map((c) => {
                          const isSelected = selectedColors.includes(c._id);
                          return (
                            <button
                              key={c._id}
                              type="button"
                              onClick={() => {
                                const updated = isSelected
                                  ? selectedColors.filter((id) => id !== c._id)
                                  : [...selectedColors, c._id];

                                setSelectedColors(updated);
                                setFormData({
                                  ...formData,
                                  color: JSON.stringify(updated),
                                });
                              }}
                              className={`flex items-center justify-between px-3 py-1 border rounded-xl text-sm ${
                                isSelected
                                  ? "bg-slate-800 text-white"
                                  : "bg-white"
                              }`}
                            >
                              <span>{c.name}</span>
                              <span
                                className="inline-block w-4 h-4 rounded-full border ml-2"
                                style={{ backgroundColor: c.hexCode }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedColors.map((colorId) => {
                        const colorObj = colors.find((c) => c._id === colorId);
                        return (
                          <div
                            key={colorId}
                            className="h-8 w-8 rounded-full border"
                            style={{ backgroundColor: colorObj?.hexCode }}
                            title={colorObj?.name}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({ ...formData, images: files });
                    const previews = files.map((f) => URL.createObjectURL(f));
                    setPreviewImages(previews);
                  }}
                />
              </div>

              {mounted && previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {previewImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-4 shadow-md rounded">
        {loading ? (
          <div className="flex justify-center">
            <Spinner className="text-slate-950 h-10 w-10" />
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={products}
              pagination
              highlightOnHover
              responsive
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
