"use client";

import { fetchColors } from "@/redux/actions/ColorAction";
import { fetchProducts } from "@/redux/actions/ProductAction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttontmp from "../Buttontmp";
import { Addtocart } from "@/redux/actions/CartAction";
import { useRouter } from "next/navigation";
import CartSidebar from "./CartSidebar";

const Products = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const [adding, setAdding] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddtoCart = (product) => {
    setAdding(product._id);

    setTimeout(() => {
      dispatch(Addtocart(product));
      setAdding(null);
      if (cart.length === 0) {
        setIsSidebarOpen(true);
      }
    }, 2000);
  };

  return (
    <div className="max-w-7.2xl mx-auto text-center">
      <h2 className="text-6xl foglithen-font text-[#B34700] text-shadow-black">
        Our Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-15 mt-20">
        {products?.map((product) => {
          const isInCart = cart.find((item) => item._id === product._id);
          return (
            <div className="flex flex-col justify-center  space-y-3">
              <div
                className="procard  flex items-center justify-center cursor-pointer transition-all"
                key={product._id}
              >
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  fill
                  className="object-contain productinner"
                />
              </div>

              <div className="mt-2 flex flex-col items-center space-y-4">
                <h4 className="text-xl font-della text-amber-800">
                  {product.name}
                </h4>

                {adding === product._id ? (
                  <Buttontmp text="Adding" disabled />
                ) : isInCart ? (
                  <Buttontmp text="Go to cart" onClick={()=>setIsSidebarOpen(true)}/>
                ) : (
                  <Buttontmp
                    text="Add to cart"
                    onClick={() => handleAddtoCart(product)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
        <CartSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Products;
