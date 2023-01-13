import React from "react";
import styled from "styled-components";

const Category = ({ values, onChange, name }) => {
  return (
    <>
      <Select name={name} values={values} onChange={onChange}>
        <Option value="none">상품 종류를 선택해주세요.</Option>
        <Option value="clothes" name="clothes">
          Clothes
        </Option>
        <Option value="food" name="food">
          Food
        </Option>
        <Option value="toy" name="toy">
          Toy
        </Option>
      </Select>
    </>
  );
};

const Select = styled.select`
  max-width: 350px;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: grid;
  font-weight: 600;
  font-size: 1rem;
  padding-left: 10px;
`;
const Option = styled.option``;

export default Category;
