import Lottie from "lottie-react";
import React from "react";
import Teddyani from '../animations/cute_teddy.json';

const Splashscreen = () => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)]/70 z-[999] flex items-center justify-center">
      <Lottie animationData={Teddyani} loop={true} className="h-64" />
    </div>
  );
};

export default Splashscreen;
