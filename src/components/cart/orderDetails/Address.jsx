import React from "react";
import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { useDaumPostcodePopup } from "react-daum-postcode";

const Address = ({ address, setAddress, setDetailAddress }) => {
  const scriptUrl = `//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress}) ` : "";
    }

    setAddress(fullAddress);
  };

  const handleChange = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <AddressContainer>
      <TitleContainer>
        <Title>
          <TitleIcon />
          배송지
        </Title>
      </TitleContainer>
      <DescContainer>
        {address ? (
          <DetailAddress>
            <Desc>{address}</Desc>
            <DetailInput
              placeholder="상세주소를 입력해주세요"
              onChange={handleChange}
            />
          </DetailAddress>
        ) : (
          <Desc>
            배송지를 등록하고
            <br />
            구매 가능한 상품을 확인하세요!
          </Desc>
        )}
      </DescContainer>
      <AddressButton onClick={handleClick}>
        <AddressIcon />
        <AddressSpan>주소검색</AddressSpan>
      </AddressButton>
    </AddressContainer>
  );
};

const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 23px 19px 20px;
  border-width: 1px 1px 0px;
  border-top-style: solid;
  border-right-style: solid;
  border-left-style: solid;
  border-top-color: rgb(242, 242, 242);
  border-right-color: rgb(242, 242, 242);
  border-left-color: rgb(242, 242, 242);
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Title = styled.h3`
  line-height: 25px;
`;

const TitleIcon = styled(IoLocationOutline)`
  margin: 5px 5px 0 0;
`;

const DescContainer = styled.div`
  width: 100%;
  padding-top: 12px;
`;

const DetailAddress = styled.div`
  width: 100%;
  height: 70px;
`;

const DetailInput = styled.input`
  width: 100%;
  height: 35px;
  margin: 5px 0;
  padding: 0 5px;
`;

const Desc = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const AddressButton = styled.button`
  height: 36px;
  font-weight: 600;
  margin-top: 15px;
  background-color: #fff;
  border: 1px solid rgb(95, 0, 128);
  border-radius: 5px;
  cursor: pointer;
`;

const AddressSpan = styled.span`
  color: rgb(95, 0, 128);
`;

const AddressIcon = styled(AiOutlineSearch)`
  width: 12px;
  height: 12px;
  margin-right: 3px;
`;

export default Address;
