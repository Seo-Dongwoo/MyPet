import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Cart, Clothes, Food, Toy, Admin } from "./pages";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import "./App.css";
import { setUser } from "./redux/modules/actions/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
        console.log(authUser);
      } else {
        dispatch(setUser(null));
      }
    });
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/clothes" element={<Clothes />}></Route>
          <Route path="/food" element={<Food />}></Route>
          <Route path="/toy" element={<Toy />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
