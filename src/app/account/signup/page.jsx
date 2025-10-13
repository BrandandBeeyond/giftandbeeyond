"use client";

import Giftcanvas from "@/app/admin/components/Giftcanvas";
import { Button } from "@/components/ui/button";
import { registerUser, verifyOtp } from "@/redux/actions/UserAction";
import { USER_REGISTER_SUCCESS } from "@/redux/constants/UserConstant";
import { Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [showPassword, setShowPassword] = useState(false);
  const [showotpModal, setShowotpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next field
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);

    await dispatch(verifyOtp(formData.email, otpCode));

    setShowotpModal(false);
  };

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();

      const registerData = new FormData();
      registerData.append("firstname", formData.firstname);
      registerData.append("lastname", formData.lastname);
      registerData.append("email", formData.email);
      registerData.append("password", formData.password);

      const result = await dispatch(registerUser(registerData));

      console.log("the result is",result);
      console.log("the result type is",result.type);
      

      if (result?.type === USER_REGISTER_SUCCESS) {
        setShowotpModal(true);
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <>
      <div className="bg-[#2b261e] overflow-hidden relative h-screen flex flex-col items-center justify-center">
        <Giftcanvas />

        <div className="relative z-10 max-w-xl w-full p-8 rounded-xl border border-neutral-800 bg-gradient-to-b from-[#433b2d]/80 to-[#272218]/80 backdrop-blur-md shadow-xl">
          <h1 className="text-2xl font-bold font-uppercase text-white mb-2 font-quando">
            Create account
          </h1>
          <p className="text-gray-400 mb-6">Login to Gift and beeyond</p>

          <form onSubmit={handleSubmitRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => {
                    setFormData({ ...formData, firstname: e.target.value });
                  }}
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 rounded-md bg-[#2a251c] text-white border border-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => {
                    setFormData({ ...formData, lastname: e.target.value });
                  }}
                  placeholder="Enter last name"
                  className="w-full px-3 py-2 rounded-md bg-[#2a251c] text-white border border-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-md bg-[#2a251c] text-white border border-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Choose Password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  className="w-full px-3 py-2 rounded-md bg-[#2a251c] text-white border border-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-amber-100" />
                  ) : (
                    <Eye className="h-4 w-4 text-amber-100" />
                  )}
                </Button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-2 rounded-md hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              {loading ? (
                <>
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                    Please wait...
                  </div>
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <button
              type="submit"
              className="w-full mt-4 cursor-pointer bg-white text-black font-semibold py-2 rounded-md transition"
            >
              <div className="flex flex-row gap-x-4 justify-center items-center">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#4285F4"
                    d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
                  />
                  <path
                    fill="#EA4335"
                    d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
                  />
                </svg>
                Continue with Google
              </div>
            </button>

            <div className="text-right mt-2">
              <a href="#" className="text-sm text-gray-400 underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        <div className="mt-5">
          <Link
            href={"/account/login"}
            className="text-xl text-amber-100 relative z-10 font-quando"
          >
            Sign In
          </Link>
        </div>
        {showotpModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#2b261e] rounded-2xl p-6 w-[90%] max-w-md border border-yellow-600 relative">
              <button
                onClick={() => setShowotpModal(false)}
                className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-200"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center font-quando">
                Verify your email
              </h2>
              <p className="text-sm text-gray-300 text-center mb-6">
                Please enter the 6-digit OTP sent to{" "}
                <span className="text-yellow-300">{formData.email}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-10 h-12 text-center text-lg font-semibold rounded-md bg-[#3a3225] text-white border border-yellow-600 focus:ring-2 focus:ring-yellow-500 outline-none"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-2 rounded-md hover:from-yellow-400 hover:to-yellow-500 transition"
                >
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterPage;
