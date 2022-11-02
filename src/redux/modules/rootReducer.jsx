import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
