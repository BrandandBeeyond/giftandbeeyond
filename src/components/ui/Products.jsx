"use client";

import React from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { loading, products } = useSelector((state) => state.products);

  console.log("products displayed", products);

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-6xl foglithen-font text-[#612c06] text-shadow-black">
        Our Products
      </h2>

      <div className="grid grid-cols-3 gap-x-15 mt-30">
        <div className="border border-slate-200 p-5 rounded-lg shadow-md cardproduct w-full bg-no-repeat bg-cover"></div>
      </div>

      {/* <div className="grid grid-cols-4 gap-x-15 mt-30">
        <div>
          <img src="images/productcard.png" className="" alt="" />
        </div>
        <div>
          <img src="images/productcard.png" className="" alt="" />
        </div>
        <div>
          <img src="images/productcard.png" className="" alt="" />
        </div>
        <div>
          <img src="images/productcard.png" className="" alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default Products;
