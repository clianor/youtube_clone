import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

const commonButtonStyle = {
  all: "unset",
  borderRadius: "4px",
  padding: "10px 16px",
  fontWeight: "500",
  fontSize: "1rem",
};

const subscribedButtonStyle = {
  ...commonButtonStyle,
  backgroundColor: "#FFFFFF",
  color: "black",
};

const subscribeButtonStyle = {
  ...commonButtonStyle,
  backgroundColor: "#CC0000",
  color: "white",
};

function Subscriber(props) {
  const instance = Axios.create();
  instance.defaults.timeout = 3000;

  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [subscribeNumber, setSubscribeNumber] = useState(undefined);
  const [subscribed, setSubscribed] = useState(undefined);

  const { isAuth } = useSelector((state) => state.user);

  const handleGetSubscribeNumber = async () => {
    instance
      .get(`/api/subscribe/${userTo}`)
      .then((res) => {
        if (res.data.success) {
          setSubscribeNumber(res.data.subscribeNumber);
        }
      })
      .catch((error) => {
        alert("구독자 수를 가져오지 못했습니다.");
        console.error(error);
      });
  };

  const handleGetSubscribeStatus = async () => {
    const subscribeVariables = {
      userTo,
      userFrom,
    };

    instance
      .get("/api/subscribe", { params: subscribeVariables })
      .then((res) => {
        setSubscribed(res.data.isSubscribe);
      })
      .catch((error) => {
        alert("구독 정보를 가져오지 못했습니다.");
        console.error(error);
      });
  };

  const handleSubscribe = async () => {
    const subscribeNumberVariables = {
      userTo,
      userFrom,
    };

    instance
      .post(`/api/subscribe`, subscribeNumberVariables)
      .then((res) => {
        if (res.data.success) {
          setSubscribed(res.data.subscribed);
        }
      })
      .catch((error) => {
        alert("구독 처리를 실패하였습니다.");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetSubscribeStatus();
    handleGetSubscribeNumber();
  });

  const onClick = async (event) => {
    if (!isAuth) {
      alert("먼저 로그인을 해주세요.");
      return;
    }

    if (userTo === userFrom) {
      alert("자신은 구독할 수 없습니다.");
      return;
    }

    handleSubscribe();
    handleGetSubscribeNumber();
  };

  return (
    <div>
      {subscribed !== undefined && (
        <button
          style={subscribed ? subscribedButtonStyle : subscribeButtonStyle}
          onClick={onClick}
          disabled={userTo === userFrom}
        >
          {subscribeNumber} {subscribed ? "구독중" : "구독"}
        </button>
      )}
    </div>
  );
}

export default Subscriber;
