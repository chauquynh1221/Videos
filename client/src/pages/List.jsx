import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {axiosInstance} from ".././config";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const List = ({channel, tag}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/video/${channel._id}`);
      setVideos(res.data);
      };
      fetchVideos();
  }, [channel._id]);

  const videoss = videos.filter( video => video.tags?.includes(tag) )
  return (
    <Container >
      {videoss.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default List;
