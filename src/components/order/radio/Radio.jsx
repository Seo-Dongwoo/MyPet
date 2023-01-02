import React from "react";
import styled from "styled-components";
const Radio = ({
  setPayment,
  value,
  children,
  name,
  defaultChecked,
  disabled,
}) => {
  const handleChange = (e) => {
    setPayment(e.target.value);
  };

  return (
    <Label>
      <Input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      {children}
    </Label>
  );
};

const Label = styled.label`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
`;

export default Radio;
