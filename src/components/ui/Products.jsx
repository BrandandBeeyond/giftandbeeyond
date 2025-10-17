"use client";

import { fetchColors } from "@/redux/actions/ColorAction";
import { fetchProducts } from "@/redux/actions/ProductAction";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttontmp from "../Buttontmp";
import { Addtocart } from "@/redux/actions/CartAction";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);

  const [adding, setAdding] = useState(null);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddtoCart = (product) => {
    setAdding(product._id);

    setTimeout(() => {
      dispatch(Addtocart(product));
      setAdding(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-6xl foglithen-font text-[#612c06] text-shadow-black">
        Our Products
      </h2>

      <div className="grid grid-cols-3 gap-x-15 mt-30">
        {products?.map((product) => {
          const isInCart = cart.find((item) => item._id === product._id);
          return (
            <div className="flex flex-col justify-center  space-y-3">
              <div
                className="border border-slate-200 p-5 rounded-lg shadow-md procard w-full bg-no-repeat bg-cover flex items-center justify-center cursor-pointer transition-all"
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
                <h4 className="text-xl font-bruno text-amber-800">
                  {product.name}
                </h4>
                {adding === product._id ? (
                  <Buttontmp text="Adding ..." disabled />
                ) : isInCart ? (
                  <div className="flex items-center space-x-4 btnadded">
                    <button
                      className="text-[#612c06] text-2xl px-3 py-1  transition"
                      onClick={() => handleDecrement(product._id)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {isInCart.quantity}
                    </span>
                    <button
                      className="bg-[#612c06] text-white px-3 py-1 rounded-md hover:bg-[#7a3a10] transition"
                      onClick={() => handleIncrement(product._id)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <Buttontmp
                    text="Add to Cart"
                    onClick={() => handleAddtoCart(product)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default Products;
