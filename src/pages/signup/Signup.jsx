import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { registerInitiate } from "../../redux/modules/reducer/loginReducer";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = state;
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkPassword = (password, confirmPassword) => {
    if (password && confirmPassword && password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkPassword(password, confirmPassword)) {
      return setError("비밀번호가 일치하지 않습니다.");
    }
    dispatch(registerInitiate(email, password));
    navigate("/login");
    setState({ username: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <LoginContainer>
        <FormWrapper>
          <LoginForm onSubmit={handleSubmit}>
            <FormTitle to="/">REGISTER</FormTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <InputField>
              <Input
                type="text"
                name="username"
                placeholder="UserName"
                value={username || ""}
                required
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email || ""}
                required
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password || ""}
                required
                onChange={handleChange}
              />
            </InputField>
            <InputField>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword || ""}
                required
                onChange={handleChange}
              />
            </InputField>
            <SubmitBtn>
              <Icon />
              회원가입
            </SubmitBtn>
            <GoLogin>
              <GoLoginLink to="/login">
                <GoLoginIcon /> Already have account?
              </GoLoginLink>
            </GoLogin>
          </LoginForm>
        </FormWrapper>
      </LoginContainer>
    </>
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
