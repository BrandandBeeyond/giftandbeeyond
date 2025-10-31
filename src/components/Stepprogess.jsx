"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Stepprogess = () => {
  const router = useRouter();
  const pathname = usePathname();

  const steps = [
    { label: "Cart", path: "/checkout" },
    { label: "Shipping Information", path: "/checkout/addresses" },
    { label: "Payment", path: "/checkout/payment" },
  ];

  const cleanPath = pathname?.replace(/\/$/, "");

  const currentIndex = steps.findIndex((s) => cleanPath === s.path);
  const safeIndex =
    currentIndex !== -1
      ? currentIndex
      : steps.findIndex((s) => cleanPath?.startsWith(s.path));

  // ✅ Prevent clicking on future steps
  const handleStepClick = (path, index) => {
    // Allow going back or re-clicking current step only
    if (index > safeIndex) return;
    router.push(path);
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === safeIndex;
          const isCompleted = index < safeIndex;
          const isFuture = index > safeIndex;

          return (
            <React.Fragment key={step.label}>
              <div className="flex items-center">
                <div
                  className={`flex items-center transition-all ${
                    isFuture
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => handleStepClick(step.path, index)}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium font-della transition-all duration-300
                      ${
                        isActive
                          ? "bg-[#3b2d25] text-white scale-110"
                          : isCompleted
                          ? "bg-[#bca999] text-white"
                          : "bg-[#c9b8a8] text-[#3b2d25]"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-della font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#3b2d25]"
                        : isCompleted
                        ? "text-[#6b584c]"
                        : "text-[#867666]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* ✅ Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-110 h-[1px] mx-2 ${
                      isCompleted ? "bg-[#3b2d25]" : "bg-[#d6c7b9]"
                    }`}
                  ></div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepprogess;
