import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CartContainer from "../../components/cart/CartContainer";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <CartContainer />
      <Footer />
    </>
  );
};

export default Cart;
