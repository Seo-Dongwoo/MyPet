import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdPets } from "react-icons/md";
import Loading from "../../loading/Loading";
import FoodCard from "./FoodCard";
import ClothesCard from "./ClothesCard";
import ToyCard from "./ToyCard";

const Products = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <ProductContainer>
      <TitleContainer>
        <Title>
          <Icon />
          All Products
          <Icon />
        </Title>
      </TitleContainer>
      <ItemContainer>
        {loading ? (
          <Loading />
        ) : (
          <>
            <FoodCard />
            <ClothesCard />
            <ToyCard />
          </>
        )}
      </ItemContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff0f5;
  overflow-x: hidden;
`;

const TitleContainer = styled.div`
  height: 15%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const ItemContainer = styled.div`
  width: 100%;
`;

const Title = styled.span`
  color: #01bf71;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
  }
`;

const Icon = styled(MdPets)`
  margin: 0 10px -3px 10px;
`;

export default Products;
