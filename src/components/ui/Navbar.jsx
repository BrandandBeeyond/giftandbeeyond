import { Heart, Search, ShoppingBagIcon, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="text-gray-950 px-2 py-4  navbar relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-5">
        <Link href="/" className="text-2xl font-bold">
          Brand
        </Link>

        <div className="hidden md:flex space-x-10 user-links">
          <Link  href={"/account/login"}>
            <Search className="text-sm"/>
          </Link>
          <Link  href={"/account/login"}>
            <Heart className="text-sm"/>
          </Link>
          <Link  href={"/"}>
            <ShoppingBagIcon className="text-sm"/>
          </Link>
          <Link  href={"/account/login"}>
            <UserRound className="text-sm"/>
          </Link>
          
        </div>
      </div>
      <div className="max-w-7xl py-4 mx-auto flex items-center justify-between hidden md:flex space-x-6">
       <Link href="/" className="text-md  font-bruno hover:text-slate-600">
            Home
          </Link>
          <Link href="/about" className="text-md  font-bruno hover:text-slate-600">
            About Us
          </Link>
          <Link href="/contact" className="text-md  font-bruno hover:text-slate-600">
            Categories
          </Link>
          <Link href="/cart" className="text-md  font-bruno hover:text-slate-600">
            Blogs
          </Link>
          <Link href="/cart" className="text-md  font-bruno hover:text-slate-600">
             Contact Us
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
