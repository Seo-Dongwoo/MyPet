import React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";

const Pagination = ({ paginate, totalProducts, endPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / endPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Nav>
      <PaginationContainer>
        {pageNumbers.map((number) => (
          <PageItem key={number}>
            <PageLink
              aria-current={currentPage === number ? "currentPage" : null}
              onClick={() => paginate(number)}
            >
              {number}
            </PageLink>
          </PageItem>
        ))}
      </PaginationContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  width: 65%;
  text-align: center;
  margin: 0 auto 2%;
`;

const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const PageItem = styled.li`
  position: relative;
  width: 30px;
  height: 30px;
  margin-left: 5px;
  line-height: 25px;
  font-weight: 600;
  font-size: 16px;
  list-style: none;
`;

const PageLink = styled(BaseNavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  text-decoration: none;
  right: 0;
  background-color: #fff;
  color: #01bf71;
  border: 2px solid #01bf71;
  &[aria-current] {
    background-color: #01bf71;
    color: #fff;
  }
`;

export default Pagination;
