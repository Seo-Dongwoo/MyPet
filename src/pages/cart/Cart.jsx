import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CartContainer from "../../components/cart/CartContainer";

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Header />
      <CartContainer />
      <Footer />
    </>
  );
};

export default Cart;
