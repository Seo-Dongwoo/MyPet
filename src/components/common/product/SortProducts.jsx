import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsCart2 } from "react-icons/bs";
import ModalPortal from "../ModalProtal";
import CartModal from "../cart/CartModal";
import ProductCard from "./ProductCard";
import { unsubscribeProduct } from "../../../redux/modules/actions/productActions";
import Loading from "../Loading";

const SortProducts = ({ title, category }) => {
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

    unsubscribeProduct(setData);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleContainer>
            <h1>{title}</h1>
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
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  h1 {
  }
`;

export default SortProducts;
