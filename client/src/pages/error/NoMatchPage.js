import React from "react";
import { Helmet } from "react-helmet";
import { Layout, Result, Button } from "antd";

const { Content } = Layout;

function NoMatchPage() {
  return (
    <Content>
      <Helmet>
        <meta charSet="utf-8" />
        <title>페이지를 찾을 수 없습니다.</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="이페이지는 존재하지 않습니다."
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    </Content>
  );
}

export default NoMatchPage;
