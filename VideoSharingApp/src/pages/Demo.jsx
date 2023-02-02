import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import { FcGoogle} from "react-icons/fc";
import { SnackbarProvider, useSnackbar } from 'notistack';
import {axiosInstance} from ".././config"
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

// const Close = styled.div``
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
};

export default function Demo( {setOpennn }) {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirm, setConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleClickVariant = (variant)  => {
    enqueueSnackbar('Logged in successfully', { variant });
  }; 
    const handleClickVariantf = (variant) => {
      enqueueSnackbar('Login failed', { variant } );
    };
    const handleClickVariantff = (variant)  => {
      enqueueSnackbar('Sign Up Success', { variant });
    };
      const handleClickVariantfff = (variant) => {
        enqueueSnackbar('Registration failed', { variant } );
      };
     
      const handleLoginn = () =>{
        const handleClickVariantt = (variant)  => {
          enqueueSnackbar('This feature is developing please choose another login method.. :)))', { variant });
        };
        handleClickVariantt('info')
      }
  const handleLogin = async (e) => {
      e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post("/signin", { name, password });
      dispatch(loginSuccess(res.data))
      setOpennn(false)
      handleClickVariant('success')
    } catch (err) {
      dispatch(loginFailure());
      handleClickVariantf('error')
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
            setOpennn(false)
            handleClickVariant('success')
            
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      handleClickVariantf('error')

      });
  };

  const Confirm = () => {
    const a = document.getElementById('confirm')
    a.value === password ? setConfirm(true) : setConfirm(false)
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(confirm)
    if(confirm){
      try {
        await axiosInstance.post("/signup", { name,email, password })
        handleClickVariantff('success')
        setOpennn(false)
      } catch (error) {
        handleClickVariantfff('error')
      }
    }
    else{
      window.alert("Password confirmation failed")
    }
    
  }
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        {type === true ? 
<MainContainer >
      <Close onClick={() => setOpennn(false)}>X</Close>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
        <StyledInput type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
        <StyledInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </InputContainer>
      <ButtonContainer>
        <StyledButton onClick={handleLogin}>SIGNIN</StyledButton>
      </ButtonContainer>
      <LoginWith>OR LOGIN WITH</LoginWith>
      <HorizontalRule />
      <IconsContainer>
      <StyledIcon onClick={signInWithGoogle} style={{"background" : "linear-gradient(to right, white 0%, white 50%)"}}>
          <FcGoogle  />
        </StyledIcon>
        <StyledIcon onClick={handleLoginn} style={{"background" : "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)"}}>
          <FaFacebookF />
        </StyledIcon>
        <StyledIcon onClick={handleLoginn} style={{"background" : "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)"}}>
          <FaInstagram />
        </StyledIcon>
      </IconsContainer> 
      <br />
      <LoginWith onClick={() => setType(false)} style={{"cursor": "pointer"}} >REGISTER</LoginWith>
    </MainContainer>
    : 
    <MainContainer >
      <Close onClick={() => setOpennn(false)}>X</Close>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
        <StyledInput type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <StyledInput type="text" placeholder="Username" onChange={(e) => setName(e.target.value)}/>
        <StyledInput if = 'password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <StyledInput  id = "confirm" type="password" placeholder="Confirm password" onChange={Confirm}/>
      </InputContainer>
      <ButtonContainerr>
        <StyledButton onClick={handleSignup}>REGISTER</StyledButton>
      </ButtonContainerr>
      <LoginWith>OR LOGIN WITH</LoginWith>
      <HorizontalRule />
      <IconsContainer>
      <StyledIcon onClick={signInWithGoogle} style={{"background" : "linear-gradient(to right, white 0%, white 50%)"}}>
          <FcGoogle />
        </StyledIcon>
        <StyledIcon onClick={handleLoginn} style={{"background" : "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)"}}>
          <FaFacebookF />
        </StyledIcon>
        <StyledIcon onClick={handleLoginn} style={{"background" : "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)"}}>
          <FaInstagram />
        </StyledIcon>
      </IconsContainer> 
      <br />
      <LoginWith onClick={() => setType(true)} style={{"cursor": "pointer"}} >LOGIN</LoginWith>

    </MainContainer>
    }
        </Box>
      </Modal>
    </div>
  );
}

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
  height: 82vh;
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

const ButtonContainerr = styled.div`
  margin: 2.5rem 0 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const StyledInput = styled.input`
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
    color: black;
    font-weight: 100;
    font-size: 1rem;
  }
`;