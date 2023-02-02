
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector} from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import {axiosInstance} from ".././config"
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";
import { SnackbarProvider, useSnackbar } from 'notistack';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

// const Recommendation = styled.div`
//   flex: 2;
// `;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  cursor: pointer;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;




const Video = () => {
 
  const {currentUser} = useSelector (state => state.user)
  const {currentVideo} = useSelector (state => state.video)
  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariantf = (variant) => {
    enqueueSnackbar('You need to log in to continue..', { variant } );
  };
    const handleClick = () =>{
      handleClickVariantf('error')
    }
  const [channel, setChannel] = useState({});

  useEffect( () => {
      const fetchData = async () => {
          try {
            const videoRs = await axiosInstance.get(`/video/find/${path}`)
            const channelRs = await axiosInstance.get(`/find/${videoRs.data.userId}`)
            setChannel(channelRs.data)

            dispatch(fetchSuccess(videoRs.data))
          } catch (err) {
            
          }
      }
      fetchData();
  },[path, dispatch])

  const handleLikes = async () =>{
      await axiosInstance.put(`/like/${currentVideo._id}`)
      dispatch(like(currentUser._id));
  }
  const handleDislikes = async () =>{
    
      await axiosInstance.put(`/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser._id));
  }
  
  
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axiosInstance.put(`/unsub/${channel._id}`)
      : await axiosInstance.put(`/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  const navigatee = () => {
   
    navigate(`/myChannel/${channel._id}`);
  }
  
  return (
    <Container>
      <Content>
        <VideoWrapper >
        <VideoFrame id = "a" controls autoPlay 
        src={currentVideo?.videoUrl}
        width="900" height="500"  
          title="YouTube video player" 
          frameborder="0" allow="accelerometer; 
          clipboard-write; 
          encrypted-media; 
          gyroscope; 
          picture-in-picture"
          allowfullscreen
         >
          </VideoFrame>
         
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)} </Info>
          { currentUser 
            ? <Buttons>
            <Button onClick={handleLikes}>
              {currentVideo?.likes?.includes(currentUser._id)
               ?( <ThumbUpIcon/> )
               : (<ThumbUpOutlinedIcon /> )}{" "} {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislikes}>
              {currentVideo?.dislikes?.includes(currentUser._id)
              ? (<ThumbDownIcon/>) 
              : <ThumbDownOffAltOutlinedIcon />}{" "} {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons> 
          : 
          <Buttons>
            <Button onClick={handleClick}>
             
               <ThumbUpIcon/> {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleClick}>
            <ThumbDownIcon/>{currentVideo?.dislikes?.length}
            </Button>
            <Button onClick={handleClick}>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button onClick={handleClick}>
              <AddTaskOutlinedIcon onClick={handleClick}/> Save
            </Button>
          </Buttons> 
          }
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName onClick={navigatee}>{channel.name}</ChannelName>
             <ChannelCounter>{channel.subscribe} subscribers</ChannelCounter>
              <Description>
                    {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          { currentUser ? <Subscribe onClick={handleSub}>
          {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe> 
          :<Subscribe onClick={handleClick}>SUBSCRIBE</Subscribe> }
        </Channel>
        <Hr />
        <Comments handleClick = {handleClick} videoId = {currentVideo?._id}/>
      </Content>
            <Recommendation  tags = {currentVideo?.tags} />
    </Container>
  );
};

export default Video;
