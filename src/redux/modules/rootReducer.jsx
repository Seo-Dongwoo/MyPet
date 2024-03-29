import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducer/cartReducer";
import orderReducer from "./reducer/orderReducer";
import completedOrderReducer from "./reducer/completedOrderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cartList: cartReducer,
  orderProduct: orderReducer,
  completedOrder: completedOrderReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

export default persistReducer(persistConfig, rootReducer);
