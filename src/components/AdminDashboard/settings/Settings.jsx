import React from "react";
import styled from "styled-components";
import { AiFillSetting } from "react-icons/ai";

const Settings = () => {
  return (
    <Container>
      <span>Setting...</span>
      <Icon />
    </Container>
  );
};

const Container = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;

const Icon = styled(AiFillSetting)`
  width: 150px;
  height: 150px;
  color: #162349;
`;

export default Settings;
