"use client";
import {
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "@/redux/constants/CartConstant";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee, Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./button";
import Lottie from "lottie-react";
import CartEmpty from "../../animations/giftboxempty.json";
import { useRouter } from "next/navigation";

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const router = useRouter();

  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalAmountCart = cartTotal();

  const handleIncrement = (id) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: id });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed right-0 top-0 h-full w-[550px] bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center border-b p-5">
              <h2 className="text-xl font-dancing  font-semibold text-[#612c06]">
                Your Shopping Bag
              </h2>
              <button onClick={onClose} className="cursor-pointer">
                <X className="h-6 w-6 text-[#612c06]" />
              </button>
            </div>

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
                      <div className="h-32 w-32 rounded-xl border border-slate-200 shadow-xs relative">
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
                        className="rounded-4xl bg-[#fff5e8] hover:bg-[#e7dfd5] p-3"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <Trash className="h-3 text-[#612c06]" />
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

                  <button className="mt-5 rounded-0 text-sm px-8 py-3 cursor-pointer border border-slate-300 hover:border-amber-800 font-bruno transition-all" onClick={()=>router.push('/products')}>Continue Shopping</button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-5">
                <div className="mt-3">
                  <div className="flex flex-row justify-between items-center mb-5">
                    <span className="font-bruno text-lg text-[#612c06]">
                      Total:
                    </span>
                    <span className="font-bruno text-lg text-[#612c06]">
                      ₹{totalAmountCart}
                    </span>
                  </div>
                  <button className="w-full bg-[#612c06] text-white py-2 rounded-lg hover:bg-[#4e2405] transition">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
