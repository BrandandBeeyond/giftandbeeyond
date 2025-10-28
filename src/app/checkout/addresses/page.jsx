"use client";

import { Button } from "@/components/ui/button";
import Buttondice from "@/components/ui/Buttondice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/Navbar";
import { useButtonLoader, useLoader } from "@/context/LoaderContext";
import axios from "axios";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ShippingInfo = () => {
  const { cart } = useSelector((state) => state.cart);
  const { buttonLoading } = useButtonLoader();
  const { showLoader, setShowLoader } = useLoader();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
  });

  const handleOnPincodeChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      fetchPincodeDetails(value);
    }
  };

  const fetchPincodeDetails = async (pincode) => {
    try {
      setShowLoader(true);

      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const data = res.data[0];

      if (
        data.Status === "Success" &&
        data.PostOffice &&
        data.PostOffice.length > 0
      ) {
        const post = data.PostOffice[0];

        setFormData((prev) => ({
          ...prev,
          city: post.District,
          state: post.State,
        }));
      } else {
        toast.error("Incorrect pincode.");
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-2 px-4">
        <h2 className="text-xl font-della font-semibold py-2 mb-4">
          Shipping Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          <div className="bg-white p-10 rounded-xl">
            <form action="">
              <div className="grid grid-cols-2 gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="fullname" className="font-della">
                    Full Name
                  </Label>
                  <Input
                    id="full name"
                    name="fullname"
                    type="text"
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="font-della">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    className="p-4 h-12 rounded-4xl border  border-[#612c06] bg-[#eeeae8]"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Email" className="font-della">
                    Email
                  </Label>
                  <Input
                    id="Email"
                    name="email"
                    type="email"
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Pincode" className="font-della">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    type="number"
                    onChange={handleOnPincodeChange}
                    value={formData.pincode}
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="Enter Pincode"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 my-5">
                <div className="grid gap-2">
                  <Label htmlFor="address" className="font-della">
                    House No., Building, Street
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="House No., Building, Street"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="landmark" className="font-della">
                    Road, Area, Landmark (optional)
                  </Label>
                  <Input
                    id="landmark"
                    name="landmark"
                    type="text"
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="Road, Area, Landmark (optional)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="grid gap-2">
                  <Label htmlFor="city" className="font-della">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="City"
                    value={formData.city}
                    disabled={!formData.city}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state" className="font-della">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    disabled={!formData.state}
                    className="p-4 h-12 rounded-4xl border border-[#612c06] bg-[#eeeae8]"
                    placeholder="state"
                    required
                  />
                </div>
              </div>

              <div className="mt-10">
                   <Button className="rounded-4xl py-3 px-5 h-12 w-30 font-della text-lg">Save</Button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-y-5">
            <div className="">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className={`flex justify-between items-center pb-3 `}
                >
                  <div className="flex items-center gap-x-5">
                    <div className="h-32 w-28 border bg-white border-slate-200 relative">
                      <Image
                        src={item.images[0]?.url}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-md font-della font-bold text-[#000]">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3 text-[#612c06]" />
                        <span className="text-md font-della text-[#00]">
                          {item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-della text-[#612c06]">
                          Quantity :
                        </span>
                        <span className="text-[13px] font-della text-[#612c06]">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit ">
              <h3 className="text-xl font-bold font-della text-[#612c06] mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between font-della space-y-2 text-sm mb-2">
                <span className="text-[16px] font-semibold">Subtotal</span>
                <span>
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm space-y-2 mb-2">
                <span className="text-[16px] font-della">
                  Shipping Included
                </span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[16px] font-della">Taxes</span>
                <span>₹0</span>
              </div>
              <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-semibold">
                <span className="font-della text-xl font-bold">Total</span>
                <span className="font-della text-xl">
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="mt-6">
                <Buttondice
                  text="Continue"
                  loading={buttonLoading}
                ></Buttondice>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
