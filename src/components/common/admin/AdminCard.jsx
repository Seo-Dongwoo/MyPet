import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AdminCard = (props) => {
  const { Icon, title, linkMsg, link, count } = props;

  return (
    <Container>
      <DescContainer>
        <span>
          <Icon />
        </span>
        <h1>{title}</h1>
        <CardLink to={link}>{linkMsg}</CardLink>
      </DescContainer>
      <NumberContainer>
        <h3>{count}</h3>
      </NumberContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 15px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
`;

const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 10px 0 0 30px;
  span {
    font-size: 2.3rem;
    padding-bottom: 10px;
    color: #01bf71;
  }

  h1 {
    font-size: 0.9rem;
    padding-bottom: 5px;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: blue;
  font-size: 0.8rem;
`;

const NumberContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  h3 {
  }
`;

export default AdminCard;
