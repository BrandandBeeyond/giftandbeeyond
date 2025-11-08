"use client";

import { CLEAR_CART } from "@/redux/constants/CartConstant";
import Lottie from "lottie-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GiftOpen from "../../../animations/gift_miracle.json";

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const method = searchParams.get("method");
  const status = searchParams.get("status") || "success";

  useEffect(() => {
    if (status === "success") {
      dispatch({ type: CLEAR_CART });
    }
  }, [status, dispatch]);

  return (
    <>
      <section className="min-h-screen  flex flex-col justify-center items-center">
        <h1 className="text-8xl text-[#000] mt-20 font-greatvibes">Thanks!</h1>
        <h4 className="text-4xl font-della">Your order has been placed !</h4>
      </section>
     
    </>
  );
};
export default OrderConfirmation;
