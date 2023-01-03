import React from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NewYear from "../../assets/images/new.jpg";

const OrderCompleted = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { completedOrders } = useSelector((state) => state.completedOrder);
  const { completedParams } = useParams();

  // 주문 번호
  const orderNumber = completedOrders
    .filter((item) => item.orderNumber === completedParams)
    .map((item) => item.orderNumber);

  return (
    <>
      <Header />
      <CompletedMessageDiv>
        <Image src={NewYear} />
        <CompletedMessage>
          {currentUser.providerData.map((item) => item.displayName)}님의 주문이
          완료되었습니다.
        </CompletedMessage>
      </CompletedMessageDiv>
      <CompletedOrderDiv>
        <OrderNumberDiv>
          <OrderNumberLabel>주문 번호</OrderNumberLabel>
          <OrderNumber>{orderNumber}</OrderNumber>
        </OrderNumberDiv>
        {completedOrders
          .filter((item) => item.orderNumber === completedParams)
          .map((item) => item.completedOrder)
          .reduce((acc, cur) => acc?.concat(cur), [])
          .map((item) => (
            <AddressDiv key={item}>
              <OrderAddressDiv>
                <OrderAddressLabel>배송지</OrderAddressLabel>
                <OrderAddress>{item.address}</OrderAddress>
              </OrderAddressDiv>
              <OrderAddressDiv>
                <OrderAddressLabel>상세 주소</OrderAddressLabel>
                <OrderAddress>{item.detailAddress}</OrderAddress>
              </OrderAddressDiv>
            </AddressDiv>
          ))}
      </CompletedOrderDiv>
      <LinkDiv>
        <HomeLink to="/">홈으로 이동</HomeLink>
        <MyPageLink to="#">주문내역 상세보기</MyPageLink>
      </LinkDiv>
      <Footer />
    </>
  );
};

const CompletedOrderDiv = styled.div`
  width: 1000px;
  padding: 10px 0px;
  display: flex;

  margin: 0 auto;
  padding: 0 0 0 200px;
`;

const CompletedMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 20%;
`;

const CompletedMessage = styled.h2`
  width: 1000px;
  height: 50px;
  text-align: center;
  margin-bottom: 60px;
  border-bottom: 1px solid rgb(51, 51, 51);
`;

const OrderNumberDiv = styled.div`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  border-right: 2px solid rgb(221, 221, 221);
`;
const OrderNumberLabel = styled.span`
  width: 130px;
  display: inline-block;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const OrderNumber = styled.span`
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const AddressDiv = styled.div`
  padding-left: 10px;
`;

const OrderAddressDiv = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const OrderAddressLabel = styled.span`
  width: 100px;
  display: inline-block;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const OrderAddress = styled.span`
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const LinkDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 70px 0 70px 0;
`;

const HomeLink = styled(Link)`
  width: 200px;
  height: 50px;
  background-color: #01bf71;
  margin-right: 10px;
  border: none;
  color: #fff;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
`;

const MyPageLink = styled(Link)`
  width: 200px;
  height: 50px;
  background: none;
  margin-left: 10px;
  border: 2px solid #01bf71;
  color: #01bf71;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
`;

export default OrderCompleted;
