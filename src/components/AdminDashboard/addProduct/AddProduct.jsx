import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addInitiate } from "../../../redux/modules/actions/productActions";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../../../redux/modules/actions/productActions";
import ProductForm from "../../common/admin/ProductForm";

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
    try {
      await dispatch(addInitiate(data));
    } catch (err) {
      console.log(err);
    }
    navigate("/admin/products");
  };

  useEffect(() => {
    file && uploadFiles(file, setProgress, setData, data.product);
  }, [file]);

  return (
    <>
      <ProductForm
        isSubmit={isSubmit}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        progress={progress}
        category={category}
        product={product}
        price={price}
        desc={desc}
        setFile={setFile}
      />
    </>
  );
};

export default AddProduct;
