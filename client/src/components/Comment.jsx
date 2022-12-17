import {axiosInstance} from ".././config"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuItem, Menu, IconButton } from '@mui/material';


const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  align-items: center;
  width: 100%;
  display: flex;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  padding-left : 10px;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  display: flex;
`;

const Over = styled.button`
width : 5%;
float: right;
padding: 5px;
display: none ;
display: flex;
  flex-direction: column;

`
const Div = styled.div`
width : 95%;
float: left;
padding: 5px;
display: flex;

`




const Comment = ({ comment , setComments, videoId}) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axiosInstance.get(`/find/${comment.userId}`);
      setChannel(res.data)
    
    };
    fetchComment();
  }, [comment.userId]);

  const deletett = async (req, res) => {
    try {
      await axiosInstance.delete(`/comment/${comment._id}`);
      const res = await axiosInstance.get(`/comment/${videoId}`);
      setComments(res.data)

    } catch (error) {
      
    }

  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCmt = () => {

  }
  
  return (
    <Container>
      <Div>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}  </Text>
      </Details>
      </Div>
    {currentUser ?
      <>
    { currentUser.name === channel.name ? 
    <>
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >  
          <MenuItem onClick={deletett}>
            Xóa
          </MenuItem>
          <MenuItem onClick={updateCmt}>
            Chỉnh sửa
          </MenuItem>
        
      </Menu>
    </div>
     </>
      :  ""}
      </>
       : ""}                        
    </Container>
  );
};

export default Comment;
