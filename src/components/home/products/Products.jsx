import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { MdPets } from "react-icons/md";
import { unsubscribe } from "../../../redux/modules/actions/productActions";
import Loading from "../../loading/Loading";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.addProduct);
  console.log(products);

  useEffect(() => {
    setLoading(false);

    return () => {
      dispatch(unsubscribe(setData));
    };
  }, []);

  return (
    <ProductContainer>
      <TitleContainer>
        <Title>
          <Icon />
          All Products
          <Icon />
        </Title>
      </TitleContainer>
      <ClothesContainer>{loading ? <Loading /> : <>{}</>}</ClothesContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
  background-color: #fff0f5;
`;

const TitleContainer = styled.div`
  min-width: 600px;
  height: 15%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const ClothesContainer = styled.div`
  width: 100%;
  height: 30%;
`;

const Title = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Icon = styled(MdPets)`
  margin: 0 10px -3px 10px;
`;

const Desc = styled.span``;

export default Products;
