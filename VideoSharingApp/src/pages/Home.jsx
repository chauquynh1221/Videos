import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {axiosInstance} from ".././config";
import Loading from "../components/Loading";
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;


const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  const [showLoading, setShowLoading] = useState(true);

  // setTimeout(() => {
  //   setShowLoading(false);
  // }, 1000);

  useEffect(()   => {
    const fetchVideos = async () => {
      setShowLoading(true)
      const res = await axiosInstance.get(`/video/${type}`);
      setVideos(res.data);
      setShowLoading(false)

    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {showLoading && <Loading/>}
      {!showLoading && 
      videos === null ? 
      <Loading/> 
      :
    videos.map((video) => (
      <Card key={video._id} video={video}/>
    ))
      }
    </Container>
  );
};

export default Home;
