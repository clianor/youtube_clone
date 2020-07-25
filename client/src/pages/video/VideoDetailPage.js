import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Layout, Typography, Row, Col, List, Avatar } from "antd";
import Axios from "axios";

import SideVideo from "./VideoDetailSection/SideVideo";
import LikeDislikes from "./VideoDetailSection/LikeDislikes";
import Subscriber from "./VideoDetailSection/Subscriber";

const { Content } = Layout;
const { Item } = List;
const { Meta } = Item;
const { Title } = Typography;

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);

  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    Axios.post(`/api/video/${videoId}`)
      .then((res) => {
        if (res.data.success) {
          setVideo(res.data.video);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("영상 정보를 가져오는데 실패했습니다.");
      });
  }, [videoId]);

  return (
    <Content>
      <Row style={{ width: "100%", padding: "3rem 3rem" }}>
        <Col lg={18} xs={24}>
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "black",
              }}
            >
              {Video.length === undefined && (
                <video
                  controls
                  src={
                    process.env.NODE_ENV === "production"
                      ? "/" + Video.filePath
                      : `http://localhost:5000/${Video.filePath}`
                  }
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minWidth: !Video.isVertical ? "100%" : "0%",
                    minHeight: Video.isVertical ? "100%" : "0%",
                  }}
                />
              )}
            </div>
          </div>

          <Title level={1} style={{ marginTop: "2rem" }}>
            {Video.title}
          </Title>

          <hr />

          {Video.length === undefined && (
            <Item
              actions={[
                <LikeDislikes video videoId={videoId} userId={userId} />,
                <Subscriber userTo={Video.writer._id} userFrom={userId} />,
              ]}
            >
              <Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<Link to={`/video/${Video._id}`}>{Video.title}</Link>}
                description={Video.description}
              />
            </Item>
          )}

          {/** Comments */}
        </Col>

        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    </Content>
  );
}

export default withRouter(VideoDetailPage);
