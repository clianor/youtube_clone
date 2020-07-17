import React from "react";
import { Result, Button } from "antd";

function NoMatchPage() {
  return (
    <div className="CONTENTS">
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
    </div>
  );
}

export default NoMatchPage;
