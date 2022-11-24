import React from "react";
import Header from "../../components/header/Header";
import MainSection from "../../components/home/MainSection";
import Products from "../../components/home/products/Products";

const Home = () => {
  return (
    <div>
      <Header />
      <MainSection />
      <Products />
    </div>
  );
};

export default Home;
