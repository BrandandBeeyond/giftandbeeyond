"use client";

import { createProduct, fetchProducts } from "@/redux/actions/ProductAction";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [previewImages, setPreviewImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
    productSku: "",
    price: "",
    color: "",
    images: [],
  });

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const multipartFormData = new FormData();

    multipartFormData.append("name", formData.name);
    multipartFormData.append("description", formData.description);
    multipartFormData.append("stock", formData.stock);
    multipartFormData.append("productSku", formData.productSku);
    multipartFormData.append("price", formData.price);
    multipartFormData.append("color", formData.color);

    formData.images.forEach((file) => {
      multipartFormData.append("images", file);
    });

    dispatch(createProduct(multipartFormData)).then(() => {
      dispatch(fetchProducts());
      handleModalClose();
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
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
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Products</h1>
          <button
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white cursor-pointer text-sm px-3 py-1.5 rounded-sm"
            onClick={handleModalOpen}
          >
            <PlusCircle size={18} />
            Add Product
          </button>
        </div>

        <div className="bg-white p-4 shadow-md rounded">
          <DataTable
            columns={columns}
            data={products}
            pagination
            highlightOnHover
            responsive
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 opacity-100"></div>

          <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-2xl animate-fade-in">
            <div className="border-b-gray-300">
              <h2 className="text-xl font-semibold mb-4">Add Product</h2>
              <button
                className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-500 hover:text-gray-800"
                onClick={handleModalClose}
              >
                ✖
              </button>
            </div>

            <div className="modal-body p-5 max-h-[80vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Input
                    label="Product SKU"
                    value={formData.productSku}
                    onChange={(e) =>
                      setFormData({ ...formData, productSku: e.target.value })
                    }
                  />
                  <Input
                    label="Stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: Number(e.target.value),
                      })
                    }
                  />
                  <Input
                    label="Price (₹)"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>

                <Input
                  label="Color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Images
                  </label>
                  <input
                    class="w-full border border-gray-300 px-3 py-2.5 rounded-md text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                    id="file_input"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setFormData({ ...formData, images: files });

                      const previews = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setPreviewImages(previews);
                    }}
                  />
                </div>
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-3 py-2 rounded-md"
    />
  </div>
);

export default AdminProductsPage;
