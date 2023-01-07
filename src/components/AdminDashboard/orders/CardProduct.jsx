import React from "react";
import styled from "styled-components";

const CardProduct = ({ item }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={item.img} alt="" />
      </ImageContainer>
      <ProductContainer>
        <NameContainer>
          <Name>
            {item.product} x {item.quantity}개
          </Name>
        </NameContainer>
        <Price>{item.price * item.quantity}원</Price>
      </ProductContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 250px;
  height: 280px;
  overflow: hidden;
  box-shadow: 0px 0px 15px -5px;
  margin: 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 15px 0px;
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
const Price = styled.span``;

export default CardProduct;
