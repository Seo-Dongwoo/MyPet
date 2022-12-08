import React from "react";
import styled from "styled-components";
import EmptyImg from "../../assets/images/empty3.png";

const Empty = () => {
  return <EmptyCart></EmptyCart>;
};

const EmptyCart = styled.div`
  width: 100%;
  height: 550px;
  background-image: url(${EmptyImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Empty;
