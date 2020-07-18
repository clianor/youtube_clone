import React from "react";
import { Helmet } from "react-helmet";
import { Layout } from "antd";
import { FaCode } from "react-icons/fa";

const { Content } = Layout;

function LandingPage() {
  return (
    <Content>
      <Helmet>
        <meta charSet="utf-8" />
        <title>예리튜브</title>
      </Helmet>
      <FaCode style={{ fontSize: "4rem" }} />
      <br />
      <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
    </Content>
  );
}

export default LandingPage;
