import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import userReducer from "./reducer/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducer/cartReducer";
import orderReducer from "./reducer/orderReducer";
import paymentOrderReducer from "./reducer/paymentOrderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  addProduct: productReducer,
  cartList: cartReducer,
  orderProduct: orderReducer,
  paymentOrder: paymentOrderReducer,
});
const persistConfig = {
  key: "root",
  storage,
};

export default persistReducer(persistConfig, rootReducer);
