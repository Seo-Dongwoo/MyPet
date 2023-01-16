import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const { data, Icon, handleModalCheck, category } = props;
  const navigate = useNavigate();

  return (
    <ProductCards>
      {data.length > 0 ? (
        data.map((product, index) =>
          product.category === `${category}` ? (
            <CardContainer
              key={index}
              onClick={() => {
                navigate(`/${category}/${product.id}`);
              }}
            >
              <ImageContainer>
                <Image src={product.img} alt="" />
                <CartDiv>
                  <CartBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalCheck(product.id);
                    }}
                  >
                    <span>
                      <Icon />
                    </span>
                  </CartBtn>
                </CartDiv>
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
  );
};

const ProductCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  gap: 31px 18px;
  justify-content: center;
  margin-bottom: 50px;
  @media screen and (max-width: 875px) {
    text-align: center;
    width: 100%;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 250px;
  height: 280px;
  margin: 5px;
  overflow: hidden;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  margin: 0 auto;
  font-size: 15px;
  font-weight: 700;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 200px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
  }
`;

const CartDiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: rgba(120, 239, 118, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const CartBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  span {
    font-size: 1.3rem;
    font-weight: bold;
    color: #fff;
  }
`;

const NameContainer = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Name = styled.span``;

export default ProductCard;
