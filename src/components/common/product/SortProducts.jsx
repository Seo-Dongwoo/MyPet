import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsCart2 } from "react-icons/bs";
import ModalPortal from "../ModalProtal";
import CartModal from "../cart/CartModal";
import ProductCard from "./ProductCard";
import { unsubscribeCategory } from "../../../redux/modules/actions/productActions";
import Loading from "../Loading";

const SortProducts = ({ title, category, link }) => {
  const [modalOpen, setModalOpen] = useState();
  const [itemId, setItemId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleModalCheck = (id) => {
    setModalOpen(true);
    setItemId(id);
  };

  const HandleModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setLoading(false);

    unsubscribeCategory(setData, category);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleContainer>
            <h1>{title}</h1>
            <MoreLink to={link}>더보기</MoreLink>
          </TitleContainer>
          <ProductCard
            data={data}
            Icon={BsCart2}
            handleModalCheck={handleModalCheck}
            category={category}
          />
        </>
      )}
      {modalOpen && (
        <ModalPortal>
          <CartModal
            itemId={itemId}
            onClose={HandleModal}
            setModalOpen={setModalOpen}
          />
        </ModalPortal>
      )}
    </>
  );
};

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid rgb(211, 211, 211);
  margin-bottom: 30px;
`;

const MoreLink = styled(Link)`
  position: absolute;
  display: inline-block;
  text-align: center;
  line-height: 27px;
  font-size: 14px;
  color: #a7a7a7;
  font-weight: 700;
  right: 0;
  bottom: 20px;
  text-decoration: none;
`;

export default SortProducts;
