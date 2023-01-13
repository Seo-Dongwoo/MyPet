import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartInitiate } from "../../redux/modules/actions/cartActions";
import Empty from "./productsDetails/Empty";
import ToggleItem from "./productsDetails/ToggleItem";
import SelectContainer from "./productsDetails/SelectContainer";
import Address from "./orderDetails/Address";
import OrderDetails from "./orderDetails/OrderDetails";
import OrderButton from "./orderDetails/OrderButton";
import ModalPortal from "../common/ModalProtal";
import DeleteModal from "../common/cart/DeleteModal";

const CartContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartList);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [modalOpen, setModalOpen] = useState();
  const [isToken, setIsToken] = useState("");
  const dispatch = useDispatch();

  // 현재 로그인한 유저와 상품을 장바구니에 담은 유저가 같은 상품만 뽑아냈다.
  const userCartItemsList = cartItemsList.reduce((acc, cur) => {
    if (cur.userId === currentUser.uid) {
      return (acc = [...acc, cur]);
    }
    return acc;
  }, []);

  // 체크박스 부분 선택
  const handleSingleCheck = (checked, item) => {
    if (checked) {
      setCheckItems((prev) => [...prev, item]);
    } else {
      setCheckItems(checkItems.filter((filter) => filter !== item));
    }
  };

  const deleteHandler = (id, userId) => {
    dispatch(deleteCartInitiate(id, userId));

    setModalOpen(false);
  };

  const HandleModalCheck = (token) => {
    setModalOpen(true);
    setIsToken(token);
  };

  const HandleModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const cartItemsList = [...cartItems];
    cartItemsList.forEach((item) => (item.isSelected = true));
    setCartItemsList(cartItemsList);
  }, [cartItems]);

  return (
    <Container>
      <Title>장바구니</Title>
      <CartWrapper>
        <ProductItems>
          <SelectContainer
            checkItems={checkItems}
            setCheckItems={setCheckItems}
            userCartItemsList={userCartItemsList}
          />
          <TitleWrapper>
            <ListTitle>장바구니 목록</ListTitle>
          </TitleWrapper>
          <ItemListContainer>
            <ItemsWrapper>
              <ItemMenu>
                {userCartItemsList.length > 0 ? (
                  <>
                    {userCartItemsList.map(
                      (item) =>
                        currentUser.uid === item.userId && (
                          <ItemWrap key={item.id}>
                            <ToggleItem
                              setCartItemsList={setCartItemsList}
                              item={item}
                              cartItems={cartItems}
                            />
                            {item.isSelected ? (
                              <Item>
                                <ItemCheckBox
                                  onChange={(e) =>
                                    handleSingleCheck(e.target.checked, item)
                                  }
                                  checked={
                                    checkItems.includes(item) ? true : false
                                  }
                                  type="checkbox"
                                />
                                <ItemImg src={item.img} />
                                <ItemTitle>{item.product}</ItemTitle>
                                <ItemQuantity>{item.quantity}개</ItemQuantity>
                                <ItemPrice>
                                  {item.price * item.quantity}원
                                </ItemPrice>
                                <DeleteBtn
                                  onClick={() => HandleModalCheck(item.token)}
                                >
                                  x
                                </DeleteBtn>
                              </Item>
                            ) : (
                              <NoneItems></NoneItems>
                            )}
                          </ItemWrap>
                        )
                    )}
                  </>
                ) : (
                  <Empty />
                )}
              </ItemMenu>
            </ItemsWrapper>
          </ItemListContainer>
        </ProductItems>
        <OrderDetailsContainer>
          <Address
            address={address}
            setAddress={setAddress}
            detailAddress={detailAddress}
            setDetailAddress={setDetailAddress}
          />
          <OrderDetails
            checkItems={checkItems}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          <OrderButton
            totalPrice={totalPrice}
            address={address}
            detailAddress={detailAddress}
            checkItems={checkItems}
          />
        </OrderDetailsContainer>
      </CartWrapper>
      {modalOpen && (
        <ModalPortal>
          <DeleteModal
            deleteHandler={deleteHandler}
            isToken={isToken}
            onClose={HandleModal}
            setModalOpen={setModalOpen}
          />
        </ModalPortal>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 1050px;
  margin: 0 auto 60px;
`;

const Title = styled.h2`
  width: 100%;
  padding: 50px 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.8rem;
`;

const CartWrapper = styled.div`
  width: 1050px;
  display: flex;
`;

const ProductItems = styled.div`
  width: 742px;
  padding-right: 20px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 16px 20px;
  line-height: 26px;
  border-bottom: 2px solid #ededed;
`;

const ItemListContainer = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
`;

const ItemWrap = styled.div`
  border-bottom: 2px solid #ededed;
`;

const ListTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const ItemsWrapper = styled.div`
  width: 100%;
`;

const NoneItems = styled.div``;

const ItemMenu = styled.ul`
  width: 100%;
`;
const Item = styled.li`
  display: flex;
  margin-bottom: 15px;
  height: 80px;
  padding-left: 10px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-contet: center;
`;

const ItemCheckBox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 15px;
`;

const ItemImg = styled.img`
  width: 80px;
  margin-right: 10px;
`;

const ItemTitle = styled.span`
  width: 400px;
`;

const ItemQuantity = styled.span`
  width: 50px;
  margin-right: 20px;
`;

const ItemPrice = styled.span`
  width: 80px;
`;

const DeleteBtn = styled.button`
  width: 30px;
  font-size: 16px;
  font-weight: 700;
  background-color: #fff;
  border: none;
  color: #bebebe;
  cursor: pointer;
`;

const OrderDetailsContainer = styled.div`
  position: sticky;
  top: 0;
  width: 284px;
  height: 600px;
  padding-top: 60px;
`;

export default CartContainer;
