"use client";

import Navbar from "@/components/ui/Navbar";
import { useLoader } from "@/context/LoaderContext";
import { CreateOrder } from "@/redux/actions/OrderAction";
import { createPaymentRequest } from "@/redux/actions/PaymentAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const { order, paymentSuccess, paymentLoading, error } = useSelector(
    (state) => state.payment
  );

  const totalAmount = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    async function initPayment() {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        alert("Failed to load  SDK");
        return;
      }

      if (!user || cart.length === 0) {
        alert("Missing user or cart detail");
        router.push("/cart");
        return;
      }

      dispatch(createPaymentRequest(totalAmount, user, cart));
    }

    initPayment();
  }, []);

  useEffect(() => {
    if (paymentSuccess) {

      setTimeout(() => {
        useLoader()
        router.push("/checkout/success?method=online");
      }, 1500);
    } else if (error) {
      router.push("/checkout/payment-failed");
    }
  }, [paymentSuccess, error]);
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">
        <p className="font-della text-lg">
          Please wait... Clicking secure payment 🔐
        </p>
      </div>
    </>
  );
};

export default PaymentInfo;
