import React from "react";
import styled from "styled-components";
import ChauTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from 'notistack';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariantf = (variant) => {
    enqueueSnackbar('You need to log in to continue..', { variant } );
  };
    const handleClick = () =>{
      handleClickVariantf('error')
    }
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={ChauTube} />
            ChauTube
          </Logo>
        
        <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        {currentUser?
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        :
        <div onClick={handleClick}
          
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </div>
        }
        <Hr />
        { currentUser ?
        <div>
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        </div>
        :
         <div>
          <Item onClick={handleClick}>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item onClick={handleClick}>
          <HistoryOutlinedIcon />
          History
        </Item>
        </div>
        
        }
        <Hr />
        <Title>BEST OF CHAUTUBE</Title>
        <Link to="Hot" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
          <LibraryMusicOutlinedIcon />
          Music
          </Item>
        </Link>
        <Link to="Sports" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        </Link>
        <Link to="Movies" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        </Link>
        <Link to="News" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        </Link>
        
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
       
        
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
      
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;