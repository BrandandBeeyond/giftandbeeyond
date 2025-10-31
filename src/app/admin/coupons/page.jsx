"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CouponCode = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const banks=[
    {bankname:"SBI",banklogo:""},
    {bankname:"HDFC",banklogo:""},
    {bankname:"AXIS",banklogo:""},
    {bankname:"ICICI",banklogo:""},
    {bankname:"KOTAK MAHINDRA BANK",banklogo:""},
    {bankname:"BOI",banklogo:""},
    {bankname:"YES BANK",banklogo:""},
  ]

  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    minOrderAmount: "",
    eligibleBank: "",
    expiryDate: "",
  });

  const [couponError, setCouponError] = useState({
    code: "",
    discountPercent: "",
    minOrderAmount: "",
    eligibleBank: "",
    expiryDate: "",
  });

  const resetForm = () => {
    setFormData({
      code: "",
      discountPercent: "",
      minOrderAmount: "",
      eligibleBank: "",
      expiryDate: "",
    });
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Coupons</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen);

            if (!isOpen) {
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-3 py-1">
              <PlusCircle size={18} />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[650px] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Coupons</DialogTitle>
            </DialogHeader>
            <form onSubmit="" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Coupon code</Label>
                  <Input
                    id="coupon"
                    placeholder="Enter coupon code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                  {couponError.code && (
                    <p className="text-sm text-red-600 mt-1">
                      {couponError.code}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="discountPercent">Discount Percentage</Label>
                  <Input
                    id="discountPercent"
                    placeholder="Enter Discount Percentage"
                    value={formData.discountPercent}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPercent: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Min Order Amount</Label>
                  <Input
                    id="minOrderAmount"
                    placeholder="Enter Min Order Amount"
                    type="number"
                    value={formData.minOrderAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, minOrderAmount: e.target.value })
                    }
                  />
                  {couponError.stock && (
                    <p className="text-sm text-red-600 mt-1">
                      {couponError.stock}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                  {couponError.price && (
                    <p className="text-sm text-red-600 mt-1">
                      {couponError.price}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Banks</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, eligibleBank: value })
                    }
                    value={formData.eligibleBank}
                  >
                    <SelectTrigger id="banks">
                      <SelectValue placeholder="Select Banks" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank._id} value={bank._id}>
                          {bank.bankname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {couponError.eligibleBank && (
                    <p className="text-sm text-red-600 mt-1">
                      {couponError.eligibleBank}
                    </p>
                  )}
                </div>
              </div>

            
             

            
              <div className="flex justify-end pt-4">
                <Button type="submit">
                  {loading ? (
                    <>
                      <Spinner className="text-white h-6 w-6" /> Submitting
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-4 shadow-md rounded">
        {loading ? (
          <div className="flex justify-center">
            <Spinner className="text-slate-950 h-10 w-10" />
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={products}
              pagination
              highlightOnHover
              responsive
            />
          </>
        )}
      </div>
    </>
  );
};

export default CouponCode;
