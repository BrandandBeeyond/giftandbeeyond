"use client";

import Navbar from "@/components/ui/Navbar";
import { useState } from "react";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f5f7] font-[Montserrat]">
        <h2 className="text-center text-2xl mb-4 font-bold">
          Weekly Coding Challenge #1: Sign in/up Form
        </h2>

        <div
          className={`container relative bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] w-[768px] max-w-full min-h-[480px] overflow-hidden transition-all duration-700 ${
            isSignUp ? "right-panel-active" : ""
          }`}
        >
          {/* --- Sign Up Form --- */}
          <div
            className={`form-container absolute top-0 left-1/2 w-1/2 h-full transition-all duration-700 ${
              isSignUp
                ? "opacity-100 z-10 translate-x-[-100%]"
                : "opacity-0 translate-x-0"
            }`}
          >
            <form className="bg-white flex flex-col items-center justify-center p-12 h-full text-center">
              <h1 className="font-bold text-xl">Create Account</h1>
              <div className="social-container my-5">
                <a
                  href="#"
                  className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
                >
                  {/* <FaFacebookF /> */}
                </a>
                <a
                  href="#"
                  className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
                >
                  {/* <FaGooglePlusG /> */}
                </a>
                <a
                  href="#"
                  className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
                >
                  {/* <FaLinkedinIn /> */}
                </a>
              </div>
              <span className="text-xs">
                or use your email for registration
              </span>
              <input
                type="text"
                placeholder="Name"
                className="bg-gray-100 border-none p-3 my-2 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 border-none p-3 my-2 w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-100 border-none p-3 my-2 w-full"
              />
              <button className="rounded-full border border-[#FF4B2B] bg-[#FF4B2B] text-white font-bold py-3 px-11 text-xs uppercase mt-4 hover:scale-95 transition-transform">
                Sign Up
              </button>
            </form>
          </div>

          {/* --- Sign In Form --- */}
          <div
            className={`form-container absolute top-0 h-full transition-all duration-700 ${
              isSignUp ? "translate-x-[130%]" : "left-0 w-1/2 z-10"
            }`}
          >
            <form className="bg-white flex flex-col items-center justify-center p-12 h-full text-center">
              <h1 className="font-bold text-xl">Sign in</h1>
              <div className="social-container my-5">
                <a
                  href="#"
                  className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
                >
                  {/* <FaFacebookF /> */}
                </a>
                <a
                  href="#"
                  className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
                >
                  {/* <FaGooglePlusG /> */}
                </a>
                <a
                  href="#"
                  className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
                >
                  {/* <FaLinkedinIn /> */}
                </a>
              </div>
              <span className="text-xs">or use your account</span>
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 border-none p-3 my-2 w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-100 border-none p-3 my-2 w-full"
              />
              <a href="#" className="text-sm text-gray-600 my-2">
                Forgot your password?
              </a>
              <button className="rounded-full border border-[#FF4B2B] bg-[#FF4B2B] text-white font-bold py-3 px-11 text-xs uppercase mt-4 hover:scale-95 transition-transform">
                Sign In
              </button>
            </form>
          </div>

          {/* --- Overlay --- */}
          <div
            className={`overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 z-[100] ${
              isSignUp ? "-translate-x-full" : ""
            }`}
          >
            <div
              className={`overlay bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] bg-no-repeat bg-cover bg-center text-white absolute left-[-100%] h-full w-[200%] transition-transform duration-700 ${
                isSignUp ? "translate-x-1/2" : ""
              }`}
            >
              <div className="overlay-panel absolute flex flex-col items-center justify-center p-10 text-center top-0 h-full w-1/2 transition-transform duration-700 transform -translate-x-[7%] left-0">
                <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-sm mb-5">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="rounded-full border border-white bg-transparent text-white font-bold py-3 px-11 text-xs uppercase hover:scale-95 transition-transform"
                >
                  Sign In
                </button>
              </div>

              <div className="overlay-panel absolute flex flex-col items-center justify-center p-10 text-center top-0 h-full w-1/2 right-0">
                <h1 className="text-2xl font-bold mb-2">Hello, Friend!</h1>
                <p className="text-sm mb-5">
                  Enter your personal details and start journey with us
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="rounded-full border border-white bg-transparent text-white font-bold py-3 px-11 text-xs uppercase hover:scale-95 transition-transform"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-[#222] text-white text-center fixed bottom-0 left-0 right-0 text-sm p-3">
          <p>
            Created with <span className="text-red-500">♥</span> by{" "}
            <a
              target="_blank"
              href="https://florin-pop.com"
              className="text-[#3c97bf]"
            >
              Florin Pop
            </a>{" "}
            -{" "}
            <a
              target="_blank"
              href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
              className="text-[#3c97bf]"
            >
              Read here
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
