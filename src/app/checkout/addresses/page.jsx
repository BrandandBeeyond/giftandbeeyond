"use client";

import AddressList from "@/components/ui/AddressList";
import Buttondice from "@/components/ui/Buttondice";
import Navbar from "@/components/ui/Navbar";
import ShippingForm from "@/components/ui/ShippingForm";
import { useButtonLoader } from "@/context/LoaderContext";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShippingInfo = () => {
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.shippingInfo);
  const { buttonLoading } = useButtonLoader();
  const [showForm, setShowForm] = useState(shippingInfo?.addresses?.length);

  useEffect(() => {
    if (shippingInfo?.addresses?.length) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [shippingInfo]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-2 px-4">
        <h2 className="text-xl font-della font-semibold py-2 mb-4">
          Shipping Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          <div className="bg-white p-10 rounded-xl">
            {showForm ? (
              <ShippingForm user={user} />
            ) : (
              <AddressList
                user={user}
                addresses={shippingInfo?.addresses || []}
                setShowForm={setShowForm}
              />
            )}
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
