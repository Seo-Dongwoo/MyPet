import React from "react";
import styled from "styled-components";
import SocialIcon from "../common/SocialIcon";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <LeftDiv>
          <h3>MyPet CENTER</h3>
          <strong>
            <h2>1644-2871</h2>
            <span>월~토요일 오전 7시 - 오후 6시</span>
            <span>일요일, 공휴일 휴무</span>
          </strong>
          <ButtonDiv>
            <div>
              <button>카카오톡 문의</button>
              <span>
                월~토요일 오전 7시 - 오후 6시 <br />
                일요일, 공휴일 휴무
              </span>
            </div>
            <div>
              <button>1:1 문의</button>
              <span>
                365일 <br />
                고객센터 운영시간에 순차적으로 진행됩니다.
              </span>
            </div>
          </ButtonDiv>
        </LeftDiv>
        <RightDiv>
          <ul>
            <li>회사소개</li>
            <li>인재채용</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>이용안내</li>
          </ul>
          <div>
            법인명(상호) : 주식회사 마이펫 <span></span> 대표이사 : 서동우
            <br />
            주소 : 서울특별시 노원구 상계로 193-14
            <br />
            통신판매업 : 2023-서울노원-00123
            <br /> 입점문의 : ehdrntdnzzz@naver.com
            <br /> 채용문의 : ehdrntdn@gmail.com
          </div>
          <SocialDiv>
            <SocialIcon
              herf={"https://www.youtube.com"}
              icon={faYoutube}
              size={"3x"}
              style={{ color: "red" }}
            />
            <SocialIcon
              herf={"https://www.facebook.com"}
              icon={faFacebook}
              size={"3x"}
              style={{ color: "#4968ad" }}
            />
            <SocialIcon
              herf={"http://www.instagram.com"}
              icon={faInstagram}
              size={"3x"}
              style={{ color: "#000" }}
            />
            <SocialIcon
              herf={"https://wwww.twitter.com"}
              icon={faTwitter}
              size={"3x"}
              style={{ color: "#49a1eb" }}
            />
          </SocialDiv>
        </RightDiv>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 30px;
  border-top: 2px solid #ededed;
`;

const Wrapper = styled.div`
  width: 1050px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding-bottom: 30px;
`;

const LeftDiv = styled.div`
  strong {
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin-top: 15px;
    margin-bottom: 5px;
  }
  span {
    font-weight: normal;
    font-size: 14px;
  }
`;

const ButtonDiv = styled.div`
  div {
    margin-top: 10px;
    display: flex;
    button {
      display: block;
      width: 140px;
      height: 40px;
      border: 1px solid rgb(226, 226, 226);
      background-color: #fff;
      border-radius: 3px;
      line-height: 39px;
      text-align: center;
      margin-right: 16px;
      margin-bottom: 16px;
      cursor: pointer;
    }
    span {
      color: rgb(153, 153, 153);
      font-size: 12px;
      margin-bottom: 16px;
    }
  }
`;

const RightDiv = styled.div`
  ul {
    display: flex;
    padding-bottom: 20px;
    li {
      margin-left: 12px;
      list-style: none;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  div {
    margin-left: 12px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: rgb(153, 153, 153);
    margin-bottom: 40px;
    span {
      width: 1px;
      height: 10px;
      display: inline-block;
      background-color: rgb(153, 153, 153);
    }
  }
`;

const SocialDiv = styled.div`
  display: flex;
`;
export default Footer;
