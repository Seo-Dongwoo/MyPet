import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { unsubscribeOrder } from "../../../redux/modules/actions/completedOrderActions";
import OrderPrice from "../../order/OrderPrice";
import CardProduct from "./CardProduct";
import Pagination from "../../common/Pagination";

const DetailOrder = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(4);
  const { orderParams } = useParams();

  const orderData = data
    .filter((item) => item.id === orderParams)
    .map((item) => item.data.completedOrder)
    .reduce((acc, cur) => acc?.concat(cur), []);

  const orderPrice = orderData
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc?.concat(cur), [])
    .reduce((acc, item) => acc + item.quantity * item.price, 0);

  const totalPrice = orderData.map((item) => item.totalPrice);

  const productData = orderData
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc?.concat(cur), []);

  // Pagination
  const indexOfLastProduct = currentPage * endPage;
  const indexOfFirstProduct = indexOfLastProduct - endPage;
  const currentProduct = productData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    unsubscribeOrder(setData);
  }, []);

  return (
    <Container>
      <Title>주문 상세 정보</Title>
      <OrderContainer>
        <OrderDetailContainer>
          {data
            .filter((item) => item.id === orderParams)
            .map((item) => (
              <OrderDetailWrap key={item}>
                <OrderDiv>
                  <OrderLabel>주문 번호</OrderLabel>
                  <Order>{item.data.orderNumber}</Order>
                </OrderDiv>
                <OrderDiv>
                  <OrderLabel>결제 수단</OrderLabel>
                  <Order>{item.data.payment}</Order>
                </OrderDiv>
                <OrderDiv>
                  <OrderLabel>주문한 분</OrderLabel>
                  <Order>
                    {currentUser.providerData.map((item) => item.displayName)}
                  </Order>
                </OrderDiv>
              </OrderDetailWrap>
            ))}
          {orderData.map((item) => (
            <OrderDetailWrap key={item}>
              <OrderDiv>
                <OrderLabel>배송지</OrderLabel>
                <Order>{item.address}</Order>
              </OrderDiv>
              <OrderDiv>
                <OrderLabel>상세 주소</OrderLabel>
                <Order>{item.detailAddress}</Order>
              </OrderDiv>
            </OrderDetailWrap>
          ))}
        </OrderDetailContainer>
        <OrderPriceContaier>
          <OrderPrice totalPrice={totalPrice} orderPrice={orderPrice} />
        </OrderPriceContaier>
      </OrderContainer>
      <OrderProducts>
        <OrderLength>총 {productData.length}건</OrderLength>
        <ProductCards>
          {currentProduct.map((item) => (
            <CardProduct key={item.id} item={item} />
          ))}
        </ProductCards>
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          endPage={endPage}
          totalProducts={productData.length}
        />
      </OrderProducts>
    </Container>
  );
};

const Container = styled.div`
  width: 1400px;
  height: 100%;
  padding: 100px 150px 0 150px;
`;

const Title = styled.h2`
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(220, 220, 220);
`;

const OrderContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const OrderDetailContainer = styled.div`
  width: 65%;
  padding: 30px;
  background-color: rgb(250, 250, 250);
  border: none;
  border-radius: 20px;
`;

const OrderDetailWrap = styled.div``;

const OrderDiv = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const OrderLabel = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 30px;
  line-height: 36px;
  letter-spacing: -0.32px;
`;

const Order = styled.span`
  display: inline-block;
  line-height: 36px;
  letter-spacing: -0.32px;
`;

const OrderPriceContaier = styled.div`
  width: 35%;
  margin-left: 20px;
  border-radius: 20px;
  overflow: hidden;
`;

const OrderProducts = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
`;

const OrderLength = styled.h3`
  margin-bottom: 5px;
`;

const ProductCards = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
`;

export default DetailOrder;
