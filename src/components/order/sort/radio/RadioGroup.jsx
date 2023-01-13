import React from "react";
import styled from "styled-components";

const RadioGroup = ({ label, children }) => {
  return (
    <RadioGroupContainer>
      <Label>{label}</Label>
      {children}
    </RadioGroupContainer>
  );
};

const RadioGroupContainer = styled.fieldset`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  border: none;
`;

const Label = styled.legend``;

export default RadioGroup;
