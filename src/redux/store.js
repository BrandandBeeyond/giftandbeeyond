// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import { ColorReducer } from "./reducers/ColorReducer";
import { KitReducer } from "./reducers/KitReducer";
import { CategoryReducer, subCategoryReducer } from "./reducers/CategoryReducer";
import { UserReducer } from "./reducers/UserReducer";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    colors: ColorReducer,
    kits: KitReducer,
    categories:CategoryReducer,
    subcategories:subCategoryReducer,
    users: UserReducer,
  },
});
