import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import ModalPortal from "../../common/ModalProtal";
import CartModal from "../../common/CartModal";

const FoodCard = () => {
  const [modalOpen, setModalOpen] = useState();
  const [itemId, setItemId] = useState("");
  const { products } = useSelector((state) => state.addProduct);

  const navigate = useNavigate();

  const HandleModalCheck = (id) => {
    setModalOpen(true);
    setItemId(id);
  };

  const HandleModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <TitleContainer>
        <Title>Food Products</Title>
      </TitleContainer>
      <ProductCards>
        {products.length > 0 ? (
          products.map((product, index) =>
            product.category === "food" ? (
              <>
                <CardContainer
                  key={index}
                  onClick={() => {
                    navigate(`/food/${product.id}`);
                  }}
                >
                  <ImageContainer>
                    <Image src={product.img} alt="" />
                    <CartDiv>
                      <CartBtn
                        onClick={(e) => {
                          e.stopPropagation();
                          HandleModalCheck(product.id);
                        }}
                      >
                        <CartIcon />
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
                {modalOpen && (
                  <ModalPortal>
                    <CartModal
                      itemId={itemId}
                      onClose={HandleModal}
                      setModalOpen={setModalOpen}
                    />
                  </ModalPortal>
                )}
              </>
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
  margin: 15px 0 20px 12%;
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
  box-shadow: 0px 0px 15px -5px;
  margin: 10px;
  overflow: hidden;
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
  position: relative;
  width: 250px;
  height: 200px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
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
  cursor: pointer;
`;

const CartBtn = styled.button`
  border: none;
  background-color: transparent;
`;

const CartIcon = styled(BsCart2)`
  width: 20px;
  height: 20px;
  color: #fff;
`;

const NameContainer = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
`;

const Name = styled.span``;

export default FoodCard;
