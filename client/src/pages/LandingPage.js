import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Layout, Typography, Row, Result } from "antd";
import { GiMagnifyingGlass } from "react-icons/gi";
import Axios from "axios";

import VideoCard from "../components/video/Card";

const { Content } = Layout;
const { Title } = Typography;

function LandingPage() {
  const [Videos, setVideos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    Axios.get("/api/video").then((res) => {
      if (res.data.success) {
        setVideos(res.data.videos);
        setIsEmpty(!res.data.videos.length);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <VideoCard
        key={index}
        video={video}
        minutes={minutes}
        seconds={seconds}
      />
    );
  });

  return (
    <Content style={{ justifyContent: "start" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>예리튜브</title>
      </Helmet>

      <Title level={2} style={{ marginTop: "3rem" }}>
        최신 영상
      </Title>
      {isEmpty ? (
        <Result
          icon={
            <GiMagnifyingGlass
              style={{ fontSize: "10rem", marginTop: "1rem" }}
            />
          }
          title="영상이 존재하지 않습니다."
        />
      ) : (
        <Row gutter={16} style={{ width: "100%" }}>
          {renderCards}
        </Row>
      )}
    </Content>
  );
}

export default LandingPage;
