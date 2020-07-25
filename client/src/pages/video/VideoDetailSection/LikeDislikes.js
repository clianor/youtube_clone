import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Tooltip } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";

function LikeDislikes({ video, videoId, userId, commentId }) {
  const instance = Axios.create();
  instance.defaults.timeout = 3000;

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(false);
  const [DislikeAction, setDislikeAction] = useState(false);

  // 비디오인지 댓글인지에 따라 분기
  const variable = video ? { videoId, userId } : { commentId, userId };

  const handleVideoLikesAction = () => {
    instance
      .get(`/api/likes/${videoId}`, { params: variable })
      .then((res) => {
        if (res.data.success) {
          setLikes(res.data.Likes);
          setDislikes(res.data.DisLikes);

          if (res.data.isLike) {
            setLikeAction(true);
            setDislikeAction(false);
          } else if (res.data.isLike === false) {
            setLikeAction(false);
            setDislikeAction(true);
          } else {
            setLikeAction(false);
            setDislikeAction(false);
          }
        } else {
          setLikeAction(false);
          setDislikeAction(false);
        }
      })
      .catch((error) => {
        alert("영상에 대한 좋아요 여부를 가져오지 못했습니다.");
        console.error(error);
      });
  };

  const setVideoLikes = (isLike) => {
    instance
      .post(`/api/likes/${videoId}`, { ...variable, isLike })
      .then((res) => {
        if (res.data.success) {
          handleVideoLikesAction();
        }
      })
      .catch((error) => {
        if (error.request.status === 401) {
          alert("자신의 영상에는 좋아요를 누를 수 없습니다.");
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    if (video) {
      handleVideoLikesAction();
    } else {
      console.log("댓글 좋아요 기능 구현 중");
    }
  }, [video]);

  const onClick = (event) => {
    if (video) {
      // video
      const isLike =
        event.currentTarget.getAttribute("aria-label") === "like"
          ? true
          : false;

      setVideoLikes(isLike);
    } else {
      // comment
    }
  };

  return (
    <>
      <span>
        <Tooltip title="Like">
          {LikeAction === true ? (
            <LikeFilled onClick={onClick} />
          ) : (
            <LikeOutlined onClick={onClick} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span>
        <Tooltip title="Dislike">
          {DislikeAction === true ? (
            <DislikeFilled onClick={onClick} />
          ) : (
            <DislikeOutlined onClick={onClick} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </>
  );
}

export default LikeDislikes;
