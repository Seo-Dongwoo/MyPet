import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducer/loginReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
