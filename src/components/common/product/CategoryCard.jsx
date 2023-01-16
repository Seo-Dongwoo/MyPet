import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ data, category }) => {
  const navigate = useNavigate();

  return (
    <ProductCards>
      {data.length > 0 ? (
        data.map((product, index) => (
          <CardContainer
            key={index}
            onClick={() => {
              navigate(`/${category}/${product.id}`);
            }}
          >
            <ImageContainer>
              <Image src={product.img} alt="" />
            </ImageContainer>
            <ProductContainer>
              <NameContainer>
                <Name>{product.product}</Name>
              </NameContainer>
              <Price>{product.price}원</Price>
            </ProductContainer>
          </CardContainer>
        ))
      ) : (
        <h1>상품이 존재하지 않습니다.</h1>
      )}
    </ProductCards>
  );
};

const ProductCards = styled.div`
  width: 70%;
  align-items: center;
  margin: 0 auto 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  gap: 31px 18px;
  justify-content: center;
  @media screen and (max-width: 875px) {
    text-align: center;
    width: 100%;
  }
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

export default CategoryCard;
