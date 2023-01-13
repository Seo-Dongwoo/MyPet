import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminCard from "../../common/admin/AdminCard";
import PieChartComponent from "../../common/admin/PieChart";
import OrderList from "./OrderList";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdPointOfSale } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCartPlus } from "react-icons/bs";
import { unsubscribeUsers } from "../../../redux/modules/actions/userActions";
import { unsubscribeProduct } from "../../../redux/modules/actions/productActions";
import { unsubscribeOrder } from "../../../redux/modules/actions/completedOrderActions";

const DashboardHome = () => {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const totalPrice = orderData
    .map((item) => item.data.completedOrder)
    .reduce((acc, cur) => acc?.concat(cur), [])
    .map((item) => item.totalPrice)
    .reduce((acc, cur) => acc + cur, 0);

  // 주문한 상품 중 카테고리 별 상품의 수를 구하기 위한 변수
  const categoryLength = orderData
    .map((item) => item.data.completedOrder)
    .reduce((acc, cur) => acc?.concat(cur), [])
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc?.concat(cur), [])
    .map((item) => item.category);

  const orderRate = (category) => {
    const orderLength = categoryLength.filter((item) => item === category);
    return orderLength.length;
  };

  const pieChartdata = [
    { name: "Food", value: orderRate("food") },
    { name: "Clothes", value: orderRate("clothes") },
    { name: "Toy", value: orderRate("toy") },
  ];

  useEffect(() => {
    unsubscribeUsers(setUserData);
    unsubscribeProduct(setProductData);
    unsubscribeOrder(setOrderData);
  }, []);

  return (
    <Container>
      <Title>DashBoard</Title>
      <CardWrapper>
        <AdminCard
          Icon={AiOutlineUserAdd}
          title={"소비자"}
          linkMsg={"소비자 목록 보기"}
          link={"/admin/users"}
          count={`${userData.length}명`}
        />
        <AdminCard
          Icon={BsCartPlus}
          title={"상품 수"}
          linkMsg={"상품 목록 보기"}
          link={"/admin/products"}
          count={`${productData.length}개`}
        />
        <AdminCard
          Icon={MdPointOfSale}
          title={"총 주문 건"}
          linkMsg={"주문 내역 보기"}
          link={"/admin/orders"}
          count={`${orderData.length}건`}
        />
        <AdminCard
          Icon={FcSalesPerformance}
          title={"총 주문 금액"}
          linkMsg={"주문 내역 보기"}
          link={"/admin/orders"}
          count={`${totalPrice}원`}
        />
      </CardWrapper>
      <ChartTitleContainer>
        <h2>카테고리 별 주문 비율</h2>
        <h2>최근 주문 목록</h2>
      </ChartTitleContainer>
      <ChartContainer>
        <PieChartComponent data={pieChartdata} />
        <PieChartDesc>
          <FoodBar>
            <span>Food</span>
          </FoodBar>
          <ClothesBar>
            <span>Clothes</span>
          </ClothesBar>
          <ToyBar>
            <span>Toy</span>
          </ToyBar>
        </PieChartDesc>
        <OrderList />
      </ChartContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
`;

const Title = styled.h1`
  padding: 100px 100px 30px 100px;
`;

const CardWrapper = styled.div`
  height: 150px;
  display: flex;
  padding: 10px;
  margin: 0 80px;
`;

const ChartTitleContainer = styled.div`
  display: flex;
  padding: 30px 80px 0 80px;
  h2 {
    margin: 0 200px;
  }
`;

const ChartContainer = styled.div`
  width: 570px;
  height: 400px;
  display: flex;
  padding-left: 100px;
`;

const PieChartDesc = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 130px;
  span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
`;

const FoodBar = styled.div`
  width: 70px;
  height: 25px;
  background-color: #0088fe;
  margin: 10px 0;
  text-align: center;
`;

const ClothesBar = styled.div`
  width: 100%;
  height: 25px;
  background-color: #ffbb28;
  margin: 10px 0;
  text-align: center;
`;

const ToyBar = styled.div`
  width: 100%;
  height: 25px;
  background-color: #00c49f;
  margin: 10px 0;
  text-align: center;
`;

export default DashboardHome;
