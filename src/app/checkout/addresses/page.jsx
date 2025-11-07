"use client";

import AddressList from "@/components/ui/AddressList";
import Buttondice from "@/components/ui/Buttondice";
import Navbar from "@/components/ui/Navbar";
import ShippingForm from "@/components/ui/ShippingForm";
import { useButtonLoader, useLoader } from "@/context/LoaderContext";
import { CreateOrder } from "@/redux/actions/OrderAction";
import { getShippingInfo } from "@/redux/actions/ShippingAction";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo, loading } = useSelector((state) => state.shippingInfo);
  const { setShowLoader } = useLoader();
  const { buttonLoading, setButtonLoading } = useButtonLoader();
  const [confirmedAddress, setConfirmedAddress] = useState(null);

  const [showForm, setShowForm] = useState(
    !shippingInfo?.addresses || shippingInfo.addresses.length === 0
  );

  useEffect(() => {
    if (shippingInfo?.addresses?.length > 0) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [shippingInfo.addresses]);

  useEffect(() => {
    if (!user) {
      router.replace("/account/login?redirect=/checkout/addresses");
      return;
    }

    if (user._id) {
      dispatch(getShippingInfo(user._id));
    }
  }, [user]);

  const handleNavigateNextToPayment = () => {
    setTimeout(() => {
      setButtonLoading(true);
    }, 2000);

    setShowLoader(true);
    setTimeout(() => {
      setButtonLoading(false);
      setShowLoader(false);

      router.push("/checkout/payment");
      JSON.stringify(
        "confirmedAddress",
        localStorage.setItem(confirmedAddress)
      );
    }, 3000);
  };

  const paymentData = {
    id: "COD" + Date.now(),
    status: "Pending",
    method: "COD",
  };

  const handleOrderCreationCOD = async () => {
    try {
      if (!confirmedAddress) return;

      const orderData = {
        user: user._id,
        shippingInfo: confirmedAddress,
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.images[0]?.url,
        })),
        paymentInfo: paymentData,
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        orderStatus: "Processing",
      };

      await dispatch(CreateOrder(orderData));

      router.push("/checkout/success?method=cod");
    } catch (error) {
      console.error("Failed to create order", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-2 px-4">
        <h2 className="text-xl font-della font-semibold py-2 mb-4">
          Shipping Information
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <span>Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
            <div className="bg-white p-10 rounded-xl min-h-80">
              {showForm ? (
                <ShippingForm user={user} setShowForm={setShowForm} />
              ) : loading ? (
                <div className="flex justify-center items-center py-6">
                  <span>Loading...</span>
                </div>
              ) : (
                <AddressList
                  user={user}
                  addresses={shippingInfo?.addresses || []}
                  setShowForm={setShowForm}
                  confirmedAddress={confirmedAddress}
                  onSelectAddress={(addr) => setConfirmedAddress(addr)}
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

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={handleNavigateNextToPayment}
                    disabled={!confirmedAddress}
                    className={`w-full py-3 capitalize rounded-md font-della text-white text-md transition-all  ${
                      !confirmedAddress
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#5a2e0c] cursor-pointer"
                    }`}
                  >
                    Pay Online
                  </button>
                  <button
                    disabled={!confirmedAddress}
                    onClick={handleOrderCreationCOD}
                    className={`w-full py-3 capitalize rounded-md font-della text-[#5a2e0c] text-md transition-all border  ${
                      !confirmedAddress
                        ? "cursor-not-allowed border-[#92908f] text-[#92908f]"
                        : " border-[#5a2e0c] hover:bg-[#744019] hover:text-white cursor-pointer"
                    } `}
                  >
                    Pay On delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShippingInfo;
