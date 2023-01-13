import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { BiMessageRoundedError } from "react-icons/bi";
import { addCartInitiate } from "../../redux/modules/actions/cartActions";
import ModalPortal from "../common/ModalProtal";
import CartModal from "../common/cart/CartModal";
import { v4 } from "uuid";
import { unsubscribeProduct } from "../../redux/modules/actions/productActions";

const ProductSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { productId } = useParams();
  const [modalOpen, setModalOpen] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuantity(e.target.value);
    if (e.target.value < 1) {
      alert("해당 상품은 최소구매 수량이 1개 입니다");
      return setQuantity(1);
    }
  };

  const handleSubmit = (product, userId) => {
    const token = currentUser.uid + v4();

    dispatch(
      addCartInitiate({ ...product, quantity, userId, token }, token, userId)
    );
  };

  const HandleModalCheck = () => {
    setModalOpen(true);
  };

  const HandleModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    unsubscribeProduct(setData);
  }, []);

  return (
    <>
      {data &&
        data.map((product) =>
          product.id === productId ? (
            <Container key={product.id}>
              <ImageContainer>
                <Image src={product.img} alt="" />
              </ImageContainer>
              <DescContainer>
                <TitleContainer>
                  <Title>{product.product}</Title>
                </TitleContainer>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr></Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <TitleTd>판매가</TitleTd>
                        <Td>{product.price}원</Td>
                      </Tr>
                      <Tr>
                        <TitleTd>배송방법</TitleTd>
                        <Td>택배</Td>
                      </Tr>
                      <Tr>
                        <TitleTd>배송비</TitleTd>
                        <Td>
                          총 결제금액이 20,000원 미만시 배송비 3,000원이
                          청구됩니다.
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <PurchaseContainer>
                  <QuantityConatainer>
                    <Quantity
                      type="text"
                      value={quantity}
                      onChange={handleChange}
                    />
                    <IncreaseBtn
                      onClick={() => setQuantity(quantity + 1)}
                      type="button"
                    >
                      +
                    </IncreaseBtn>
                    <DecreaseBtn
                      onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                      type="button"
                    >
                      -
                    </DecreaseBtn>
                    <TotalQuantity>{quantity}개</TotalQuantity>
                  </QuantityConatainer>
                  <TotalPriceContainer>
                    <TotalPriceDesc>총 상품 금액</TotalPriceDesc>
                    <TotalPrice>{product.price * quantity}원</TotalPrice>
                  </TotalPriceContainer>
                  <LinkContainer>
                    <LikeLink to="/login">
                      <LikeBtn>
                        <LikeIcon />
                      </LikeBtn>
                    </LikeLink>
                    <QuestionLink>
                      <QuestionBtn>
                        <QuestionIcon />
                      </QuestionBtn>
                    </QuestionLink>
                    {currentUser ? (
                      <PurchaseLink to="/cart">
                        <PurchaseBtn
                          onClick={() => handleSubmit(product, currentUser.uid)}
                        >
                          장바구니 담기
                        </PurchaseBtn>
                      </PurchaseLink>
                    ) : (
                      <PurchaseLink>
                        <PurchaseBtn
                          onClick={() => {
                            HandleModalCheck();
                          }}
                        >
                          장바구니 담기
                        </PurchaseBtn>
                      </PurchaseLink>
                    )}
                  </LinkContainer>
                </PurchaseContainer>
              </DescContainer>
            </Container>
          ) : null
        )}
      {modalOpen && (
        <ModalPortal>
          <CartModal
            modalOpen={modalOpen}
            onClose={HandleModal}
            setModalOpen={setModalOpen}
          />
        </ModalPortal>
      )}
    </>
  );
};

const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 60px auto;
  @media (max-width: 1020px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  width: 500px;
  height: 400px;
  border: 2px solid #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
  @media (max-width: 1020px) {
    margin: 0;
  }
  @media (max-width: 520px) {
    width: 400px;
    height: 350px;
  }
`;

const Image = styled.img`
  width: 80%;
  height: 80%;
  min-width: 400px;
  @media (max-width: 520px) {
    width: 350px;
    height: 300px;
    min-width: 250px;
  }
`;

const DescContainer = styled.div`
  width: 480px;
  height: 400px;
  display: flex;
  flex-direction: column;
  @media (max-width: 520px) {
    width: 400px;
    height: 400px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
  @media (max-width: 520px) {
    margin-bottom: 10px;
  }
`;

const Title = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 70px;
  @media (max-width: 520px) {
    font-size: 1rem;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 2px solid #ededed;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  width: 100%;
  height: 20px;
`;

const TitleTd = styled.td`
  width: 70px;
  font-weight: 600;
`;

const Td = styled.td`
  @media (max-width: 520px) {
    font-size: 11px;
  }
`;

const PurchaseContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const QuantityConatainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30%;
  border-bottom: 2px solid #ededed;
`;

const Quantity = styled.input`
  width: 50px;
  height: 30px;
  text-align: center;
  margin-left: 20px;
  font-weight: 600;
`;

const IncreaseBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  background-color: #fff;
  border: 1px solid black;
  cursor: pointer;
`;
const DecreaseBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  background-color: #fff;
  border: 1px solid black;
  cursor: pointer;
  margin-right: 275px;
  @media (max-width: 520px) {
    margin-right: 215px;
    font-size: 0.9rem;
  }
`;

const TotalQuantity = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30%;
  border-bottom: 2px solid #ededed;
`;

const TotalPriceDesc = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 280px;
  @media (max-width: 520px) {
    margin-right: 220px;
    font-size: 0.9rem;
  }
`;

const TotalPrice = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40%;
`;

const LikeLink = styled(Link)`
  width: 55px;
  height: 55px;
  margin-right: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LikeBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #01bf71;
  border: 2px solid rgb(221, 223, 225);
  cursor: pointer;
`;

const LikeIcon = styled(FiHeart)`
  width: 30px;
  height: 30px;
`;

const QuestionLink = styled(Link)`
  width: 55px;
  height: 55px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: rgb(221, 223, 225);
  border: 2px solid rgb(221, 223, 225);
  cursor: pointer;
`;

const QuestionIcon = styled(BiMessageRoundedError)`
  width: 30px;
  height: 30px;
`;

const PurchaseLink = styled(Link)`
  width: 75%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const PurchaseBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: #01bf71;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
`;

export default ProductSection;
