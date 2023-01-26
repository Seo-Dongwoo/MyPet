# MyPet E-Commerce
## 📄 프로젝트 목적 및 설명
* ### 목적
  * 전자상거래의 흐름을 이해하고 학습하기 위함
  * Redux 상태관리 라이브러리의 이해 및 학습
  * Firebase를 이용해서 Authentication를 이해 및 학습
  * Firestore를 이용해서 데이터의 관리 및 CRUD를 이해 및 학습
  * 코드 분할하여 최적화 
* ### 설명
  * #### 관리자 페이지
    * 관리자 로그인시 관리자 페이지 접근 가능 ( .env에 관리자 uid 저장)
    * 관리자 페이지 메인에 유저 수, 등록 상품의 수, 주문 수, 총 결제금액, 카테고리 별 주문 비율차트등 간단한 현황 구현
    * 관리자 페이지에서 상품 카테고리별로 CRUD
    * 등록한 상품 리스트 구현
    * 회원가입한 유저 리스트 구현
    * 주문완료된 상품 리스트 구현
  * #### Authentication 페이지 (로그인/회원가입)
    * useFormik 라이브러리 이용해 Form 상태 관리
    * 구글, 깃허브 OAuth Login 구현
    * 일반적인 로그인시 메인페이지로 접근하고 비로그인시 장바구니 클릭하면 useLocation을 이용하여 로그인창으로 접근하고 로그인되면 장바구니로 접근되도록 구현
    * Redux를 이용한 유저의 상태관리
    * Yup 라이브러리를 이용한 유효성 검사
  * #### 메인 페이지
    * 반응형인 Header 구현 및 일반 로그인과 관리자 로그인시의 다른 Layout
    * React Hooks을 이용해 자동 이벤트 슬라이더 구현
    * 관리자 페이지에서 추가한 상품 카테고리별로 4개씩 Fetch 구현
    * 로그인 상태에 따른 다른 상품 카드의 장바구니 Modal 구현
    * 상품 카드 클릭 시 개별 상품의 페이지로 접근 (경로를 firestore에 저장된 상품 uid 이용)
    * 개별 상품 페이지에서 로그인 상태에 따른 장바구니 담기 기능 구현
  * #### 장바구니 페이지
    * 로그인 상태에서 수량을 선택하여 장바구니 담기를 하면 장바구니 리스트에 추가
    * redux를 이용해 선택삭제, 개별삭제, 전체삭제 기능 구현
    * Daum-postcode-api를 이용해 주소 검색 후 배송지 및 상세주소 추가 구현
    * 결제금액에 따른 배송비 추가 유무 및 redux를 이용해 상태관리
    * 로그인한 유저가 다를 경우 각 유저에 따른 장바구니 구현
    * Toggle 기능을 이용하여 장바구니에 담은 상품 숨기기 기능 구현
  * #### 결제 페이지
    * 장바구니 페이지에서 추가한 상품 정보와 배송지가 결제 페이지에서 redux를 이용해 상태관리 
    * useParams를 이용해 추가한 상품의 orderPathId와 params를 비교해서 경로와 상품의 data로 Layout 구현
    * Date 객체와 Math메소드를 이용해서 주문 번호 생성
    * 결제 api는 사용하지 않았으나 redux를 이용해 카카오 결제, 휴대폰 결제, 신용카드 결제, 간편 결제등 결제 수단 상태관리
  * #### 결제왼료 페이지
    * useParams를 이용해 결제한 상품의 주문번호와 params를 비교해서 경로와 Layout 구현
    * 주문한 사람과 주문 번호와 배송지 상세주소등 구현
---
## 🎞 프로젝트 영상 
#### gif로 변환하였으나 github readme 동영상 용량의 문제로 유튜브에 게시하였습니다.
https://youtu.be/pRsDDPvHD-Q

--- 
## 🛠 개발 기간 및 사용 기술
- **개발 기간** : 2022.10.27 ~ 2023.01.16 (약 10주)
* **사용 기술** 

  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <br />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black">
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
  <img src="https://img.shields.io/badge/firestore-FF7139?style=for-the-badge&logo=firebase&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/fontawesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"/>
    <img src="https://img.shields.io/badge/rechart-FF6384?style=for-the-badge&logo=chartjs&logoColor=white"/>
 ---
 ## 🔌 프로젝트 실행
 ```
   npm start
 ```
 #### 게스트 로그인
 Email : guest@guest.com
 <br />
 Password : !guest123
 
 #### 관리자 로그인
 비공개
 
---
 ## 🤩 새로 배우거나 집중적으로 공부한 것
 - Yup 라이브러리를 이용하여 유효성 검사 학습 및 적용
 - useFormik을 이용해서 Authentication Form의 상태관리
 - Firebase와 Redux를 이용해서 로그인, 로그아웃 및 회원가입 상태관리
 - useParams, useLocation hooks를 이용해 경로 접근에 대해 학습 및 적용
 - Firestore와 연동하여 관리자 페이지에서 상품 CRUD 구현 및 리스트에 상품 데이터 Fetch
 - 중복된 코드 리팩토링 및 컴포넌트 재사용
 - 장바구니 기능 
    - Redux를 이용해 상품의 종류, 상품의 수량, 주문자의 주소, 배송비 추가 유무, 상품 선택 유무등 상태관리
    - 사용자의 쾌적하고 편안한 UI / UX 경험을 위해 많은 고민을 하고 적용시켰다.
 - lazy를 이용해서 route
 ---
 ## 🔧 이슈 및 해결
 #### ❗ 기능마다 branch를 따서 구현하였고 구현하면서 생긴 Issue는 Issue카테고리에 잘 정리했으며 Issue의 Solution은 PR에 올렸으니 참고해주세요.
--- 
## 💻 배포
https://mypet-ecommerce.netlify.app

