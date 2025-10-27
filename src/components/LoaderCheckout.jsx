import Lottie from "lottie-react";
import React from "react";
import LoaderShipping from "../animations/loader_checkout.json";

const LoaderCheckout = () => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)]/70 z-[9999] flex items-center justify-center">
      <Lottie animationData={LoaderShipping} loop={true} className="h-64" />
    </div>
  );
};

export default LoaderCheckout;
