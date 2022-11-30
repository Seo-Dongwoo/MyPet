import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Cart,
  Clothes,
  Food,
  Toy,
  Admin,
  ProductPage,
  PrivateRoute,
} from "./pages";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "./App.css";
import { setUser } from "./redux/modules/actions/userActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/food" element={<Food />} />
          <Route path="/food/:productId" element={<ProductPage />} />
          <Route path="/toy" element={<Toy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
