import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SiKakao } from "react-icons/si";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import OrderPrice from "../../components/order/OrderPrice";
import CardSelect from "../../components/order/CardSelect";
import SimpleCheckBox from "../../components/order/radio/SimpleCheckBox";
import { completedOrderInitiate } from "../../redux/modules/actions/completedOrderActions";
import { deleteCheckedItems } from "../../redux/modules/actions/cartActions";
import { deleteOrderInitiate } from "../../redux/modules/actions/orderActions";

const Order = () => {
  const { orderItems } = useSelector((state) => state.orderProduct);
  const { currentUser } = useSelector((state) => state.user);
  const { orderParams } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [creditOpen, setCreditOpen] = useState(false);
  const [simpleOpen, setSimpleOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // optional chaining 연산자 (?.) 는 체인의 각 참조가 유효한지 명시적으로 검증하지 않고,
  // 연결된 객체 체인 내에 깊숙이 위치한 속성 값을 읽을 수 있다.
  // reduce, concat 메소드를 이용해서 2차원 배열을 1차열 배열로 변환
  const orderProducts = orderItems
    .filter((item) => item.orderPathId === orderParams)
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc?.concat(cur), []);

  // 토글 버튼 구햔
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // 주문한 상품중에 가장 첫번 째 상품
  const closeToggleProduct = orderProducts.map((item) => item.product)[0];

  // 현재 상품 외 같이 주문한 상품의 수
  const closeProductsLength = orderProducts.map((item) => item).length - 1;

  // 총 결제 금액
  const orderPrice = orderItems
    .filter((item) => item.orderPathId === orderParams)
    .map((item) => item.orderItemsList)
    .reduce((acc, cur) => acc?.concat(cur), [])
    .reduce((acc, item) => acc + item.quantity * item.price, 0);

  const completedOrder = orderItems.filter(
    (item) => item.orderPathId === orderParams
  );

  // 주문 번호 생성
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const orderNumber = year + month + day + Math.floor(Math.random() * 100000);

  // 카카오페이 결제
  const handleKakaoPayment = () => {
    setCreditOpen(false);
    setSimpleOpen(false);
    setPayment("kakao");
  };

  // 휴대폰 결제
  const handlePhonePayment = () => {
    setCreditOpen(false);
    setSimpleOpen(false);
    setPayment("phone");
  };

  // 신용카드 결제
  const handleOpenCredit = () => {
    setCreditOpen(true);
    setSimpleOpen(false);
  };

  // 간편 결제
  const handleOpenSimple = () => {
    setCreditOpen(false);
    setSimpleOpen(true);
  };

  const handleSubmit = () => {
    const ids = orderItems
      .filter((item) => item.orderPathId === orderParams)
      .map((item) => item.orderItemsList)
      .reduce((acc, cur) => acc?.concat(cur), [])
      .map((item) => item.token);

    const orderId = orderItems
      .filter((item) => item.orderPathId === orderParams)
      .map((item) => item.orderPathId);

    console.log(orderId);
    if (payment) {
      dispatch(
        completedOrderInitiate({
          completedOrder,
          payment,
          orderNumber,
        })
      );
      dispatch(deleteCheckedItems(ids, currentUser.uid));
      dispatch(deleteOrderInitiate(orderId));
    }
    navigate(`/OrderCompleted/${orderNumber}`);
  };

  useEffect(() => {
    const price =
      orderPrice >= 20000
        ? orderPrice
        : orderPrice === 0
        ? 0
        : orderPrice + 3000;
    setTotalPrice(price);
  }, [orderPrice, payment]);

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
                  {closeProductsLength > 0 ? (
                    <CloseProductName>
                      {closeToggleProduct} 외 {closeProductsLength}개의 상품을
                      주문합니다.
                    </CloseProductName>
                  ) : (
                    <CloseProductName>
                      {closeToggleProduct} 상품을 주문합니다.
                    </CloseProductName>
                  )}
                </CloseProductContainer>
              </CloseOrderProducts>
            )}
            <OrderUserTag>주문자 정보</OrderUserTag>
            {currentUser.providerData.map((item) => (
              <OrderUserDiv key={item}>
                <UserDiv>
                  <UserLabel>보내는 분</UserLabel>
                  <User>{item.displayName}</User>
                </UserDiv>
                <UserDiv>
                  <UserLabel>이메일</UserLabel>
                  {item.providerId === "google.com" ? (
                    <User>구글 로그인 유저</User>
                  ) : item.providerId === "github.com" ? (
                    <User>깃허브 로그인 유저</User>
                  ) : (
                    <User>{item.email}</User>
                  )}
                </UserDiv>
                <UserDiv>
                  <UserLabel>휴대폰</UserLabel>
                  {item.phoneNumber === null ? (
                    <User>비공개</User>
                  ) : (
                    <User>{item.phoneNumber}</User>
                  )}
                </UserDiv>
                <PhoneDetail>
                  <Desc>휴대폰은 기본적으로 비공개입니다.</Desc>
                  <Desc>
                    정보변경은 MyPet {">"} 개인정보 수정에서 가능합니다.
                  </Desc>
                </PhoneDetail>
              </OrderUserDiv>
            ))}
            <AddressTag>배송지 정보</AddressTag>
            <OrderAddressDiv>
              {orderItems
                .filter((item) => item.orderPathId === orderParams)
                .map((item) => (
                  <div key={item}>
                    <AddressDiv>
                      <AddressLabel>배송지</AddressLabel>
                      <Address>{item.address}</Address>
                    </AddressDiv>
                    <AddressDiv>
                      <AddressLabel>상세 주소</AddressLabel>
                      <Address>{item.detailAddress}</Address>
                    </AddressDiv>
                  </div>
                ))}
            </OrderAddressDiv>
            <PriceTag>결제 금액</PriceTag>
            <OrderPriceDiv>
              <OrderPrice orderPrice={orderPrice} totalPrice={totalPrice} />
            </OrderPriceDiv>
            <PaymentTag>결제 수단</PaymentTag>
            <OrderPaymentDiv>
              <PaymentDiv>
                <PaymentLabel>결제 수단 선택</PaymentLabel>
                <PaymentButtonDiv>
                  <KakaoButton onClick={handleKakaoPayment}>
                    <Payment>
                      <KakaoIcon />
                    </Payment>
                  </KakaoButton>
                  <OtherPaymentDiv>
                    <CardPaymentButton onClick={handleOpenCredit}>
                      <Payment>신용카드</Payment>
                    </CardPaymentButton>
                    <SimplePaymentButton onClick={handleOpenSimple}>
                      <Payment>간편 결제</Payment>
                    </SimplePaymentButton>
                    <PhonePaymentButton onClick={handlePhonePayment}>
                      <Payment>핸드폰</Payment>
                    </PhonePaymentButton>
                  </OtherPaymentDiv>
                  {creditOpen ? (
                    <>
                      <CreditDiv>
                        <CardSelect setPayment={setPayment} />
                      </CreditDiv>
                      <InterestFree>
                        은행계열/체크/기프트/법인/개인사업자 기업카드는 무이자
                        할부 시 제외
                      </InterestFree>
                    </>
                  ) : simpleOpen ? (
                    <SimpleCheckBox setPayment={setPayment} />
                  ) : null}
                </PaymentButtonDiv>
              </PaymentDiv>
            </OrderPaymentDiv>
            <SubmitDiv>
              <SubmitButton onClick={() => handleSubmit()}>
                {totalPrice}원 결제하기
              </SubmitButton>
            </SubmitDiv>
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

const OrderAddressDiv = styled.div`
  padding: 10px 0px;
`;

const AddressDiv = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const AddressTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const AddressLabel = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 30px;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const Address = styled.span`
  display: inline-block;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const PriceTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const OrderPriceDiv = styled.div`
  padding: 15px 0px 0px 0px;
`;

const PaymentTag = styled.h3`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
  margin-top: 60px;
`;

const OrderPaymentDiv = styled.div`
  padding: 20px 0px;
`;

const PaymentDiv = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 700;
`;

const PaymentLabel = styled.span`
  display: inline-block;
  width: 160px;
  margin-right: 50px;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const PaymentButtonDiv = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const KakaoButton = styled.button`
  width: 350px;
  height: 50px;
  margin-bottom: 15px;
  background: white;
  border: 2px solid rgb(244, 244, 244);
  cursor: pointer;
  &:focus {
    background: rgb(246, 229, 0);
  }
`;

const KakaoIcon = styled(SiKakao)`
  font-size: 50px;
`;

const OtherPaymentDiv = styled.div`
  border: 2px solid rgb(244, 244, 244);
  height: 50px;
`;

const CardPaymentButton = styled.button`
  width: 33.33%;
  height: 100%;
  border: none;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    background: #01bf71;
    color: white;
  }
`;

const SimplePaymentButton = styled.button`
  width: 33.33%;
  height: 100%;
  border-right: 2px solid rgb(244, 244, 244);
  border-top: none;
  border-bottom: none;
  border-left: 2px solid rgb(244, 244, 244);
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    background: #01bf71;
    color: white;
  }
`;

const PhonePaymentButton = styled.button`
  width: 33.33%;
  height: 100%;
  border: none;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    background: #01bf71;
    color: white;
  }
`;

const Payment = styled.span`
  display: inline-block;
  line-height: 44px;
  letter-spacing: -0.32px;
`;

const CreditDiv = styled.div`
  width: 240px;
  margin: 10px 0;
`;

const InterestFree = styled.span`
  font-size: 10px;
  color: gray;
`;

const SubmitDiv = styled.div`
  border-top: 3px solid rgb(244, 244, 244);
`;

const SubmitButton = styled.button`
  width: 240px;
  height: 56px;
  display: block;
  padding: 0px 10px;
  text-align: center;
  overflow: hidden;
  border-radius: 3px;
  color: #fff;
  background-color: #01bf71;
  border: 0px none;
  margin: 40px auto 30px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

export default Order;
