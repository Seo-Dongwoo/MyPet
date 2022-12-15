import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addOrderInitiate } from "../../../redux/modules/actions/orderActions";
import { useNavigate } from "react-router-dom";

const OrderButton = ({ checkItems, address, totalPrice, detailAddress }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItemsList = checkItems.map((item) => item);

  const handleSubmit = () => {
    const userUId = currentUser.uid;

    if (orderItemsList && address && detailAddress) {
      dispatch(
        addOrderInitiate({
          orderItemsList,
          totalPrice,
          address,
          userUId,
          detailAddress,
        })
      );
      navigate("/");
    } else {
      return false;
    }
  };

  useEffect(() => {}, [orderItemsList, totalPrice, address, detailAddress]);

  return (
    <Container>
      {orderItemsList.length === 0 ? (
        <Btn>상품을 선택하세요.</Btn>
      ) : address && detailAddress ? (
        <OrderBtn onClick={() => handleSubmit()}>주문하기</OrderBtn>
      ) : (
        <Btn>배송지를 입력하세요.</Btn>
      )}
      <OrderFooter>
        <FooterUl>
          <FooterLi>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</FooterLi>
          <FooterLi>
            [MyPet {">"} 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.
          </FooterLi>
        </FooterUl>
      </OrderFooter>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 56px;
  margin-top: 18px;
`;

const Btn = styled.button`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  border: none;
`;

const OrderBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: #01bf71;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  border: none;
`;

const OrderFooter = styled.div`
  width: 100%;
  height: 56px;
`;

const FooterUl = styled.ul`
  list-style: none;
  padding: 16px 0;
`;
const FooterLi = styled.li`
  font-size: 9px;
  font-weight: 600;
  padding-top: 4px;
  color: #666;
`;

export default OrderButton;
