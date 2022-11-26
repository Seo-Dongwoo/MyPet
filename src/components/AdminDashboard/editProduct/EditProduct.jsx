import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "../addProduct/Category";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateInitiate } from "../../../redux/modules/actions/productActions";
import { uploadFiles } from "../../../redux/modules/actions/productActions";
import Loading from "../../loading/Loading";

const EditProduct = () => {
  const [data, setData] = useState([]);
  const { product, category, price, desc } = data;
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productId) {
      try {
        await dispatch(updateInitiate(productId, data));

        setIsSubmit(true);
      } catch (err) {
        console.log(err);
      }
    }
    navigate("/admin/products");
  };

  useEffect(() => {
    file && uploadFiles(file, setProgress, setData, data.product);
  }, [file]);

  return (
    <>
      {isSubmit ? (
        <Loading />
      ) : (
        <EditContainer>
          <FormWrapper>
            <EditForm onSubmit={handleSubmit}>
              <FormTitle to="/">상품 변경하기</FormTitle>
              <Upload>Upload {progress} %</Upload>
              <Category
                name="category"
                values={category || ""}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="product"
                placeholder="상품 이름을 입력하세요."
                value={product || ""}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="price"
                placeholder="상품 가격을 입력하세요."
                value={price || ""}
                onChange={handleChange}
              />
              <DescInput
                type="text"
                name="desc"
                placeholder="상품 정보를 입력하세요."
                value={desc || ""}
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
                변경하기
              </SubmitBtn>
            </EditForm>
          </FormWrapper>
        </EditContainer>
      )}
    </>
  );
};

const EditContainer = styled.div`
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

const EditForm = styled.form`
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

export default EditProduct;
