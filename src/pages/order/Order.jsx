import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Order = () => {
  const { orderItems } = useSelector((state) => state.orderProduct);
  const { currentUser } = useSelector((state) => state.user);
  const { orderParams } = useParams();
  const [isOpen, setIsOpen] = useState(true);

  // optional chaining 연산자 (?.) 는 체인의 각 참조가 유효한지 명시적으로 검증하지 않고,
  // 연결된 객체 체인 내에 깊숙이 위치한 속성 값을 읽을 수 있다.
  // reduce, concat 메소드를 이용해서 2차원 배열을 1차열 배열로 변환
  const orderProducts = orderItems
    .filter((item) => item.orderPathId === orderParams)
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc?.concat(cur), []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeToggleProduct = orderProducts.map((item) => item.product)[0];
  const closeProductsLength = orderProducts.map((item) => item).length - 1;

  return (
    <>
      <Header />
      <Container>
        <OrderContainer>
          <HeadlineDiv>
            <Headline>주문/결제</Headline>
          </HeadlineDiv>
          <OrderDiv>
            <OrderProductsToggle>
              <OrderProductsTag>주문 상품</OrderProductsTag>
              <ToggleButton onClick={() => handleToggle()}>
                {isOpen ? <ToggleOpen /> : <ToggleClose />}
              </ToggleButton>
            </OrderProductsToggle>
            {isOpen ? (
              <OrderProducts>
                {orderProducts.map((item) => (
                  <ProductContainer key={item.id}>
                    <ProductImg src={item.img} />
                    <ProductName>{item.product}</ProductName>
                    <ProductQuantity>{item.quantity}개</ProductQuantity>
                    <ProductPrice>{item.price * item.quantity}원</ProductPrice>
                  </ProductContainer>
                ))}
              </OrderProducts>
            ) : (
              <CloseOrderProducts>
                <CloseProductContainer>
                  <CloseProductName>
                    {closeToggleProduct} 외 {closeProductsLength}개의 상품을
                    주문합니다.
                  </CloseProductName>
                </CloseProductContainer>
              </CloseOrderProducts>
            )}
            <OrderUserTag>주문자 정보</OrderUserTag>
            <OrderUserDiv>
              <UserDiv>
                <UserLabel>보내는 분</UserLabel>
                <User>{currentUser.displayName}</User>
              </UserDiv>
              <UserDiv>
                <UserLabel>이메일</UserLabel>
                <User>{currentUser.email}</User>
              </UserDiv>
              <UserDiv>
                <UserLabel>휴대폰</UserLabel>
                {currentUser.phoneNumber === null ? (
                  <User>비공개</User>
                ) : (
                  <User>{currentUser.phoneNumber}</User>
                )}
              </UserDiv>
              <PhoneDetail>
                <Desc>휴대폰은 기본적으로 비공개입니다.</Desc>
                <Desc>
                  정보변경은 MyPet {">"} 개인정보 수정에서 가능합니다.
                </Desc>
              </PhoneDetail>
            </OrderUserDiv>
            <AddressTag>배송지 정보</AddressTag>
            <AddressDiv>
              {orderItems
                .filter((item) => item.orderPathId === orderParams)
                .map((item) => (
                  <div key={item}>
                    <UserDiv>
                      <UserLabel>배송지</UserLabel>
                      <User>{item.address}</User>
                    </UserDiv>
                    <UserDiv>
                      <UserLabel>상세 주소</UserLabel>
                      <User>{item.detailAddress}</User>
                    </UserDiv>
                  </div>
                ))}
            </AddressDiv>
            <PriceTag>결제 금액</PriceTag>
            <PriceDiv></PriceDiv>
            <PaymentTag>결제 수단</PaymentTag>
            <PaymentDiv></PaymentDiv>
            <SubmitDiv></SubmitDiv>
          </OrderDiv>
        </OrderContainer>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

const OrderContainer = styled.div`
  width: 1050px;
  padding: 60px 0px;
  margin: 0px auto;
`;

const HeadlineDiv = styled.div`
  width: 100%;
  height: 70px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Headline = styled.h2`
  padding-left: 0;
  line-height: 70px;
  color: black;
`;

const OrderDiv = styled.div``;

const OrderProductsToggle = styled.div`
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
`;

const OrderProductsTag = styled.h3``;

const ToggleButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0px;
  background: none;
  outline: none;
  cursor: pointer;
`;

const ToggleOpen = styled(IoIosArrowUp)`
  width: 100%;
  height: 100%;
`;

const ToggleClose = styled(IoIosArrowDown)`
  width: 100%;
  height: 100%;
`;

const OrderProducts = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
`;

const CloseOrderProducts = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 1px solid rgb(244, 244, 244);
`;

const CloseProductContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 25px 0px;
  border-bottom: 1px solid rgb(244, 244, 244);
`;

const ProductImg = styled.img`
  width: 80px;
  margin-right: 30px;
`;

const ProductName = styled.span`
  width: 800px;
  font-weight: 600;
`;

const CloseProductName = styled.span`
  width: 800px;
  font-weight: 600;
  text-align: center;
`;

const ProductQuantity = styled.span`
  width: 60px;
`;

const ProductPrice = styled.span`
  width: 80px;
  text-align: end;
  font-weight: 600;
`;

const OrderUserTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 30px;
`;

const OrderUserDiv = styled.div`
  padding: 10px 0px;
`;
const UserDiv = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const UserLabel = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 30px;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const User = styled.span`
  display: inline-block;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const PhoneDetail = styled.div`
  margin-left: 190px;
`;

const Desc = styled.p`
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  color: rgb(102, 102, 102);
  letter-spacing: -0.32px;
`;

const AddressDiv = styled.div`
  padding: 10px 0px;
`;

const AddressTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const PriceTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const PriceDiv = styled.div``;

const PaymentTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const PaymentDiv = styled.div``;

const SubmitDiv = styled.div``;

export default Order;
