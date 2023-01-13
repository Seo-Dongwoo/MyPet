import React from "react";
import styled from "styled-components";

const Sort = ({ handleChange }) => {
  return (
    <Select onChange={handleChange}>
      <Option value="default">선택</Option>
      <Option value="sortByHighPrice">높은 가격순</Option>
      <Option value="sortByLowPrice">낮은 가격순</Option>
    </Select>
  );
};

const Select = styled.select`
  width: 120px;
  height: 35px;
  font-weight: bold;
  margin: auto 0;
`;
const Option = styled.option``;

export default Sort;
