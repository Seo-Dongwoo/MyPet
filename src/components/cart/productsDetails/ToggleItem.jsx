import React from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const ToggleItem = ({ cartItems, setCartItemsList, item }) => {
  const ToggleHandler = (id) => {
    const cartItemsList = [...cartItems];

    const selectdIdx = cartItemsList.findIndex((filter) => filter.id === id);

    cartItemsList[selectdIdx].isSelected =
      !cartItemsList[selectdIdx].isSelected;

    setCartItemsList(cartItemsList);
  };

  return (
    <ToggleWrapper>
      <ToggleBtn onClick={() => ToggleHandler(item.id)}>
        {item.isSelected ? (
          <MdKeyboardArrowDown style={{ fontSize: "40px" }} />
        ) : (
          <MdKeyboardArrowUp style={{ fontSize: "40px" }} />
        )}
      </ToggleBtn>
    </ToggleWrapper>
  );
};

const ToggleBtn = styled.button`
  width: 40px;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 18px 20px 16px 20px;
  line-height: 26px;
`;

export default ToggleItem;
