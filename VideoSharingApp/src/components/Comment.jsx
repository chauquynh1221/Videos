import {axiosInstance} from ".././config"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuItem, Menu, IconButton } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top : 10px;
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  align-items: center;
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: ${({ theme }) => theme.textSoft};
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
  color: ${({ theme }) => theme.textSoft};
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
  color: ${({ theme }) => theme.textSoft};
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
color: ${({ theme }) => theme.textSoft};

`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ;
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.textSoft};
`;

const Send = styled.div`
padding: 5px 15px;
  border: 1px solid ;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.textSoft};
`
const Divv = styled.div`
color: ${({ theme }) => theme.textSoft};

`
const Comment = ({ comment , setComments, videoId}) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.desc);
  
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axiosInstance.get(`/find/${comment?.userId}`);
      setChannel(res.data)
    
    };
    fetchComment();
  }, [comment.userId]);

  const reload = async () => {
    const res = await axiosInstance.get(`/comment/${videoId}`);
      setComments(res.data)
  }

  const deletett = async () => {
    try {
      await axiosInstance.delete(`/comment/${comment._id}`);
      handleClose();
      reload();
    } catch (error) {
      
    }

  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  var open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Xử lý sự kiện chỉnh sửa bình luận
  const handleSubmit = async () => {
    const desc = editedText
    try {
      await axiosInstance.put(`/comment/${comment._id}`, {desc});
      setIsEditing(false);
      handleClose();
      reload();

    } catch (error) {
      
    }

  }
  
  // Hiển thị form chỉnh sửa bình luận nếu isEditing là true
  if (isEditing) {
    return (
      <NewComment>
      <Avatar src={currentUser.img} />
      <Input  type="text"
        value={editedText}
        onChange={event => setEditedText(event.target.value)}/>
        <Send onClick={handleSubmit} >Send</Send>
    </NewComment>
      
    
    );
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
    <Divv>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Divv>
        <MoreVertIcon />
        </Divv>
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
          <MenuItem onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </MenuItem>
        
      </Menu>
    </Divv>
     </>
      :  ""}
      </>
       : ""}                        
    </Container>
  );
};

export default Comment;
