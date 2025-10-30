import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "@/context/LoaderContext";
import { Button } from "./button";
import axios from "axios";
import { addShippingInfo } from "@/redux/actions/ShippingAction";
import { toast } from "sonner";

const ShippingForm = ({ user, setShowForm }) => {
  const { loading, shippingInfo } = useSelector((state) => state.shippingInfo);
  const disptach = useDispatch();

  const { setShowLoader } = useLoader();

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

  const handleShippingSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        user: user?._id,
        addresses: [
          {
            fullname: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            landmark: formData.landmark,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
        ],
      };

      await disptach(addShippingInfo(data));
      setShowForm(false);
      setShowLoader(true);
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        pincode: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
      });

      toast.success("Shipping address added successfully");
    } catch (error) {
      console.error(" Error submitting shipping info:", error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <form onSubmit={handleShippingSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="fullname" className="font-della">
            Full Name
          </Label>
          <Input
            id="full name"
            name="fullname"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
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
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
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
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
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
            value={formData.landmark}
            onChange={(e) =>
              setFormData({ ...formData, landmark: e.target.value })
            }
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
        <Button className="rounded-4xl py-3 px-5 h-12 w-30 font-della text-lg">
          {loading ? (
            <>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </div>
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;
