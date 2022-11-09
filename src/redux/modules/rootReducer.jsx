import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  addProduct: productReducer,
});

export default rootReducer;
