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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { fetchAllKits } from "@/redux/actions/KitAction";
import { fetchProducts } from "@/redux/actions/ProductAction";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

const AdminKitsPage = () => {
  const dispatch = useDispatch();
  const { loading, kits } = useSelector((state) => state.kits);

  const { products } = useSelector((state) => state.products);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    includes: "",
    displayImage: "",
  });
  
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      includes: "",
      displayImage: "",
    });

    setSelectedProducts([]);
  };
  useEffect(() => {
    dispatch(fetchAllKits());
    dispatch(fetchProducts());
  }, [dispatch]);

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
      name: "Includes",
      selector: (row) =>
        Array.isArray(row.includes)
          ? row.includes.map((p) => p?.name || "Unnamed").join(", ")
          : "No products",
      sortable: false,
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
        <h1 className="text-2xl font-semibold">Kits</h1>
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
              Add Kit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Kit</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Kit Name</Label>
                  <Input id="name" />
                </div>

                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" />
              </div>

              <Label htmlFor="displayImage" className="mb-6">
                Includes
              </Label>
              <div className="border rounded-md px-3 py-2 w-full">
                <span className="text-sm text-muted-foreground">
                  Select products
                </span>

                <div className="mt-3 grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                  {products.map((p) => {
                    const isSelected = selectedProducts.includes(p._id);
                    return (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? selectedProducts.filter((id) => id !== p._id)
                            : [...selectedProducts, p._id];

                            setSelectedProducts(updated);
                            setFormData({
                              ...formData,
                              includes:JSON.stringify(updated)
                            });
                        }}
                        className={`flex items-center cursor-pointer justify-between px-3 py-1 border rounded text-sm ${
                          isSelected ? "bg-slate-800 text-white" : "bg-white"
                        }`}
                      >
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label htmlFor="displayImage" className="mb-3">
                  Display Image
                </Label>
                <Input type="file" id="picture" />
              </div>

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
              data={kits}
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

export default AdminKitsPage;
