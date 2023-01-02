import React, { useEffect } from "react";
import styled from "styled-components";

const OrderDetails = ({ checkItems, totalPrice, setTotalPrice }) => {
  const productsPrice = checkItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const price =
      productsPrice >= 20000
        ? productsPrice
        : productsPrice === 0
        ? 0
        : productsPrice + 3000;
    setTotalPrice(price);
  }, [productsPrice]);

  const handleDeliveryPrice = () => {
    return productsPrice >= 20000 ? (
      <DeliveryPrice>0</DeliveryPrice>
    ) : productsPrice === 0 ? (
      <DeliveryPrice>0</DeliveryPrice>
    ) : (
      <DeliveryPrice>+3000</DeliveryPrice>
    );
  };

  return (
    <Container>
      <PriceDiv>
        <Price>상품 금액</Price>
        <Price>{productsPrice}원</Price>
      </PriceDiv>
      <DiscountDiv>
        <Discount>상품 할인 금액</Discount>
        <Discount>0원</Discount>
      </DiscountDiv>
      <DeliveryPriceDiv>
        <DeliveryPrice>배송비</DeliveryPrice>
        <DeliveryPrice>{handleDeliveryPrice()}원</DeliveryPrice>
      </DeliveryPriceDiv>
      <FreeDeliveryPrice>20000원 이상주문 시, 무료배송</FreeDeliveryPrice>
      <TotalPriceDiv>
        <TotalPrice>총 결제 금액</TotalPrice>
        <TotalPrice>{totalPrice}원</TotalPrice>
      </TotalPriceDiv>
    </Container>
  );
};

const Container = styled.div`
  padding: 19px 18px 18px 20px;
  border: 1px solid rgb(242, 242, 242);
  background-color: rgb(250, 250, 250);
`;

const PriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
const DiscountDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`;

const Discount = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
const DeliveryPriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`;

const DeliveryPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const FreeDeliveryPrice = styled.p`
  display: block;
  padding-top: 2px;
  color: rgb(95, 0, 128);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: right;
`;

const TotalPriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 16px;
`;

const TotalPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export default OrderDetails;
