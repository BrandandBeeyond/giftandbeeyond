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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { fetchCoupons } from "@/redux/actions/CouponAction";
import { Spinner } from "@/components/ui/spinner";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const { buttonLoading, setButtonLoading } = useButtonLoader();
  const { showLoader, setShowLoader } = useLoader();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { coupons, loading } = useSelector((state) => state.coupons);
  const [selectCoupon, setSelectCoupon] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleIncrement = (id) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: id });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const handleSelectCoupon = (id) => {
    if (!selectCoupon) {
      setDisabledButton(true);
    }
    setSelectCoupon(id);
    setDisabledButton(false);
  };

  const handleNavigateNext = () => {
    if (!user) {
      router.push("/account/login?redirect=/checkout/addresses");
      return;
    }

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
            <div className="flex flex-col gap-y-5 sticky top-20">
              <div className="flex flex-col sm:pb-0">
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(isOpen) => {
                    setIsDialogOpen(isOpen);

                    if (!isOpen) {
                      resetForm();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <div className="relative z-[3] h-16 w-full cursor-pointer overflow-hidden rounded-2xl bg-[#d8c4b7] p-0.5 text-[#B34700] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out hover:scale-[1.01] active:scale-100">
                      <div className="border-gradient-animation"></div>
                      <div className="bg-gradient-animation z-[5]"></div>
                      <div className="absolute inset-0.5 z-[4] rounded-[14px] bg-white"></div>
                      <div className="absolute inset-0.5 z-[5]">
                        <div className="w-full px-4 py-3">
                          <div
                            data-testid="coupon-summary"
                            className="flex w-full justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-[#f0ebe8] p-2">
                                <svg
                                  width="24px"
                                  height="24px"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5 5.5H6M9 9.5H10M10 5L5 10M6.80145 0.789347L5.67243 1.91837C5.48717 2.10363 5.23589 2.20772 4.97389 2.20772H3.19561C2.65001 2.20772 2.20772 2.65001 2.20772 3.19561V4.97389C2.20772 5.23589 2.10363 5.48717 1.91837 5.67243L0.789347 6.80145C0.403551 7.18725 0.403551 7.81275 0.789347 8.19855L1.91837 9.32757C2.10363 9.51283 2.20772 9.76411 2.20772 10.0261V11.8044C2.20772 12.35 2.65001 12.7923 3.19561 12.7923H4.97389C5.23589 12.7923 5.48717 12.8964 5.67243 13.0816L6.80145 14.2107C7.18725 14.5964 7.81275 14.5964 8.19855 14.2107L9.32757 13.0816C9.51283 12.8964 9.76411 12.7923 10.0261 12.7923H11.8044C12.35 12.7923 12.7923 12.35 12.7923 11.8044V10.0261C12.7923 9.76411 12.8964 9.51283 13.0816 9.32757L14.2107 8.19855C14.5964 7.81275 14.5964 7.18725 14.2107 6.80145L13.0816 5.67243C12.8964 5.48717 12.7923 5.23589 12.7923 4.97389V3.19561C12.7923 2.65001 12.35 2.20772 11.8044 2.20772H10.0261C9.76411 2.20772 9.51283 2.10363 9.32757 1.91837L8.19855 0.789347C7.81275 0.403551 7.18725 0.403551 6.80145 0.789347Z"
                                    stroke="#B34700"
                                  />
                                </svg>
                              </div>
                              <span className="text-md font-della font-semibold">
                                Coupons
                              </span>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              id="angle-right-b"
                              width="20"
                              className="fill-[#B34700]"
                            >
                              <path
                                fill="current"
                                d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-h-[650px] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Coupons</DialogTitle>
                    </DialogHeader>
                    {loading ? (
                      <>
                        <Spinner className="text-[#000] h-6 w-6" />
                      </>
                    ) : (
                      <>
                        {" "}
                        {coupons.map((coupon) => (
                          <div
                            className={`flex flex-col border  rounded-xl mb-2 p-2.5 cursor-pointer ${
                              selectCoupon
                                ? "border-slate-900"
                                : "border-slate-300"
                            }`}
                            onClick={() => handleSelectCoupon(coupon._id)}
                            key={coupon._id}
                          >
                            <h3 className="font-della text-[#000] text-sm">
                              {coupon.code}
                            </h3>
                            <span className="py-1 text-xs text-slate-600 font-raleway">
                              {coupon.discountPercent} % OFF
                            </span>
                          </div>
                        ))}
                      </>
                    )}

                    <DialogFooter>
                      <div className="text-end">
                        <Button
                          type="submit"
                          disabled={!selectCoupon}
                          className={`transition-all ${
                            !selectCoupon
                              ? "opacity-50 cursor-not-allowed"
                              : "opacity-100 cursor-pointer"
                          }`}
                        >
                          Apply Coupon
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm h-fit ">
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
