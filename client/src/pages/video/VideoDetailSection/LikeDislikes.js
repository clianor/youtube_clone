import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Tooltip } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";
import { set } from "mongoose";

function LikeDislikes({ video, videoId, userId, commentId }) {
  const instance = Axios.create();
  instance.defaults.timeout = 3000;

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  // 비디오인지 댓글인지에 따라 분기
  const variable = video ? { videoId, userId } : { commentId, userId };

  useEffect(() => {
    if (video) {
      instance
        .get(`/api/likes/${videoId}`, { params: variable })
        .then((res) => {
          if (res.data.success) {
            if (res.data.isLike) {
              setLikeAction(true);
              setDislikeAction(false);
            } else {
              setLikeAction(false);
              setDislikeAction(true);
            }
          }
        })
        .catch((error) => {
          alert("영상에 대한 좋아요 여부를 가져오지 못했습니다.");
          console.error(error);
        });
    } else {
      console.log("댓글 좋아요 기능 구현 중");
    }
  }, []);

  const onLike = (event) => {
    if (video) {
      instance
        .post(`/api/likes/${videoId}`, {
          params: { ...variable, isLike: true },
        })
        .then((res) => {
          if (res.data.success) {
            if (res.data.isLike) {
              setLikeAction(true);
              setDislikeAction(false);
            } else {
              setLikeAction(false);
              setDislikeAction(true);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("comment like clicked");
    }
  };

  const onDisLike = (event) => {
    if (video) {
      console.log("video dislike clicked");
    } else {
      console.log("comment dislike clicked");
    }
  };

  return (
    <>
      <span>
        <Tooltip title="Like">
          {LikeAction === "liked" ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span>
        <Tooltip title="Dislike">
          {DislikeAction === "liked" ? (
            <DislikeFilled onClick={onDisLike} />
          ) : (
            <DislikeOutlined onClick={onDisLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </>
  );
}

export default LikeDislikes;
