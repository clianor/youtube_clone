import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Layout, Typography, Col, Row, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Axios from "axios";
import moment from "moment";

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

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

    return (
      <Col xxl={4} xl={6} lg={6} md={8} xs={24} key={video.filePath}>
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <div style={{ position: "relative", width: "100%" }}>
              <img
                alt={video.title}
                src={
                  process.env.NODE_ENV === "production"
                    ? "/" + video.thumbnail
                    : `http://localhost:5000/${video.thumbnail}`
                }
                style={{ width: "100%" }}
              />

              <div
                className="VIDEO_DURATION"
                style={{
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  color: "#fff",
                  backgroundColor: "rgba(17, 17, 17, 0.8)",
                  opacity: 0.8,
                  width: "100%",
                  textAlign: "right",
                  padding: "2px 4px",
                  borderRadius: "2px",
                  letterSpacing: "0.5px",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "12px",
                }}
              >
                <span>
                  {minutes}분 {seconds}초
                </span>
              </div>
            </div>
          }
          onClick={() => console.log("card click")}
        >
          <Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={video.title}
            description={video.writer.name}
          />
          <span
            style={{
              display: "block",
              width: "100%",
              textAlign: "right",
              marginTop: "0.5rem",
            }}
          >
            조회수 {video.views}회&nbsp;&middot;&nbsp;
            {moment(video.createdAt).fromNow()}
          </span>
        </Card>
      </Col>
    );
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
