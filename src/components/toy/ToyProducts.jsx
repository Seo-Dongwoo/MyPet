import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sort from "../common/Sort";
import Pagination from "../common/Pagination";
import CategoryCard from "../common/product/CategoryCard";
import { unsubscribeProduct } from "../../redux/modules/actions/productActions";

const ToyProducts = () => {
  const [priceFilter, setPriceFilter] = useState("default");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(8);

  const handleChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // 상품의 항목이 toy 인것만 뽑아낸 메소드
  const toyProducts = data.filter((product) =>
    product.category === "toy" ? product : null
  );

  // 가격순에 따른 정렬
  const sortPrice = () => {
    priceFilter === "sortByLowPrice"
      ? toyProducts.sort((a, b) => a.price - b.price)
      : priceFilter === "sortByHighPrice"
      ? toyProducts.sort((a, b) => b.price - a.price)
      : toyProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
  };
  sortPrice();

  // Pagination
  const indexOfLastProduct = currentPage * endPage;
  const indexOfFirstProduct = indexOfLastProduct - endPage;
  const PaginationProduct = toyProducts.slice(
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
        <Title>마이펫 장난감</Title>
      </TitleContainer>
      <CategoryContainer>
        <ProductsNums>총 {PaginationProduct.length}건</ProductsNums>
        <Sort handleChange={handleChange} />
      </CategoryContainer>
      <CategoryCard category={"toy"} data={PaginationProduct} />
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

export default ToyProducts;
