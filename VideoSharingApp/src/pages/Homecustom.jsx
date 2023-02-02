import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import {axiosInstance} from "../config";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Homecustom = ({type}) => {
  const [videos, setVideos] = useState([]);
  const slug = useLocation().pathname.split("/")[1];
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/video/slug/${slug}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [slug]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Homecustom;
