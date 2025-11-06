"use client";

import Navbar from "@/components/ui/Navbar";
import { createPaymentRequest } from "@/redux/actions/PaymentAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const { paymentSuccess } = useSelector((state) => state.payment);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("upi");

  const totalAmount = cart?.reduce((a, b) => a + b.price * b.quantity, 0);

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
        alert("Failed to load Razorpay");
        return;
      }

      if (user?._id && cart.length > 0) {
        dispatch(createPaymentRequest(totalAmount, user));
      }
    }

    initPayment();
  }, []);

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
