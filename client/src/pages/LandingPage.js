import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Layout, Typography, Row, Card } from "antd";
import Axios from "axios";

import VideoCard from "../components/video/Card";

const { Content } = Layout;
const { Title } = Typography;

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/video").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return <VideoCard video={video} minutes={minutes} seconds={seconds} />;
  });

  return (
    <Content style={{ justifyContent: "start" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>예리튜브</title>
      </Helmet>

      <Title level={2} style={{ marginTop: "3rem" }}>
        추천영상
      </Title>
      <Row gutter={16} style={{ width: "100%" }}>
        {renderCards}
      </Row>
    </Content>
  );
}

export default LandingPage;
