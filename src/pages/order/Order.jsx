import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { IoIosArrowDown } from "react-icons/io";

const Order = () => {
  const { orderItems } = useSelector((state) => state.orderProduct);
  const { orderParams } = useParams();

  // optional chaining 연산자 (?.) 는 체인의 각 참조가 유효한지 명시적으로 검증하지 않고,
  // 연결된 객체 체인 내에 깊숙이 위치한 속성 값을 읽을 수 있다.
  // reduce, concat 메소드를 이용해서 2차원 배열을 1차열 배열로 변환
  const orderProducts = orderItems
    .filter((item) => item.orderPathId === orderParams)
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc.concat(cur));

  console.log(orderProducts);

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
              <ToggleButton>
                <ToggleIcon />
              </ToggleButton>
            </OrderProductsToggle>
            <OrderProducts>
              {orderProducts &&
                orderProducts.map((item) => <div key={item.id}></div>)}
            </OrderProducts>
            <OrderUserTag>주문자 정보</OrderUserTag>
            <OrderUserDiv></OrderUserDiv>
            <AddressTag>배송지 정보</AddressTag>
            <AddressDiv></AddressDiv>
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
`;

const ToggleIcon = styled(IoIosArrowDown)`
  width: 100%;
  height: 100%;
`;

const OrderProducts = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 1px solid rgb(244, 244, 244);
`;

const ItemImg = styled.img`
  width: 80px;
  margin-right: 10px;
`;

const OrderUserTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const OrderUserDiv = styled.div`
  padding: 10px 0px;
`;

const AddressTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const AddressDiv = styled.div``;

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
