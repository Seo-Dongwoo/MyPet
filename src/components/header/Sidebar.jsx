import React from "react";
import { useDispatch } from "react-redux";
import { logoutInitiate } from "../../redux/modules/actions/userActions";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkR } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFillCartPlusFill } from "react-icons/bs";

const Sidebar = ({ openSidebar, toggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartList);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  // 현재 로그인한 유저와 상품을 장바구니에 담은 유저가 같은 상품만 뽑아냈다.
  const totalLength = cartItems.reduce((acc, cur) => {
    if (currentUser && cur.userId === currentUser.uid) {
      return (acc = [...acc, cur]);
    }
    return acc;
  }, []);

  return (
    <>
      <SidebarContainer openSidebar={openSidebar} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          {currentUser && currentUser.uid === process.env.REACT_APP_ADMIN_ID ? (
            <AdminMenu>
              <SidebarLinks to="/admin">관리자 페이지</SidebarLinks>
            </AdminMenu>
          ) : (
            <SidebarMenu>
              <SidebarLinks to="/">Home</SidebarLinks>
              <SidebarLinks to="/food">사료/간식</SidebarLinks>
              <SidebarLinks to="/clothes">의류/야외용품</SidebarLinks>
              <SidebarLinks to="/toy">장난감</SidebarLinks>
            </SidebarMenu>
          )}
          <SideBtnWrap>
            {currentUser ? (
              <>
                <SideBarLogin to="/" onClick={handleLogout}>
                  Logout
                </SideBarLogin>
                <SideBarCart to="/cart">
                  {totalLength.length > 0 ? (
                    <>
                      <BsFillCartPlusFill />
                      <CartItemsLength>{totalLength.length}</CartItemsLength>
                    </>
                  ) : (
                    <BsFillCartPlusFill />
                  )}
                </SideBarCart>
              </>
            ) : (
              <>
                <SideBarLogin to="/login" onClick={handleLogout}>
                  Login
                </SideBarLogin>
                <SideBarCart to="/login">
                  <BsFillCartPlusFill />
                </SideBarCart>
              </>
            )}
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.6s ease-in-out;
  opacity: ${({ openSidebar }) => (openSidebar ? "100%" : "0")};
  top: ${({ openSidebar }) => (openSidebar ? "0" : "-100%")};
`;

const CloseIcon = styled(FaTimes)`
  color: white;
`;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

const SidebarWrapper = styled.div`
  color: #fff;
`;

const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(5, 60px);
  }
`;

const AdminMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(5, 60px);
  }
`;

const SidebarLinks = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

const SideBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SideBarLogin = styled(LinkR)`
  width: 250px;
  text-align: center;
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 16px 64px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-bottom: 15px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background: #fff;
    color: #01bf71;
  }
`;

const SideBarCart = styled(LinkR)`
  width: 250px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 16px 64px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  &:hover {
    transition: all 0.3s ease-in-out;
    background: #fff;
    color: #01bf71;
  }
`;

const CartItemsLength = styled.span`
  display: block;
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 100%;
  background: #55d2b0;
  color: #fff;
  text-align: center;
  line-height: 22px;
  margin-left: 10px;
`;

export default Sidebar;
