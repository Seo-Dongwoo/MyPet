import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DeleteCartModal = ({ onClose, deleteHandler, isToken }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ModalContainer>
      <Background>
        <ModalDiv>
          <Container>
            <MessageContainer>
              <Message>삭제하시겠습니까?</Message>
            </MessageContainer>
            <ButtonContaier>
              <CartButton
                onClick={() => deleteHandler(isToken, currentUser.uid)}
              >
                확인
              </CartButton>
              <CancelButton onClick={() => onClose()}>닫기</CancelButton>
            </ButtonContaier>
          </Container>
        </ModalDiv>
      </Background>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalDiv = styled.div`
  position: absolute;
  width: 320px;
  height: 160px;
  top: 50%;
  left: 50%;
  border-radius: 15px;
  transform: translate(-50%, -50%);
  background-color: #fff;
`;

const Container = styled.div``;

const MessageContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const ButtonContaier = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 15px;
  overflow: hidden;
`;

const CartButton = styled.button`
  width: 50%;
  height: 100%;
  font-weight: 600;
  background-color: #fff;
  border: 1px solid rgb(221, 223, 225);
`;

const CancelButton = styled.button`
  width: 50%;
  height: 100%;
  background-color: #fff;
  font-weight: 600;
  border: 1px solid rgb(221, 223, 225);
`;

export default DeleteCartModal;
