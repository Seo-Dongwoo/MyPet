import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Row>
          <Column>
            <Title>PRODUCTS</Title>
            <ItemLink to="/">About</ItemLink>
            <ItemLink to="/clothes">Clothes</ItemLink>
            <ItemLink to="/food">Food</ItemLink>
            <ItemLink to="/toy">Toy</ItemLink>
          </Column>
          <Column>
            <Title>SERVICES</Title>
            <ItemLink>Marketing</ItemLink>
            <ItemLink>Consulting</ItemLink>
            <ItemLink>Development</ItemLink>
            <ItemLink>Design</ItemLink>
          </Column>
          <Column>
            <Title>FOLLOW US</Title>
            <ItemLink>Facebook</ItemLink>
            <ItemLink>Instagram</ItemLink>
            <ItemLink>Twitter</ItemLink>
            <ItemLink>Kakao</ItemLink>
          </Column>
          <Column>
            <Title>ACCOUNT</Title>
            <ItemLink to="/login">Login</ItemLink>
            <ItemLink to="/signup">Signup</ItemLink>
            <ItemLink to="/cart">Cart</ItemLink>
          </Column>
        </Row>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  padding: 80px 60px;
  border-top: 2px solid #ededed;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-top: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const ItemLink = styled(Link)`
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
  color: black;
  &:hover {
    color: #01bf71;
    transition: 200ms ease-in;
  }
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
  font-weight: bold;
  color: #01bf71;
`;

export default Footer;
