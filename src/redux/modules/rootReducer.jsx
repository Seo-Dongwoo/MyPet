import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import userReducer from "./reducer/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducer/cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  addProduct: productReducer,
  cart: cartReducer,
});
const persistConfig = {
  key: "root",
  storage,
};

export default persistReducer(persistConfig, rootReducer);
