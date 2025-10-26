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

  const currentIndex = steps.findIndex((s) => pathname.startsWith(s.path));

  const handleStepClick = (path) => {
    router.push(path);
  };

  return (
    <div className="w-full  border-b border-[#cbb9a4] py-6">
      <div className="max-w-7xl mx-auto flex justify-between space-x-8">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.label}>
              <div className="flex items-center  cursor-pointer">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium font-bruno
                    ${
                      isActive
                        ? "bg-[#3b2d25] text-white"
                        : isCompleted
                        ? "bg-[#bca999] text-white"
                        : "bg-[#c9b8a8] text-[#3b2d25]"
                    }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-bruno font-medium ${
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
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepprogess;
