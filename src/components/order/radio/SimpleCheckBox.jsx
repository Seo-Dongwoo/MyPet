import React from "react";
import styled from "styled-components";
import RadioGroup from "./RadioGroup";
import Radio from "./Radio";

const SimpleCheckBox = ({ setPayment }) => {
  const radioData = [
    { idx: 1, value: "NaverPay", children: "네이버페이", name: "contact" },
    { idx: 2, value: "Toss", children: "토스", name: "contact" },
    { idx: 3, value: "Payco", children: "Payco", name: "contact" },
    { idx: 4, value: "T-money", children: "T머니", name: "contact" },
  ];

  return (
    <CheckBoxContainer>
      <RadioGroup>
        {radioData.map((item, idx) => (
          <RadioDiv key={idx}>
            <Radio value={item.value} setPayment={setPayment} name={item.name}>
              {item.children}
            </Radio>
          </RadioDiv>
        ))}
      </RadioGroup>
    </CheckBoxContainer>
  );
};

const CheckBoxContainer = styled.form`
  width: 100%;
  height: 100px;
`;

const RadioDiv = styled.div`
  display: flex;
  padding: 20px 0 0 0;
`;

export default SimpleCheckBox;
