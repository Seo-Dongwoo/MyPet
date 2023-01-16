import React from "react";
import styled from "styled-components";

const EventBanner = ({ img }) => {
  return (
    <Container>
      <img src={img} alt="" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  cursor: pointer;
`;

export default EventBanner;
