import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ClothesCard = () => {
  const { products } = useSelector((state) => state.addProduct);
  const navigate = useNavigate();

  return (
    <>
      <TitleContainer>
        <Title>Clothes Products</Title>
      </TitleContainer>
      <ProductCards>
        {products.length > 0 ? (
          products.map((product, index) =>
            product.category === "clothes" ? (
              <CardContainer
                key={index}
                onClick={() => {
                  navigate(`/food/${product.id}`);
                }}
              >
                <ImageContainer>
                  <Image src={product.img} alt="" />
                </ImageContainer>
                <ProductContainer>
                  <NameContainer>
                    <Name>{product.product}</Name>
                  </NameContainer>
                  <span>{product.price}원</span>
                </ProductContainer>
              </CardContainer>
            ) : null
          )
        ) : (
          <h1>상품이 존재하지 않습니다.</h1>
        )}
      </ProductCards>
    </>
  );
};
const TitleContainer = styled.div`
  width: 100%;
  margin: 30px 0 20px 12%;
  @media screen and (max-width: 875px) {
    margin: 20px 0 20px 0;
  }

  @media screen and (max-width: 768px) {
    margin: 20px 0 20px 0;
  }
`;

const Title = styled.h1`
  color: #f5a0a0;
  @media screen and (max-width: 875px) {
    font-size: 2rem;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const ProductCards = styled.div`
  width: 70%;
  align-items: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff0f5;
  justify-content: center;
  @media screen and (max-width: 875px) {
    text-align: center;
    width: 100%;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  margin: 0 auto;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
`;

const CardContainer = styled.div`
  width: 250px;
  height: 280px;
  overflow: hidden;
  box-shadow: 0px 0px 15px -5px;
  margin: 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px;
  }
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 200px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const NameContainer = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
`;

const Name = styled.span``;

export default ClothesCard;
