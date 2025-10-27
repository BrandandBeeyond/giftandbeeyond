"use client";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import {
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "@/redux/constants/CartConstant";
import Lottie from "lottie-react";
import { IndianRupee, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import CartEmpty from "../../animations/giftboxempty.json";
import { useDispatch, useSelector } from "react-redux";
import Buttondice from "@/components/ui/Buttondice";
import { useRouter } from "next/navigation";
import { useButtonLoader, useLoader } from "@/context/LoaderContext";
import LoaderCheckout from "@/components/LoaderCheckout";
import Splashscreen from "@/components/Splashscreen";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state) => state.cart);
  const { buttonLoading, setButtonLoading } = useButtonLoader();
  const { showLoader, setShowLoader } = useLoader();

  const handleIncrement = (id) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: id });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const handleNavigateNext = () => {
    setTimeout(() => {
      setButtonLoading(true);
    }, 2000);

    setShowLoader(true);
    setTimeout(() => {
      setButtonLoading(false);
      setShowLoader(false);

      router.push("/checkout/addresses");
    }, 3000);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-xl font-della font-semibold py-2">Checkout</h2>

        {cart.length >= 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
            <div className="p-6 rounded-xl">
              <div className="overflow-y-auto space-y-6 max-h-[70vh] pr-2">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className={`flex justify-between items-center pb-3 ${
                      cart.length === 1 ? "" : "border-b border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-x-5">
                      <div className="h-28 w-28 rounded-xl border bg-white border-slate-200 shadow-sm relative">
                        <Image
                          src={item.images[0]?.url}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <p className="text-lg font-della text-[#612c06]">
                          {item.name}
                        </p>

                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3 text-[#612c06]" />
                          <span className="text-md font-della text-[#612c06]">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-end space-x-12">
                      <div className="flex items-center space-x-5">
                        <button
                          className={`p-2 rounded-4xl  border border-slate-300 hover:bg-gray-100 ${
                            item.quantity === 1
                              ? "cursor-not-allowed disabled:"
                              : "cursor-pointer"
                          }`}
                          onClick={() => handleDecrement(item._id)}
                        >
                          <Minus className="h-5 w-5 text-[#612c06]" />
                        </button>

                        <span className="text-md font-medium font-della text-[#612c06]">
                          {item.quantity}
                        </span>

                        <button
                          className="p-2 rounded-4xl cursor-pointer border border-slate-300 hover:bg-gray-100"
                          onClick={() => handleIncrement(item._id)}
                        >
                          <Plus className="h-5 w-5 text-[#612c06]" />
                        </button>
                      </div>
                      <button
                        className="rounded-full bg-[#612c06] hover:bg-[#845a2f] p-2 cursor-pointer"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <Trash className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-20">
              <h3 className="text-xl font-bold font-della text-[#612c06] mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between font-della space-y-2 text-sm mb-2">
                <span className="text-[16px] font-semibold">Subtotal</span>
                <span>
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm space-y-2 mb-2">
                <span className="text-[16px] font-della">
                  Shipping Included
                </span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[16px] font-della">Taxes</span>
                <span>₹0</span>
              </div>
              <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-semibold">
                <span className="font-della text-xl font-bold">Total</span>
                <span className="font-della text-xl">
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="mt-6">
                <Buttondice
                  text="Proceed to shipping"
                  onClick={handleNavigateNext}
                  loading={buttonLoading}
                ></Buttondice>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-12">
            <Lottie animationData={CartEmpty} loop={true} className="h-64" />
            <h3 className="text-2xl font-dancing text-slate-600 mt-3">
              Your cart is empty
            </h3>
            <button
              className="mt-5 px-8 py-3 text-sm border border-slate-300 hover:border-[#612c06] font-della rounded-md transition-all"
              onClick={() => router.push("/products")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      
    </>
  );
};

export default Checkout;
