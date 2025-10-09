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
  addCategory,
  addSubCategory,
  fetchCategories,
  fetchSubCategories,
} from "@/redux/actions/CategoryAction";

import { Pencil, Trash2, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminCategoryPage = () => {
  const dispatch = useDispatch();

  const { subcategories = [], loading } = useSelector(
    (state) => state.subcategories
  );
  const { categories } = useSelector((state) => state.categories);

  // error handling
  const [subcategoryError, setSubcategoryError] = useState("");
  const [categoryError, setCategoryError] = useState({
    categoryname: "",
    subcategories: "",
  });

  // modal toggle
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

  // loading states
  const [loadingSub, setLoadingSub] = useState(false);
  const [loadingCategoryAdd, setLoadingCategoryAdd] = useState(false);

  // form datas
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    categoryname: "",
    subcategories: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(fetchSubCategories());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddSubCategories = async (e) => {
    e.preventDefault();

    setSubCategoryName("");

    if (!subCategoryName.trim()) {
      setSubcategoryError("Subcategory name is required.");
      return;
    }

    setLoadingSub(true);

    try {
      const formData = {
        subcategoryname: subCategoryName,
      };
      await dispatch(addSubCategory(formData));

      toast.success("Subcategory added successfully.");

      setSubCategoryName("");
      setIsSubDialogOpen(false);
      setSubcategoryError("");
      dispatch(fetchSubCategories());
    } catch (error) {
      console.error("Failed to add subcategory:", error);
    } finally {
      setLoadingSub(false);
    }
  };

  const handleAddCategorySubmit = async (e) => {
    e.preventDefault();

    setCategoryError({
      categoryname: "",
      subcategories: "",
    });

    let isValid = true;

    if (!formData.categoryname.trim()) {
      setCategoryError((prev) => ({
        ...prev,
        categoryname: "Category name is required",
      }));
      isValid = false;
    }

    if (selectedSubCategories.length === 0) {
      setCategoryError((prev) => ({
        ...prev,
        subcategories: "Please select at least one subcategory.",
      }));
      isValid = false;
    }

    if (!isValid) return;

    setLoadingCategoryAdd(true);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("categoryname", formData.categoryname);
      formDataToSend.append(
        "subcategories",
        JSON.stringify(selectedSubCategories)
      );

      await dispatch(addCategory(formDataToSend));

      setFormData({
        categoryname: "",
        subcategories: "",
      });

      setSelectedSubCategories([]);
    } catch (error) {
      console.error("❌ Error submitting category:", error);
      setLoadingCategoryAdd(false);
    } finally {
      setLoadingCategoryAdd(false);
    }
  };

  const columns = [
    {
      name: "CategoryName",
      selector: (row) => row.categoryname,
      sortable: true,
    },
    {
      name: "Sub categories included",
      selector: (row) =>
        Array.isArray(row.subcategories)
          ? row.subcategories
              .map((sub) => sub?.subcategoryname || "no name")
              .join(" , ")
          : "No Subcategories",
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
    },
  ];
  return (
    <>
      {!mounted ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col justify-between  mb-6">
            <h1 className="text-2xl font-semibold">Categories</h1>

            <div className="bg-white p-4 shadow-md rounded mt-5">
              <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
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
                  <form
                    onSubmit={handleAddSubCategories}
                    className="space-y-4 pt-4"
                  >
                    <div>
                      <Label htmlFor="subCategoryName">Subcategory Name</Label>
                      <Input
                        id="subCategoryName"
                        value={subCategoryName}
                         placeholder="Enter subcategory name"
                        onChange={(e) => setSubCategoryName(e.target.value)}
                      />

                      {subcategoryError && (
                        <p className="text-sm text-red-600 mt-2">
                          {subcategoryError}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button type="submit">
                        {loadingSub ? (
                          <>
                            <Spinner className="text-white h-6 w-6" /> Adding
                          </>
                        ) : (
                          "Add"
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <form
                onSubmit={handleAddCategorySubmit}
                className="space-y-6 pt-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="categoryname"
                       placeholder="Enter category name"
                      value={formData.categoryname}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          categoryname: e.target.value,
                        })
                      }
                    />

                    {categoryError.categoryname && <p className="text-sm text-red-600 mt-2">{categoryError.categoryname}</p>}
                  </div>

                  <div className="flex items-center gap-x-5 py-3">
                    <Label htmlFor="name">Sub Category</Label>
                  </div>

                  <div className="border rounded-md px-3 py-2 w-full">
                    <span className="text-sm text-muted-foreground">
                      Select Subcategories
                    </span>

                    {loading ? (
                      <Spinner className="h-10 w-10 flex justify-center text-2xl text-gray-900" />
                    ) : (
                      <div className="mt-3 grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                        {Array.isArray(subcategories) &&
                          subcategories.map((c) => {
                            const isSelected = selectedSubCategories.includes(
                              c._id
                            );
                            return (
                              <button
                                key={c._id}
                                type="button"
                                onClick={() => {
                                  const updated = isSelected
                                    ? selectedSubCategories.filter(
                                        (id) => id !== c._id
                                      )
                                    : [...selectedSubCategories, c._id];

                                  setSelectedSubCategories(updated);
                                  setFormData({
                                    ...formData,
                                    includes: JSON.stringify(updated),
                                  });
                                }}
                                className={`flex items-center cursor-pointer justify-between px-3 py-1 shadow-xs border rounded-xl text-sm ${
                                  isSelected
                                    ? "bg-slate-400 text-white"
                                    : "bg-white"
                                }`}
                              >
                                <span>{c.subcategoryname}</span>
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {categoryError.subcategories && <p className="text-sm text-red-600 mt-2">{categoryError.subcategories}</p>}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">
                    {loadingCategoryAdd ? (
                      <>
                        {" "}
                        <Spinner className="text-white h-6 w-6" />{" "}
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-white p-4 shadow-md rounded">
            <DataTable
              columns={columns}
              data={categories}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </>
      )}
    </>
  );
};

export default AdminCategoryPage;
