import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkR } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebar, toggle }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        <SidebarContainer openSidebar={openSidebar} onClick={toggle}>
          <Icon onClick={toggle}>
            <CloseIcon />
          </Icon>
          <SidebarWrapper>
            <SidebarMenu>
              <SidebarLinks to="/">About</SidebarLinks>
              <SidebarLinks to="/clothes">Clothes</SidebarLinks>
              <SidebarLinks to="/food">Food</SidebarLinks>
              <SidebarLinks to="/toy">Toy</SidebarLinks>
            </SidebarMenu>
            <SideBtnWrap>
              <SideBarLogin to="/login">Logout</SideBarLogin>
            </SideBtnWrap>
          </SidebarWrapper>
        </SidebarContainer>
      ) : (
        <SidebarContainer openSidebar={openSidebar} onClick={toggle}>
          <Icon onClick={toggle}>
            <CloseIcon />
          </Icon>
          <SidebarWrapper>
            <SidebarMenu>
              <SidebarLinks to="/">About</SidebarLinks>
              <SidebarLinks to="/clothes">Clothes</SidebarLinks>
              <SidebarLinks to="/food">Food</SidebarLinks>
              <SidebarLinks to="/toy">Toy</SidebarLinks>
            </SidebarMenu>
            <SideBtnWrap>
              <SideBarLogin to="/login">Login</SideBarLogin>
            </SideBtnWrap>
          </SidebarWrapper>
        </SidebarContainer>
      )}
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
  color: #fff;
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
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export default Sidebar;
