import React, { useEffect, useState } from "react";
import Axios from "axios";
import SideVideoItem from "./SideVideoItem";

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/video", {
      params: {
        limit: 3,
      },
      timeout: 1000, // 1초 이내에 응답이 오지 않으면 에러로 간주
    }).then((res) => {
      if (res.data.success) {
        setSideVideos(res.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  return (
    <div>
      {SideVideos.map((video, index) => (
        <SideVideoItem key={index} video={video} />
      ))}
    </div>
  );
}

export default SideVideo;
