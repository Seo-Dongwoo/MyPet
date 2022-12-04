import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  return <div>Cart</div>;
};

export default Cart;
