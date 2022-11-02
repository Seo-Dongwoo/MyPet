import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BiRightArrowAlt } from "react-icons/bi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate } from "../../redux/modules/actions/actions";
import { loginSchema } from "../../components/Auth/AuthSchema/LoginSchema";
import { useEffect } from "react";

const Login = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        dispatch(loginInitiate(values.email, values.password));
      },
    });

  const handleGoogleLogin = () => {};
  const handleGithubLogin = () => {};

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <LoginContainer>
      <FormWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <FormTitle to="/">LOGIN</FormTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputField>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </InputField>
          {errors.email && touched.email ? (
            <ErrorMessage>{errors.email}</ErrorMessage>
          ) : null}
          <InputField>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </InputField>
          {errors.password && touched.password ? (
            <ErrorMessage>{errors.password}</ErrorMessage>
          ) : null}
          <AutoAndFind>
            <AutoLogin>
              <CheckBox type="checkbox" />
              로그인 유지
            </AutoLogin>
            <FindField>
              <FindEmail>Email찾기</FindEmail>/
              <FindPassword>Password찾기</FindPassword>
            </FindField>
          </AutoAndFind>
          <SubmitBtn>로그인</SubmitBtn>
          <Boundary>--- SOCIAL LOGIN ---</Boundary>
          <SocialLogin>
            <SocialLoginBtn onClick={handleGoogleLogin}>
              <GoogleIcon>구글 로그인</GoogleIcon>
            </SocialLoginBtn>
            <SocialLoginBtn onClick={handleGithubLogin}>
              <GithubIcon>깃허브 로그인</GithubIcon>
            </SocialLoginBtn>
          </SocialLogin>
          <Register>
            <RegisterLink to="/signup">
              REGISTER <RegisterIcon />
            </RegisterLink>
          </Register>
        </LoginForm>
      </FormWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

const LoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid #01bf71;
`;

const FormTitle = styled(Link)`
  margin-top: 1.2rem;
  font-size: 2.2rem;
  font-weight: bold;
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
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  margin-left: 10px;
  &::placeholder {
    color: #aaa;
    font-weight: 500;
  }
`;

const AutoAndFind = styled.div`
  max-width: 320px;
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;
const AutoLogin = styled.div`
  font-size: 15px;
`;
const CheckBox = styled.input`
  margin-right: 5px;
`;
const FindField = styled.div`
  font-size: 15px;
`;
const FindEmail = styled(Link)`
  text-decoration: none;
  color: black;
`;
const FindPassword = styled(Link)`
  text-decoration: none;
  color: black;
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
  margin-top: 0.5rem;
  cursor: pointer;
  &:hover {
    color: #01bf71;
    background-color: white;
    border: 3px solid #01bf71;
    transition: 0.4s ease-in-out;
  }
`;

const SocialLogin = styled.div`
  width: 50%;
  height: 70px;
  text-align: center;
`;

const SocialLoginBtn = styled.button`
  max-width: 350px;
  width: 50px;
  height: 50px;
  border: 1px solid #333;
  margin: 0 0.5rem;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
`;

const GoogleIcon = styled(FcGoogle)`
  width: 60%;
  height: 60%;
`;
const GithubIcon = styled(AiOutlineGithub)`
  width: 60%;
  height: 60%;
`;
const Boundary = styled.p`
  font-weight: bold;
  font-size: 17px;
  color: #01bf71;
  margin: 1rem 0;
`;

const Register = styled.div`
  width: 100%;
  height: 40px;
`;
const RegisterLink = styled(Link)`
  display: flex;
  align-item: center;
  justify-content: center;
  text-decoration: none;
  color: #007fff;
  font-weight: 700;
`;

const RegisterIcon = styled(BiRightArrowAlt)`
  margin-left: 5px;
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

export default Login;
