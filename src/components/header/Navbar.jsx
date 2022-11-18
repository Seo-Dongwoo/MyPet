import React, { useEffect } from "react";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../../redux/modules/actions/userActions";

const Navbar = ({ toggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

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
                <NavLinks to="/">About</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/clothes">Clothes</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/food">Food</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/toy">Toy</NavLinks>
              </NavItem>
            </NavMenu>
          )}
          <NavBtn>
            {currentUser ? (
              <NavBtnLink to="/" onClick={handleLogout}>
                Logout
              </NavBtnLink>
            ) : (
              <NavBtnLink to="/login" onClick={handleLogout}>
                Login
              </NavBtnLink>
            )}
            <NavBtnLink to="/cart">
              <BsFillCartPlusFill />
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};
const Nav = styled.nav`
  background: #000;
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
  color: #fff;
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
    color: #fff;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 80px;
`;

const NavLinks = styled(LinkR)`
  color: #fff;
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
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
export default Navbar;
