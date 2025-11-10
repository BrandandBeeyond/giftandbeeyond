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
import DataTable from "react-data-table-component";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { CreateCouponCode, fetchCoupons } from "@/redux/actions/CouponAction";
import { Spinner } from "@/components/ui/spinner";
import DatePicker from "@/components/ui/DatePicker";

const CouponCode = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { coupons, loading } = useSelector((state) => state.coupons);

  const banks = [
    { bankname: "SBI", banklogo: "/images/sbi.svg" },
    { bankname: "HDFC", banklogo: "/images/hdfc.svg" },
    { bankname: "AXIS", banklogo: "/images/axis.png" },
    { bankname: "ICICI", banklogo: "/images/icici.png" },
    { bankname: "KOTAK MAHINDRA BANK", banklogo: "/images/kotak.png" },
    { bankname: "BOI", banklogo: "/images/boi.png" },
    { bankname: "YES BANK", banklogo: "/images/yesbank.svg" },
  ];

  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    minOrderAmount: "",
    description: "",
    eligibleBank: "",
    expiryDate: "",
  });

  const [couponError, setCouponError] = useState({
    code: "",
    discountPercent: "",
    minOrderAmount: "",
    description: "",
    eligibleBank: "",
    expiryDate: "",
  });

  const resetForm = () => {
    setFormData({
      code: "",
      discountPercent: "",
      minOrderAmount: "",
      description: "",
      eligibleBank: "",
      expiryDate: "",
    });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      await dispatch(CreateCouponCode(formData)).then(() => {
        dispatch(fetchCoupons());
        setIsDialogOpen(false);
        resetForm();
      });
    } catch (error) {
      console.error("error adding coupon code");
    }
  };

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);
  const columns = [
    {
      name: "code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "discountPercent",
      selector: (row) => row.discountPercent,
      sortable: true,
    },
    {
      name: "minOrderAmount",
      selector: (row) => row.minOrderAmount,
      sortable: true,
    },
    {
      name: "eligibleBank",
      selector: (row) => row.eligibleBank,
      sortable: true,
    },
    {
      name: "expiryDate",
      selector: (row) => row.expiryDate,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleEdit(row.id)}
            className="text-gray-600 hover:text-blue-800"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];
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
            <form onSubmit={handleAddCoupon} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Coupon code</Label>
                  <Input
                    id="coupon"
                    className="uppercase"
                    placeholder="coupon code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="discountPercent">Discount Percentage</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    placeholder="Enter Discount Percentage"
                    value={formData.discountPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPercent: e.target.value,
                      })
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
                      setFormData({
                        ...formData,
                        minOrderAmount: e.target.value,
                      })
                    }
                  />
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
                        <SelectItem key={bank.bankname} value={bank.bankname}>
                          <div className="flex flex-row items-center justify-between gap-x-4">
                            <img
                              src={bank.banklogo}
                              className="h-5 w-auto"
                              alt=""
                            />
                            {bank.bankname}
                          </div>
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
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="Expirydate">Expiry date</Label>
                <DatePicker
                  date={
                    formData.expiryDate ? new Date(formData.expiryDate) : null
                  }
                  setDate={(selectedDate) =>
                    setFormData({
                      ...formData,
                      expiryDate: selectedDate
                        ? selectedDate.toISOString()
                        : "",
                    })
                  }
                />
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
              data={coupons}
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
