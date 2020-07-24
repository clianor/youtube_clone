import React from "react";
import { Link } from "react-router-dom";

function SideVideoItem({ video }) {
  var minutes = Math.floor(video.duration / 60);
  var seconds = Math.floor(video.duration - minutes * 60);

  return (
    <div style={{ display: "flex", marginTop: "1rem", padding: "0 1rem" }}>
      <div style={{ width: "40%", marginRight: "0.5rem" }}>
        <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
          <img
            style={{ width: "100%" }}
            src={`http://localhost:5000/${video.thumbnail}`}
            alt="thumbnail"
          />
        </Link>
      </div>
      <div style={{ width: "60%" }}>
        <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
          <h6 style={{ fontSize: "1rem", color: "black", margin: "0" }}>
            {video.title}
          </h6>
          <span style={{ display: "block", fontSize: "0.75rem", margin: "0" }}>
            {video.writer.name}
          </span>

          <span style={{ display: "block", fontSize: "0.5rem", margin: "0" }}>
            조회수 {video.views}회
          </span>

          <span style={{ display: "block", fontSize: "0.5rem", margin: "0" }}>
            재생시간 {minutes ? minutes + "분" : ""}{" "}
            {seconds ? seconds + "초" : ""}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SideVideoItem;
