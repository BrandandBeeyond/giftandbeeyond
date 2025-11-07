"use client";

import { CLEAR_CART } from "@/redux/constants/CartConstant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h1 className="text-4xl font-della text-[#5a2e0c] mb-4">
        Order Confirmed!
      </h1>
    </div>
  );
};
export default OrderConfirmation;
