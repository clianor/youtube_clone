import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Row, Col, List } from "antd";
import Axios from "axios";

const { Content } = Layout;
const { Item } = List;
const { Meta } = Item;

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);

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
      <Row style={{ width: "100%", padding: "3rem 4rem" }}>
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
              {Video && (
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

          <Item>
            테스트 데이터입니다
            <Meta />
          </Item>

          {/** Comments */}
        </Col>

        <Col lg={6} xs={24}>
          Side Videos
        </Col>
      </Row>
    </Content>
  );
}

export default withRouter(VideoDetailPage);
