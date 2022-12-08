import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartInitiate } from "../../redux/modules/actions/cartActions";
import Pagination from "../common/Pagination";
import Empty from "./Empty";
import ToggleItem from "./ToggleItem";
import SelectContainer from "./SelectContainer";

const CartContainer = () => {
  const { cartItems } = useSelector((state) => state.cartList);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(5);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteCartInitiate(id));

    alert("상품을 삭제하시겠습니까?");
  };

  // Pagination
  const indexOfLastProduct = currentPage * endPage;
  const indexOfFirstProduct = indexOfLastProduct - endPage;
  const PaginationProducts = cartItemsList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 체크박스 부분 선택
  const handleSingleCheck = (checked, item) => {
    if (checked) {
      setCheckItems((prev) => [...prev, item]);
    } else {
      setCheckItems(checkItems.filter((filter) => filter !== item));
    }
  };

  useEffect(() => {
    const cartItemsList = [...cartItems];
    cartItemsList.forEach((item) => (item.isSelected = true));
    setCartItemsList(cartItemsList);
  }, [cartItems]);

  // console.log(checkItems);

  return (
    <Container>
      <Title>장바구니</Title>
      <CartWrapper>
        <ProductItems>
          <SelectContainer
            cartItems={cartItems}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
            deleteHandler={deleteHandler}
          />
          <TitleWrapper>
            <ListTitle>장바구니 목록</ListTitle>
          </TitleWrapper>
          <ItemListContainer>
            <ItemsWrapper>
              <ItemMenu>
                {PaginationProducts.length > 0 ? (
                  <>
                    {PaginationProducts.map((item, index) => (
                      <ItemWrap key={index}>
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
                              checked={checkItems.includes(item) ? true : false}
                              type="checkbox"
                            />
                            <ItemImg src={item.img} />
                            <ItemTitle>{item.product}</ItemTitle>
                            <ItemQuantity>{item.quantity}개</ItemQuantity>
                            <ItemPrice>{item.price}원</ItemPrice>
                            <DeleteBtn onClick={() => deleteHandler(item.id)}>
                              x
                            </DeleteBtn>
                          </Item>
                        ) : (
                          <NoneItems></NoneItems>
                        )}
                      </ItemWrap>
                    ))}
                    <Pagination
                      currentPage={currentPage}
                      paginate={paginate}
                      endPage={endPage}
                      totalProducts={cartItemsList.length}
                    />
                  </>
                ) : (
                  <Empty />
                )}
              </ItemMenu>
            </ItemsWrapper>
          </ItemListContainer>
        </ProductItems>
        <OrderDetails></OrderDetails>
      </CartWrapper>
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

const OrderDetails = styled.div`
  width: 284px;
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

export default CartContainer;