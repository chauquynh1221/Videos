import {axiosInstance} from ".././config"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;


const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/comment/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  

  
  const handleChanges = e => {
    setInput(e.target.value)
}


  const send = async () =>  {
    const desc = input
    try {
     await axiosInstance.post(`/comment`, {desc , videoId});
     setInput("");
     const res = await axiosInstance.get(`/comment/${videoId}`);
        setComments(res.data);
    } catch (err) {}
  }

  

  return (
    

    <Container>
      { currentUser ? <NewComment>
        <Avatar src={currentUser.img} />
        <Input  value={input}  onChange={handleChanges}id = "input" placeholder="Add a comment..." />
        <SendOutlinedIcon onClick={send}/>
      </NewComment> : ""}
      {comments.map(comment=>(
        <Comment key={comment._id} videoId = {videoId} setComments = {setComments}  comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
