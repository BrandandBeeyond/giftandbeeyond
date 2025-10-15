// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import { ColorReducer } from "./reducers/ColorReducer";
import storage from "redux-persist/lib/storage";
import { KitReducer } from "./reducers/KitReducer";
import {
  CategoryReducer,
  subCategoryReducer,
} from "./reducers/CategoryReducer";
import { UserReducer } from "./reducers/UserReducer";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  products: ProductReducer,
  colors: ColorReducer,
  kits: KitReducer,
  categories: CategoryReducer,
  subcategories: subCategoryReducer,
  users: UserReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
