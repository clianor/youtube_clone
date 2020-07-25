import React, { useState } from "react";
import { Tooltip } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";

function LikeDislikes({ video, videoId, userId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  variable = video ? { videoId, userId } : { commentId, userId };

  return (
    <>
      <span>
        <Tooltip title="Like">
          {LikeAction === "liked" ? <LikeFilled /> : <LikeOutlined />}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span>
        <Tooltip title="Dislike">
          {DislikeAction === "liked" ? <DislikeFilled /> : <DislikeOutlined />}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </>
  );
}

export default LikeDislikes;
