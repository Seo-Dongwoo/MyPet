import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Sort from "../common/Sort";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";

const FoodProducts = () => {
  const [priceFilter, setPriceFilter] = useState("default");
  const { products } = useSelector((state) => state.addProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(8);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // 상품의 항목이 food 인것만 뽑아낸 메소드
  const foodProducts = products.filter((product) =>
    product.category === "food" ? product : null
  );

  // value값에 따른 정렬
  const sortByPrice =
    priceFilter === "sortByLowPrice"
      ? foodProducts.sort((a, b) => a.price - b.price)
      : priceFilter === "sortByHighPrice"
      ? foodProducts.sort((a, b) => b.price - a.price)
      : foodProducts.sort((a, b) => (a.price > b.price ? 1 : -1));

  // Pagination
  const indexOfLastProduct = currentPage * endPage;
  const indexOfFirstProduct = indexOfLastProduct - endPage;
  const currentProduct = foodProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <TitleContainer>
        <Title>마이펫 사료</Title>
      </TitleContainer>
      <CategoryContainer>
        <ProductsNums>총 {foodProducts.length}건</ProductsNums>
        <Sort handleChange={handleChange} priceselect={sortByPrice} />
      </CategoryContainer>
      <ProductCards>
        {foodProducts.length > 0 ? (
          currentProduct.map((product, index) => (
            <CardContainer
              key={index}
              onClick={() => {
                navigate(`/food/${product.id}`);
              }}
            >
              <ImageContainer>
                <Image src={product.img} alt="" />
              </ImageContainer>
              <ProductContainer>
                <NameContainer>
                  <Name>{product.product}</Name>
                </NameContainer>
                <Price>{product.price}원</Price>
              </ProductContainer>
            </CardContainer>
          ))
        ) : (
          <h1>상품이 존재하지 않습니다.</h1>
        )}
      </ProductCards>
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        endPage={endPage}
        totalProducts={foodProducts.length}
      />
    </>
  );
};
const TitleContainer = styled.div`
  width: 65%;
  text-align: center;
  justify-content: center;
  margin: 5% auto 0;
  border-bottom: 1px solid #757575;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  @media screen and (max-width: 875px) {
    font-size: 2rem;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const CategoryContainer = styled.div`
  width: 65%;
  height: 50px;
  justify-content: center;
  margin: 0 auto 20px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
`;

const ProductsNums = styled.span`
  font-weight: bold;
  line-height: 50px;
`;

const ProductCards = styled.div`
  width: 70%;
  align-items: center;
  margin: 0 auto 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 875px) {
    text-align: center;
    width: 100%;
  }
`;

const CardContainer = styled.div`
  width: 250px;
  height: 280px;
  overflow: hidden;
  box-shadow: 0px 0px 15px -5px;
  margin: 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  margin: 0 auto;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 200px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const NameContainer = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
`;

const Name = styled.span``;
const Price = styled.span``;

export default FoodProducts;
