import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { registerInitiate } from "../../redux/modules/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { signupSchema } from "../../components/Auth/AuthSchema/SignupSchema";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { addUsers } from "../../redux/modules/actions/userActions";
import AuthInput from "../../components/common/auth/AuthInput";

const Signup = () => {
  const { currentUser } = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    photoURL: null,
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };

  // 새로운 Form 상태관리, 제출처리, 유효성검사 라이브러리 사용해보기.
  // touched : 양식 필드가 터치되었는지 감시하는 객체. values와 initialValues를 미러링해서 저장한다.
  // handleBlur : blur 이벤트핸들러. 입력의 터치 여부를 추적해야 하는 경우에 유용하다.
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values) => {
        dispatch(
          registerInitiate(
            values.email,
            values.password,
            values.displayName,
            values.phoneNumber
          )
        );
        dispatch(addUsers(values));

        await addDoc(collection(db, "users"), { values });

        if (
          error ===
          "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
        ) {
          setErrorMessage("이미 존재하는 Email입니다.");
        }
      },
    });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <>
      <SignupContainer>
        <FormWrapper>
          <SignupForm onSubmit={handleSubmit}>
            <FormTitle to="/">REGISTER</FormTitle>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <AuthInput
              type={"text"}
              name={"displayName"}
              placeholder={"UserName"}
              value={values.displayName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.displayName && touched.displayName ? (
              <ErrorMessage>{errors.displayName}</ErrorMessage>
            ) : null}
            <AuthInput
              type={"email"}
              name={"email"}
              placeholder={"Email"}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <ErrorMessage>{errors.email}</ErrorMessage>
            ) : null}
            <AuthInput
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <ErrorMessage>{errors.password}</ErrorMessage>
            ) : null}
            <AuthInput
              type={"password"}
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            ) : null}
            <InputField>
              <Input
                type="tel"
                name="phoneNumber"
                pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
                placeholder="PhoneNumber"
                value={values.phoneNumber || ""}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </InputField>
            {errors.phoneNumber && touched.phoneNumber ? (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            ) : null}
            <SubmitBtn>
              <Icon />
              회원가입
            </SubmitBtn>
            <GoLogin>
              <GoLoginLink to="/login">
                <GoLoginIcon /> Already have account?
              </GoLoginLink>
            </GoLogin>
          </SignupForm>
        </FormWrapper>
      </SignupContainer>
    </>
  );
};

const SignupContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
`;
const FormWrapper = styled.div`
  position: absolute;
  width: 450px;
  height: 100%;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const SignupForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid #01bf71;
`;

const FormTitle = styled(Link)`
  margin-top: 1.2rem;
  font-weight: bold;
  font-size: 2.2rem;
  margin-bottom: 10px;
  color: #01bf71;
  text-decoration: none;
`;

const InputField = styled.div`
  max-width: 350px;
  width: 100%;
  height: 55px;
  background-color: #f0f0f0;
  margin: 10px 0;
  display: grid;
  border-radius: 55px;
  padding: 0 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  border-radius: 55px;
  margin-left: 10px;
  &::placeholder {
    color: #aaa;
    font-weight: 500;
  }
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
  margin: 0.5rem 0;
  cursor: pointer;
  justify-content: center;
  &:hover {
    color: #01bf71;
    background-color: white;
    border: 3px solid #01bf71;
    transition: 0.4s ease-in-out;
  }
`;

const Icon = styled(AiOutlineUserAdd)`
  margin: 2px 7px 0 0;
`;

const GoLogin = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 0.5rem;
`;
const GoLoginLink = styled(Link)`
  display: flex;
  align-item: center;
  justify-content: center;
  text-decoration: none;
  color: #007fff;
  font-weight: 700;
`;

const GoLoginIcon = styled(BiLeftArrowAlt)`
  margin-right: 5px;
  width: 22px;
  height: 22px;
`;

const ErrorMessage = styled.span`
  max-width: 350px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
`;

export default Signup;
