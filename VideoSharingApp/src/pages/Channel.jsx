import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import {axiosInstance} from ".././config"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from "../components/Card";
import { subscription } from "../redux/userSlice";
import { useLocation } from "react-router-dom";
import List from "./List"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SnackbarProvider, useSnackbar } from 'notistack';


const Container = styled.div`
color: ${({ theme }) => theme.text};
margin : 20px
`
const ChannelCover = styled.div`
background-position: center center;
background-size: cover;
background-color: #ccc;
height: 270px;
marginRight : "20px",
color: ${({ theme }) => theme.textSoft};
`
const ChannelInfor = styled.div`
background-color: var(--background-color);
margin : 10px 10px 10px 50px;
color: ${({ theme }) => theme.text};
`
const ChannelInfor1 = styled.div`
display: flex;
align-items : center;
justify-content: space-between;
margin-right: 40px;
maxWidth: 1284px;
padding: 0 16px;
`
const ChannelInfor2 = styled.div`
display: flex;
justifyContent: space-between;
padding: 16px 0 12px;
color: ${({ theme }) => theme.text};
`
const ChannelInfor3 = styled.div`
margin: auto 0 auto 16px;
color: ${({ theme }) => theme.textSoft};
`
const ChannelName = styled.div`
font-size: 20px;
font-weight: 500;
display: flex;
color: var(--heading-text-color);
color: ${({ theme }) => theme.text};
`
const ChannelSub = styled.div`

display: flex;
align-items: center;
font-size: 20px;
color: var(--text-color);
`
 const If = styled.div`
color: ${({ theme }) => theme.text};

 `


 const style = {
  color : '#1976d2'
};
const Sub = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`
const Video = styled.div`
display: flex;
flex-wrap: wrap;
`

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
<div role="tabpanel" hidden={value !==index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}
  {...other}>
  {value === index && (
  <Box sx={{ p: 3 }}>
    <Typography>{children}</Typography>
  </Box>
  )}
</div>
);
}

TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};

function a11yProps(index) {
return {
id: `simple-tab-${index}`,
'aria-controls': `simple-tabpanel-${index}`,
};
}

export default function Channel(props) {
const {currentUser} = useSelector (state => state.user)
const [videos, setVideos] = useState([])
const [value, setValue] = React.useState(0);
const dispatch = useDispatch()
const [channel, setChannel] = useState({});
const handleChange = (event, newValue) => {
setValue(newValue);
};
const path = useLocation().pathname.split("/")[2];
const { enqueueSnackbar } = useSnackbar();
  const handleClickVariantf = (variant) => {
    enqueueSnackbar('You need to log in to continue..', { variant } );
  };
    const handleClick = () =>{
      handleClickVariantf('error')
    }
useEffect( () => {
const fetchUser = async () => {
try {
const channelRs = await axiosInstance.get(`/find/${path}`)
setChannel(channelRs.data)
} catch (err) {

}
}
fetchUser();

const fetchVideos = async () => {
const res = await axiosInstance.get(`/video/${channel._id}`);
setVideos(res.data);
};
fetchVideos();

},[path ,channel._id])

const handleSub = async () => {
currentUser.subscribedUsers.includes(channel._id)
? await axiosInstance.put(`/unsub/${channel._id}`)
: await axiosInstance.put(`/sub/${channel._id}`);
dispatch(subscription(channel._id));
};


const vv = videos.reduce((views, video ) => {
    return views + video.views
},0)

const tags = videos.reduce((tags , videoTags) => {
    return Array.from(new Set([...tags, ...videoTags.tags]))
},[])


return (
<Container>
  <ChannelCover style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/chautube-68b0e.appspot.com/o/%C3%A2sasasasasasasasasas.jpg?alt=media&token=49fee1a0-8bb5-4efa-af12-198cfcd29b3c")`, 
        }}>
  </ChannelCover>
  <ChannelInfor>
    <ChannelInfor1>
      <ChannelInfor2>
        <Avatar src={channel.img} size={80}>
        </Avatar>
        <ChannelInfor3>
          <ChannelName> {channel.name} &nbsp; <CheckCircleIcon/></ChannelName>
          <ChannelSub> {channel.subscribe} subscribers</ChannelSub>
        </ChannelInfor3>
      </ChannelInfor2>
      <ChannelSub> <RemoveRedEyeIcon/> &nbsp;  {vv} views</ChannelSub>
      { currentUser && currentUser.name !== channel.name ? <Sub onClick={handleSub}>
        {currentUser.subscribedUsers?.includes(channel._id)
        ? "SUBSCRIBED"
        : "SUBSCRIBE"}
      </Sub> : "" }
    </ChannelInfor1>
    <Box sx={{ width: '100%' }} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
         value={value} onChange={handleChange} aria-label="basic tabs example">
      
          <Tab sx={style}
           label="HOME" {...a11yProps(0)} />
           
          <Tab sx={style}
          label="VIDEOS" {...a11yProps(1)} />
          <Tab  sx={style} 
          label="PLAYLISTS" {...a11yProps(2)} />
          <Tab  sx={style}
          label="CHANNELS SUBSCRIBED" {...a11yProps(3)} />
          <Tab  sx={style}
          label="ABOUT" {...a11yProps(4)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      {tags.map((tag, index) => (
          <>
            <div key = {index}>
            <h4  style={{display : "flex" }}>{tag} <PlayArrowIcon/> </h4>
            <List  tag ={tag}  channel = {channel}/>
            </div>
          </>
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Video className="video">
          {videos.map((video) => (
            <div key = {video._id}>
          <Card  video={video} />
          </div>
          ))}
        </Video>
      </TabPanel>
      <TabPanel value={value} index={2}>
        comming soon 
      </TabPanel>
      <TabPanel value={value} index={3}>
      Channel subscribed 
      </TabPanel>
      <TabPanel value={value} index={4}>
        comming soon 
      </TabPanel>
    </Box>
  </ChannelInfor>
</Container>

);
}