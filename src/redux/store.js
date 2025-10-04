// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import { ColorReducer } from "./reducers/colorReducer";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    colors:ColorReducer
  },
});
