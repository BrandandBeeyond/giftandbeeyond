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
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { CartReducer } from "./reducers/CartReducer";

const rootReducer = combineReducers({
  products: ProductReducer,
  colors: ColorReducer,
  kits: KitReducer,
  categories: CategoryReducer,
  subcategories: subCategoryReducer,
  users: UserReducer,
  cart:CartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users","cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {

        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
