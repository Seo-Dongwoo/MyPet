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
  Order,
  ProductPage,
  PrivateRoute,
} from "./pages";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "./App.css";
import { setUser } from "./redux/modules/actions/userActions";
import ScrollToTop from "./components/common/ScrollTop";

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
        <ScrollToTop />
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
          <Route
            path="/order/:orderParams"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/clothes/:productId" element={<ProductPage />} />
          <Route path="/food" element={<Food />} />
          <Route path="/food/:productId" element={<ProductPage />} />
          <Route path="/toy" element={<Toy />} />
          <Route path="/toy/:productId" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
