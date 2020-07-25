import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import moment from "moment";

const { Meta } = Card;

function VideCard({ history, video, minutes, seconds }) {
  return (
    <Col xxl={4} xl={6} lg={6} md={8} xs={24} key={video.filePath}>
      <Card
        hoverable
        style={{ width: "100%", margin: "0.5rem 0" }}
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
                {minutes ? minutes + "분" : ""} {seconds ? seconds + "초" : ""}
              </span>
            </div>
          </div>
        }
        onClick={() => history.push(`/video/${video._id}`)}
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
}

export default withRouter(VideCard);
