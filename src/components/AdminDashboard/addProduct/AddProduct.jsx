import React, { useState } from "react";
import styled from "styled-components";
import Category from "./Category";
import { useDispatch } from "react-redux";
import { addInitiate } from "../../../redux/modules/actions/productActions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const AddProduct = () => {
  const initialState = {
    product: "",
    category: "",
    price: "",
    desc: "",
  };
  const [data, setData] = useState(initialState);
  const { product, category, price, desc } = data;
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    await dispatch(addInitiate(data));
    navigate("/admin/products");
  };

  useEffect(() => {
    const uploadFiles = () => {
      const uploadRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(uploadRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploadProgress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is Pause");
              break;
            case "running":
              console.log("Upload is Running");
              break;
            default:
              break;
          }
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            setData((prev) => ({ ...prev, img: downloadUrl }))
          );
        }
      );
    };
    file && uploadFiles();
  }, [file]);

  return (
    <>
      {isSubmit ? (
        <Loading>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </Loading>
      ) : (
        <LoginContainer>
          <FormWrapper>
            <LoginForm onSubmit={handleSubmit}>
              <FormTitle to="/">상품 추가하기</FormTitle>
              <h3>Upload {progress} %</h3>
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
                type="number"
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
            </LoginForm>
          </FormWrapper>
        </LoginContainer>
      )}
    </>
  );
};

const LoginContainer = styled.div`
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

const LoginForm = styled.form`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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

const Loading = styled.div`
  width: 80%;
  height: 100%;
  transform: translate(40%, 40%);
`;

export default AddProduct;
