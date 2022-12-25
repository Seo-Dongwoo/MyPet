import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteCheckedItems } from "../../../redux/modules/actions/cartActions";

const SelectContainer = ({ setCheckItems, checkItems, userCartItemsList }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      userCartItemsList.forEach((item) => idArray.push(item));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const handleDeleteCheckedItem = (userId) => {
    const ids = checkItems.map((item) => item.token);

    dispatch(deleteCheckedItems(ids, userId));

    alert("상품을 삭제하시겠습니까?");
    setCheckItems([]);
  };

  return (
    <SelectWrapper>
      <Select>
        <Label>
          <CheckBox
            type="checkbox"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={
              checkItems.length === userCartItemsList.length &&
              userCartItemsList.length > 0
                ? true
                : false
            }
          />
          <AllSelect>
            전체선택({checkItems.length}/{userCartItemsList.length})
          </AllSelect>
          <Bar />
          <SelectDelete
            onClick={() => handleDeleteCheckedItem(currentUser.uid)}
          >
            선택삭제
          </SelectDelete>
        </Label>
      </Select>
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 10px 16px 2px;
  font-size: 14px;
  line-height: 26px;
  font-weight: 500;
  border-bottom: 2px solid black;
`;

const Select = styled.div`
  width: 35%;
  margin: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 26px;
  padding: 0px;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

const AllSelect = styled.span`
  font-weight: bold;
`;

const Bar = styled.span`
  display: inline-block;
  width: 1px;
  height: 14px;
  background: rgb(221, 221, 221);
  margin: 6px 21px 0px 22px;
  vertical-align: top;
`;

const SelectDelete = styled.button`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

export default SelectContainer;
