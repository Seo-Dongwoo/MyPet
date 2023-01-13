import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdPets } from "react-icons/md";
import Loading from "../../common/Loading";
import SortProducts from "../../common/product/SortProducts";

const Products = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <ProductContainer>
      <TitleContainer>
        <Title>
          <Icon />
          마이펫 상품
          <Icon />
        </Title>
      </TitleContainer>
      <ItemContainer>
        {loading ? (
          <Loading />
        ) : (
          <>
            <SortProducts title={"마이펫 먹이"} category={"food"} />
            <SortProducts title={"마이펫 의류"} category={"clothes"} />
            <SortProducts title={"마이펫 장난감"} category={"toy"} />
          </>
        )}
      </ItemContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const TitleContainer = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: center;
`;

const ItemContainer = styled.div`
  width: 100%;
`;

const Title = styled.span`
  color: #01bf71;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
  }
`;

const Icon = styled(MdPets)`
  margin: 0 10px -3px 10px;
`;

export default Products;
