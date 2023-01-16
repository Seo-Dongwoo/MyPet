import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sort from "../common/Sort";
import Pagination from "../common/Pagination";
import CategoryCard from "../common/product/CategoryCard";
import { unsubscribeProduct } from "../../redux/modules/actions/productActions";
const FoodProducts = () => {
  const [priceFilter, setPriceFilter] = useState("default");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(8);

  const handleChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // 상품의 항목이 food 인것만 뽑아낸 메소드
  const FoodProducts = data.filter((product) =>
    product.category === "food" ? product : null
  );

  // 가격순에 따른 정렬
  const sortPrice = () => {
    priceFilter === "sortByLowPrice"
      ? FoodProducts.sort((a, b) => a.price - b.price)
      : priceFilter === "sortByHighPrice"
      ? FoodProducts.sort((a, b) => b.price - a.price)
      : FoodProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
  };
  sortPrice();

  // Pagination
  const indexOfLastProduct = currentPage * endPage;
  const indexOfFirstProduct = indexOfLastProduct - endPage;
  const PaginationProduct = FoodProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    unsubscribeProduct(setData);
  }, []);
  return (
    <>
      <TitleContainer>
        <Title>사료 / 간식</Title>
      </TitleContainer>
      <CategoryContainer>
        <ProductsNums>총 {PaginationProduct.length}건</ProductsNums>
        <Sort handleChange={handleChange} />
      </CategoryContainer>
      <CategoryCard category={"food"} data={PaginationProduct} />
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        endPage={endPage}
        totalProducts={PaginationProduct.length}
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

export default FoodProducts;
