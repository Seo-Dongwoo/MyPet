import React from "react";
import styled from "styled-components";

const AuthInput = ({ type, name, placeholder, value, onBlur, onChange }) => {
  return (
    <InputField>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </InputField>
  );
};

const InputField = styled.div`
  max-width: 350px;
  width: 100%;
  height: 55px;
  background-color: #f0f0f0;
  margin: 10px 0;
  display: grid;
  border-radius: 55px;
  padding: 0 0.4rem;
`;
const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  margin-left: 10px;
  &::placeholder {
    color: #aaa;
    font-weight: 500;
  }
`;

export default AuthInput;
