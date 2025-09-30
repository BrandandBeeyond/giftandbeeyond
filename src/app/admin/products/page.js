"use client";

import { fetchProducts } from '@/redux/actions/ProductAction';
import { Pencil, Trash2, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';


const AdminProductsPage = () => {
  const dispatch = useDispatch();
   const {products} = useSelector(state=>state.products);

   useEffect(()=>{
       dispatch(fetchProducts());
   },[dispatch]);

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete product with ID: ${id}`);
  };
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Price (₹)',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: row => row.stock,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
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
    }
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white cursor-pointer text-sm px-3 py-1.5 rounded-sm">
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
  );
};


export default AdminProductsPage;