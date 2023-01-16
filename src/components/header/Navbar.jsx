import React from "react";
import styled from "styled-components";
import { Link as LinkR, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../../redux/modules/actions/userActions";

const Navbar = ({ toggle }) => {
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
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">MyPet</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          {currentUser && currentUser.uid === process.env.REACT_APP_ADMIN_ID ? (
            <NavMenu>
              <NavItem>
                <NavLinks to="/admin">관리자 페이지</NavLinks>
              </NavItem>
            </NavMenu>
          ) : (
            <NavMenu>
              <NavItem>
                <NavLinks to="/">Home</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/food">사료/간식</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/clothes">의류/야외용품</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/toy">장난감</NavLinks>
              </NavItem>
            </NavMenu>
          )}
          <NavBtn>
            {currentUser ? (
              <>
                <NavBtnLink to="/" onClick={handleLogout}>
                  Logout
                </NavBtnLink>
                <NavBtnLink to="/cart">
                  {totalLength.length > 0 ? (
                    <>
                      <BsFillCartPlusFill />
                      <CartItemsLength>{totalLength.length}</CartItemsLength>
                    </>
                  ) : (
                    <BsFillCartPlusFill />
                  )}
                </NavBtnLink>
              </>
            ) : (
              <>
                <NavBtnLink to="/login" onClick={handleLogout}>
                  Login
                </NavBtnLink>
                <NavBtnLink to="/cart">
                  <BsFillCartPlusFill />
                </NavBtnLink>
              </>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};
const Nav = styled.nav`
  background: white;
  border-bottom: 1px solid #ededed;
  height: 80px;
  display: flex;
  justift-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
`;

const NavLogo = styled(LinkR)`
  color: black;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: black;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -100px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 80px;
`;

const NavLinks = styled(LinkR)`
  color: black;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.35rem;
  height: 100%;
  cursor: pointer;
  &.active {
    border-bottom: 3px solid #01bf71;
  }
  &:hover {
    color: #01bf71;
    border-bottom: 4px solid #01bf71;
    transition: all 0.2s ease-out;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(LinkR)`
  width: 90px;
  text-align: center;
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px;
  margin-right: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.3s ease-in-out;
    border: 3px solid #01bf71;
    background: #fff;
    color: #01bf71;
  }
`;

const CartItemsLength = styled.span`
  display: block;
  position: absolute;
  top: 10px;
  right: 50px;
  width: 19px;
  height: 19px;
  padding: 0;
  border-radius: 100%;
  background: #55d2b0;
  color: #fff;
  text-align: center;
  line-height: 19px;
`;
export default Navbar;
