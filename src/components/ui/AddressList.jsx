"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

const AddressList = ({
  addresses = [],
  setShowForm,
  onSelectAddress,
  confirmedAddress,
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses]);

  const handleUseAddress = () => {
    const addr = addresses.find((a) => a._id === selectedAddress);
    onSelectAddress(addr);
  };

  return (
    <div className="">
      <h3 className="text-md font-della font-semibold mb-4">
        Select Delivery Address
      </h3>
      <RadioGroup
        value={selectedAddress}
        onValueChange={(value) => setSelectedAddress(value)}
        className="space-y-3 cursor-pointer"
      >
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className={`border rounded-xl p-4 ${
              selectedAddress === addr._id
                ? "border-[#612c06] bg-[#f9f6f4]"
                : "border-gray-300"
            }`}
          >
            <Label className="flex items-start gap-2">
              <RadioGroupItem value={addr._id} />
              <div>
                <p className="font-della font-semibold">{addr.address}</p>
                <p className="text-sm text-gray-600">
                  {addr.landmark}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-6 flex items-center gap-x-4">
        <Button
          disabled={!selectedAddress}
          onClick={handleUseAddress}
          className={`rounded-4xl py-3 px-6 font-della ${
            selectedAddress
              ? "bg-[#612c06] text-white hover:bg-[#4f2204]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Deliver This Address
        </Button>
        <Button
          onClick={() => setShowForm(true)}
          className="rounded-4xl py-3 px-6 font-della border border-[#612c06]"
          variant="outline"
        >
          + Add New Address
        </Button>
      </div>

      <div className="mt-6">
        {confirmedAddress && (
          <div className="bg-[#f9f6f4] border border-[#612c06] rounded-xl p-4 mb-4">
            <h4 className="font-della font-bold text-[#612c06] mb-2 text-[17px]">
              Delivering To:
            </h4>

            <p className="font-della text-sm text-gray-800">
              {confirmedAddress.name}
            </p>

            <p className="font-della text-sm text-gray-800">
              {confirmedAddress.address}, {confirmedAddress.landmark}
            </p>

            <p className="font-della text-sm text-gray-800">
              {confirmedAddress.city}, {confirmedAddress.state} -{" "}
              {confirmedAddress.pincode}
            </p>

            <p className="font-della text-sm text-gray-800">
              Phone: {confirmedAddress.phone}
            </p>
          </div>
        )}
      
      </div>
    </div>
  );
};

export default AddressList;
