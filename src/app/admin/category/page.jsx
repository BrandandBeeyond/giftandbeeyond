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
import {
  addSubCategory,
  fetchSubCategories,
} from "@/redux/actions/CategoryAction";

import { Pencil, Trash2, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

const AdminCategoryPage = () => {
  const dispatch = useDispatch();

  const { subcategories } = useSelector((state) => state.subcategories);
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const handleAddSubCategories = async (e) => {
    e.preventDefault();
    setLoadingSub(true);

    try {
      const formData = {
        subcategoryname: subCategoryName,
      };
      await dispatch(addSubCategory(formData));

      setSubCategoryName("");
      setIsSubDialogOpen(false);
      dispatch(fetchSubCategories());
    } catch (error) {
      console.error("Failed to add subcategory:", error);
    } finally {
      setLoadingSub(false);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category name ",
      selector: (row) => row.categoryname,
      sortable: true,
    },
    {
      name: "Sub categories",
      selector: (row) => row.subcategories,
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
      <div className="flex flex-col justify-between  mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <div className="bg-white p-4 shadow-md rounded mt-5">
          <form className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input id="categoryname" />
              </div>

              <div className="flex items-center gap-x-5 py-3">
                <Label htmlFor="name">Sub Category</Label>
                <Dialog
                  open={isSubDialogOpen}
                  onOpenChange={setIsSubDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button type="button" size="sm">
                      <PlusCircleIcon className="mr-2" />
                      Add subcategory
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Subcategory</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddSubCategories} className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="subCategoryName">
                          Subcategory Name
                        </Label>
                        <Input
                          id="subCategoryName"
                          value={subCategoryName}
                          onChange={(e) => setSubCategoryName(e.target.value)}
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button type="submit">
                          {" "}
                          {loadingSub ? "Adding..." : "Add"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-md px-3 py-2 w-full">
                <span className="text-sm text-muted-foreground">
                  Select Subcategories
                </span>

                <div className="mt-3 grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                  {subcategories.map((c) => {
                    const isSelected = selectedSubCategories.includes(c._id);
                    return (
                      <button
                        key={c._id}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? selectedSubCategories.filter((id) => id !== c._id)
                            : [...selectedSubCategories, c._id];

                          setSelectedSubCategories(updated);
                          // setFormData({
                          //   ...formData,
                          //   includes: JSON.stringify(updated),
                          // });
                        }}
                        className={`flex items-center cursor-pointer justify-between px-3 py-1 border rounded text-sm ${
                          isSelected ? "bg-slate-800 text-white" : "bg-white"
                        }`}
                      >
                        <span>{c.subcategoryname}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white p-4 shadow-md rounded">
        <DataTable columns={columns} pagination highlightOnHover responsive />
      </div>
    </>
  );
};

export default AdminCategoryPage;
