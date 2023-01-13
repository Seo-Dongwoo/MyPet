import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addCartInitiate } from "../../../redux/modules/actions/cartActions";
import { AiOutlineAlert } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const CartModal = ({ onClose, itemId, setModalOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.addProduct);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.value < 1) {
      alert("해당 상품은 최소구매 수량이 1개 입니다");
      return setQuantity(1);
    }
  };

  const handleSubmit = (product, userId) => {
    const token = currentUser.uid + v4();
    dispatch(
      addCartInitiate({ ...product, quantity, userId, token }, token, userId)
    );
    alert("해당 상품이 장바구니에 추가되었습니다.");
    setModalOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <ModalContainer>
      <Background>
        {currentUser ? (
          <ModalDiv>
            {products.map((product) =>
              product.id === itemId ? (
                <Container key={product.id}>
                  <ProductContainer>
                    <ProductTitle>
                      <Title>{product.product}</Title>
                    </ProductTitle>
                    <PriceQuantityContainer>
                      <PriceContainer>
                        <Price>{product.price}원</Price>
                      </PriceContainer>
                      <QuantityConatainer>
                        <DecreaseBtn
                          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                          type="button"
                        >
                          -
                        </DecreaseBtn>
                        <Quantity
                          type="text"
                          value={quantity}
                          onChange={handleChange}
                        />
                        <IncreaseBtn
                          onClick={() => setQuantity(quantity + 1)}
                          type="button"
                        >
                          +
                        </IncreaseBtn>
                      </QuantityConatainer>
                    </PriceQuantityContainer>
                  </ProductContainer>
                  <TotalPriceContaier>
                    <Title>총 가격</Title>
                    <TotalPrice>{product.price * quantity}원</TotalPrice>
                  </TotalPriceContaier>
                  <ButtonContaier>
                    <CartButton
                      onClick={() => handleSubmit(product, currentUser.uid)}
                    >
                      장바구니 담기
                    </CartButton>
                    <CancelButton onClick={() => onClose()}>닫기</CancelButton>
                  </ButtonContaier>
                </Container>
              ) : null
            )}
          </ModalDiv>
        ) : (
          <ModalDiv>
            <NoneUserModal>
              <AlramIcon />
              <LoginTitle>로그인 후 장바구니를 이용 가능</LoginTitle>
              <Span>로그인을 하시겠습니까 ?</Span>
            </NoneUserModal>
            <ButtonContaier>
              <CartButton onClick={() => handleLogin()}>확인</CartButton>
              <CancelButton onClick={() => onClose()}>닫기</CancelButton>
            </ButtonContaier>
          </ModalDiv>
        )}
      </Background>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalDiv = styled.div`
  position: absolute;
  width: 400px;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 1.5rem;
  background-color: #fff;
  color: black;
`;

const Container = styled.div``;

const ProductContainer = styled.div`
  width: 100%;
  margin: 2px 0px 4px;
  padding: 12px 0px;
  max-height: 355px;
  min-height: 130px;
`;

const ProductTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const PriceQuantityContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PriceContainer = styled.div``;

const Price = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const QuantityConatainer = styled.div``;

const Quantity = styled.input`
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid rgb(221, 223, 225);
  border-left: none;
  border-right: none;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;

const IncreaseBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid rgb(221, 223, 225);
  cursor: pointer;
  border-left: none;
`;
const DecreaseBtn = styled.button`
  width: 30px;
  height: 30px;
  font-size: 16px;
  margin-left: 5px;
  background-color: #fff;
  border: 1px solid rgb(221, 223, 225);
  cursor: pointer;
  border-right: none;
`;
const TotalPriceContaier = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const TotalPrice = styled.span`
  font-weight: 700;
`;

const ButtonContaier = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const CartButton = styled.button`
  width: 170px;
  height: 100%;
  margin-right: 5px;
  font-weight: 600;
  background-color: #01bf71;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const CancelButton = styled.button`
  width: 170px;
  height: 100%;
  margin-left: 5px;
  background-color: #fff;
  font-weight: 600;
  border: 1px solid rgb(221, 223, 225);
  border-radius: 5px;
`;

const NoneUserModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2px 0px 4px;
  padding: 30px 0px 20px;
  min-height: 130px;
  text-align: center;
  line-height: 20px;
`;

const LoginTitle = styled.span`
  font-weight: 600;
  margin-top: 10px;
`;

const Span = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
  color: red;
`;

const AlramIcon = styled(AiOutlineAlert)`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  color: #6a5acd;
`;

export default CartModal;
