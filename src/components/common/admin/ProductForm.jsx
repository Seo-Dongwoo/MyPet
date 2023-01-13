import React from "react";
import styled from "styled-components";
import Category from "./Category";
import Loading from "../Loading";

const ProductForm = ({
  isSubmit,
  handleSubmit,
  handleChange,
  progress,
  category,
  product,
  price,
  desc,
  setFile,
}) => {
  return (
    <>
      {isSubmit ? (
        <Loading />
      ) : (
        <Container>
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              <FormTitle to="/">상품 추가하기</FormTitle>
              <Upload>Upload {progress} %</Upload>
              <Category
                name="category"
                values={category}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="product"
                placeholder="상품 이름을 입력하세요."
                value={product}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="price"
                placeholder="상품 가격을 입력하세요."
                value={price}
                onChange={handleChange}
              />
              <DescInput
                type="text"
                name="desc"
                placeholder="상품 정보를 입력하세요."
                value={desc}
                onChange={handleChange}
              />
              <ImageInput
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <SubmitBtn
                type="submit"
                disabled={progress !== null && progress < 100}
              >
                추가하기
              </SubmitBtn>
            </Form>
          </FormWrapper>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 100%
  overflow: hidden;
`;
const FormWrapper = styled.div`
  position: absolute;
  width: 600px;
  min-height: 800px;
  top: 8%;
  left: 40%;
  transform: translate(-50%, 0);
`;

const Form = styled.form`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 3px solid #01bf71;
`;

const FormTitle = styled.h1`
  margin-top: 1.2rem;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #01bf71;
  text-decoration: none;
`;

const Upload = styled.h3``;

const Input = styled.input`
  max-width: 350px;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: grid;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  padding-left: 10px;
  &::placeholder {
    color: #aaa;
    font-weight: 500;
  }
`;

const DescInput = styled.input`
  max-width: 350px;
  width: 100%;
  margin: 10px 0;
  display: grid;
  height: 170px;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  padding-left: 10px;
  &::placeholder {
    color: #aaa;
    font-weight: 500;
  }
`;

const ImageInput = styled.input`
  font-weight: 600;
  font-size: 1rem;
  margin: 10px 0;
`;

const SubmitBtn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 30px;
  background-color: #01bf71;
  color: white;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 20px 0;
  cursor: pointer;
  &:hover {
    color: #01bf71;
    background-color: white;
    border: 3px solid #01bf71;
    transition: 0.4s ease-in-out;
  }
`;

export default ProductForm;
