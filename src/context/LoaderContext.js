"use client";

import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();
const ButtonLoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      <ButtonLoaderContext.Provider value={{ buttonLoading, setButtonLoading }}>
        {children}
      </ButtonLoaderContext.Provider>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
export const useButtonLoader = () => useContext(ButtonLoaderContext);
