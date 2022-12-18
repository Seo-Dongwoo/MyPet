import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Order = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: pathname });
    }
  }, []);
  console.log(pathname);

  return <h1>Order</h1>;
};

export default Order;
