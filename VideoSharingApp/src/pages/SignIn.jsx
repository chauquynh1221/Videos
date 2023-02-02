import {axiosInstance} from ".././config"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const StyledInput = styled.input`
color: black;
margin: 5px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;
const SignIn = ({ setOpennn }) => {
 
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  const [type, setType] = useState("login")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post("/signin", { name, password });
      dispatch(loginSuccess(res.data))
      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axiosInstance
          .post("/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/signup", { name,email, password })
      window.alert("Đăng ký thành công")
      
    } catch (error) {
      window.alert("Đăng ký không thành công")
    }
  }

  return (
    <Container >
        <Close onClick={() => setOpennn(false)}>X</Close>

      {/* <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to ChauTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input id = "input"
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input id = "input" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input id = "input"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More> */}

    {type === "login" ? 
<MainContainer style={{"backgroundImage":"url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000)"}}>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
        <StyledInput type="text" placeholder="Email" />
        <StyledInput type="password" placeholder="Password" />
      </InputContainer>
      <ButtonContainer>
        <StyledButton>SIGNIN</StyledButton>
      </ButtonContainer>
      <LoginWith>OR LOGIN WITH</LoginWith>
      <HorizontalRule />
      <IconsContainer>
        <StyledIcon style={{"background" : "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)"}}>
          <FaFacebookF />
        </StyledIcon>
        <StyledIcon style={{"background" : "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)"}}>
          <FaInstagram />
        </StyledIcon>
        <StyledIcon style={{"background" : "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)"}}>
          <FaTwitter />
        </StyledIcon>
      </IconsContainer> 
      <br />
      <LoginWith>REGISTER</LoginWith>

    </MainContainer>
    : 
    <MainContainer style={{"backgroundImage":"url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000)"}}>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
        <StyledInput type="text" placeholder="Email" />
        <StyledInput type="text" placeholder="Username" />
        <StyledInput type="password" placeholder="Password" />
      </InputContainer>
      <ButtonContainer>
        <StyledButton>SIGNIN</StyledButton>
      </ButtonContainer>
      <LoginWith>OR LOGIN WITH</LoginWith>
      <HorizontalRule />
      <IconsContainer>
        <StyledIcon style={{"background" : "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)"}}>
          <FaFacebookF />
        </StyledIcon>
        <StyledIcon style={{"background" : "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)"}}>
          <FaInstagram />
        </StyledIcon>
        <StyledIcon style={{"background" : "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)"}}>
          <FaTwitter />
        </StyledIcon>
      </IconsContainer> 
      <br />
      <LoginWith>REGISTER</LoginWith>

    </MainContainer>
    }
    
    </Container>
  );
};
const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: black;
`;

const InputContainer = styled.div`
  margin : 3rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
color: black;
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 5px;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;
export default SignIn;
