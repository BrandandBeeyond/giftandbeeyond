// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});
