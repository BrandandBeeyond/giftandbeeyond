"use client";
import Giftcanvas from "@/app/admin/components/Giftcanvas";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/redux/actions/UserAction";
import { USER_LOGIN_SUCCESS } from "@/redux/constants/UserConstant";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Splashscreen from "@/components/Splashscreen";
import { useLoader } from "@/context/LoaderContext";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.users);
  const { showLoader, setShowLoader } = useLoader();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser(formData));

      if (result.type === USER_LOGIN_SUCCESS) {
        setShowLoader(true);

        const redirectPath = new URLSearchParams(window.location.search).get("redirect") || "/";
        setTimeout(() => {
          setShowLoader(false);
          router.push(redirectPath);
        }, 3500);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <>
      <div className="bg-[#2b261e] overflow-hidden relative h-screen flex flex-col items-center justify-center">
        <Giftcanvas />

        <div className="relative z-10 max-w-sm sm:max-w-lg w-full p-8 rounded-xl border border-neutral-800 bg-gradient-to-b from-[#433b2d]/80 to-[#272218]/80 backdrop-blur-md shadow-xl">
          <h1 className="text-lg sm:text-2xl font-bold text-white mb-2 font-quando">
            Welcome to Gift & Beeyond
          </h1>
          <p className="text-gray-400 mb-6">Login to Gift and beeyond</p>

          <form className="space-y-4" onSubmit={handleSubmitLogin}>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md bg-[#2a251c] text-white border border-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-md bg-[#2a251c] text-white border border-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
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
                    Signing in...
                  </div>
                </>
              ) : (
                "Sign in"
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
            href={"/account/signup"}
            className="text-xl text-amber-100 relative z-10 font-quando"
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
