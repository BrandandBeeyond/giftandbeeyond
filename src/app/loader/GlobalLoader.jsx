import LoaderCheckout from "@/components/LoaderCheckout";
import Splashscreen from "@/components/Splashscreen";
import { useLoader } from "@/context/LoaderContext";
import { usePathname } from "next/navigation";
import React from "react";

const GlobalLoader = () => {
  const { showLoader } = useLoader();
  const pathname = usePathname();

  if (!showLoader || !pathname) return null;

  return pathname.includes("/checkout") ? <LoaderCheckout /> : <Splashscreen />;
};

export default GlobalLoader;
