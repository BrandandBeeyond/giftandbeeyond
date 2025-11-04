"use client";

import {
  Headset,
  Heart,
  LayoutDashboard,
  LogOut,
  NotebookText,
  Search,
  Settings,
  ShoppingBagIcon,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/actions/UserAction";
import { usePathname } from "next/navigation";
import Stepprogess from "../Stepprogess";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);
  const pathname = usePathname();

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const isCheckoutflow =
    pathname.includes("/checkout") ||
    pathname.includes("/checkout/addresses") ||
    pathname.includes("/checkout/payment");

  return (
    <nav className="px-2 py-6 navbar relative z-50 rounded-bl-3xl rounded-br-3xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Brand
        </Link>

        <div className="hidden md:flex space-x-11 user-links items-center">
          <Link
            href="/"
            className="text-md text-white tracking-wider font-bold  font-ralwaysmbold hover:text-slate-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-md text-white tracking-wider font-bold  font-ralwaysmbold hover:text-slate-600"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-md text-white tracking-wider font-bold  font-ralwaysmbold hover:text-slate-600"
          > 
          Collections
          </Link>
          <Link
            href="/cart"
            className="text-md text-white tracking-wider font-bold  font-ralwaysmbold hover:text-slate-600"
          >
            Gallery
          </Link>
          <Link
            href="/cart"
            className="text-md text-white tracking-wider font-bold  font-ralwaysmbold hover:text-slate-600"
          >
            Blogs
          </Link>

          <Link href={"/account/login"}>
            <div className="cursor-pointer p-2 rounded-full transition-all hover:bg-[#edceb8] me-0">
              <Search className="text-sm text-white h-5 w-5" />
            </div>
          </Link>
          {/* <Link href={"/account/login"}>
            <div className="cursor-pointer p-2 rounded-full transition-all hover:bg-[#edceb8] me-0">
              <Heart className="text-sm text-white  h-5 w-5" />
            </div>
          </Link> */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-cart"));
            }}
          >
            <div className="cursor-pointer p-2 rounded-full transition-all hover:bg-[#edceb8] me-0">
              <ShoppingBagIcon className="text-sm text-white  h-5 w-5" />
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer p-2 rounded-full transition-all hover:bg-[#edceb8] me-0">
                <UserRound className="text-sm text-white  h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Welcome</p>
                  {isAuthenticated ? (
                    <h5 className="font-medium mt-1.5">{user?.firstname}</h5>
                  ) : (
                    <p className="text-xs leading-none text-muted-foreground mt-1.5">
                      to access account and manage orders
                    </p>
                  )}
                  {!isAuthenticated && (
                    <div className="my-3">
                      <Link
                        href={"/account/login"}
                        className="font-bold btnauth text-xs"
                      >
                        Login / SignUp
                      </Link>
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="mx-3" />

              {isAuthenticated && (
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span className="text-2xs">Dashboard</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                <span className="text-2xs">Wishlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NotebookText className="mr-2 h-4 w-4" />
                <span className="text-2xs">Orders</span>
              </DropdownMenuItem>
              {!isAuthenticated && (
                <DropdownMenuItem>
                  <Headset className="mr-2 h-4 w-4" />
                  <span className="text-2xs">Help Center</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="mx-3" />

              {isAuthenticated && (
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="text-2xs">Log out</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isCheckoutflow && (
        <div
          className={`max-w-7xl py-4 mx-auto flex items-center  hidden md:flex space-x-10 `}
        >
          <Stepprogess />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
