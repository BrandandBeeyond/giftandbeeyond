"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import { IndianRupee, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

const Checkout = () => {

   const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-2 px-4">
        <h2 className="text-xl font-bruno fw-semibold py-2">Checkout</h2>
        <div className="grid grid-cols-[65%_35%] gap-4">
          <div className="mt-2">
            <div className="flex-1  overflow-y-auto p-4 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className={`flex justify-between items-center pb-3  ${
                      cart.length === 1 ? "" : "border-b"
                    }`}
                  >
                    <div className="flex items-center flex-row  gap-x-5">
                      <div className="h-32 w-32 rounded-xl border bg-[#fff] border-slate-200 shadow-xs relative">
                        <Image
                          src={item.images[0]?.url}
                          alt={item.name}
                          fill
                          className="overflow-hidden object-contain"
                        />
                      </div>
                      <div className="flex-col space-y-3">
                        <p className="text-md font-bruno text-[#612c06]">
                          {item.name}
                        </p>
                        <div className="flex flex-row items-center gap-2">
                          <IndianRupee className="font-bruno h-3" />
                          <span className="text-xs font-bruno text-gray-800">
                            {item.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-4 btnadded">
                          {" "}
                          <button
                            className="text-[#612c06] text-2xl px-2 transition cursor-pointer"
                            onClick={() => handleDecrement(item._id)}
                          >
                            {" "}
                            <Minus className="h-4 w-4 text-[#612c06]" />{" "}
                          </button>{" "}
                          <span className="text-lg text-[#612c06]">
                            {" "}
                            {item.quantity}
                          </span>{" "}
                          <button
                            className="text-[#612c06] text-2xl px-2 rounded-md transition cursor-pointer"
                            onClick={() => handleIncrement(item._id)}
                          >
                            {" "}
                            <Plus className="h-4 w-4 text-[#612c06]" />{" "}
                          </button>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="flex-col space-y-2 items-end">
                      <Button
                        className="rounded-4xl bg-[#612c06] hover:bg-[#e7dfd5] p-3"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <Trash className="h-3  text-white" />
                      </Button>
                      <p className="font-medium text-[#612c06]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col justify-center items-center ms-10">
                  <Lottie
                    animationData={CartEmpty}
                    loop={true}
                    className="h-64"
                  />
                  <h3 className="text-2xl font-dancing text-slate-600">
                    Your cart is Empty
                  </h3>

                  <button
                    className="mt-5 rounded-0 text-sm px-8 py-3 cursor-pointer border border-slate-300 hover:border-amber-800 font-bruno transition-all"
                    onClick={() => router.push("/products")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
