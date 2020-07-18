import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Dropzone from "react-dropzone";
import { Layout, Typography, Form, Input, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Item } = Form;
const { Option } = Select;

const PrivacyOption = [
  { value: 0, label: "비공개" },
  { value: 1, label: "공개" },
];

const CategoryOption = [
  { label: "영화" },
  { label: "차량" },
  { label: "음악" },
  { label: "동물" },
  { label: "운동" },
];

function VideoUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(PrivacyOption[0].value);
  const [category, setCategory] = useState(CategoryOption[0].label);

  const onTitleChange = (event) => setTitle(event.currentTarget.value);

  const onDescription = (event) => setDescription(event.currentTarget.value);

  const onPrivacy = (value) => setPrivacy(value);

  const onCategory = (value) => setCategory(value);

  const onDrop = (files) => {
    let formData = new FormData();

    /**
     * x-www-form-urlencode와 multipart/form-data은 둘다 폼 형태이지만
     * x-www-form-urlencode은 대용량 바이너리 테이터를 전송하기에 비능률적이기 때문에
     * 대부분 첨부파일은 multipart/form-data를 사용하게 된다.
     */
    const config = {
      header: { "contents-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/video", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert("비디오 업로드에 실패했습니다.");
        console.log(error);
      });
  };

  return (
    <Content>
      <Helmet>
        <meta charSet="utf-8" />
        <title>영상 업로드</title>
      </Helmet>

      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}>Upload Video</Title>
        </div>

        <Form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {/* Drop Zone */}
            {/* 100메가까지 업로드 가능하도록 제한 */}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={838860800}>
              {({ getRootProps, getInputProps }) => (
                <section
                  {...getRootProps()}
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </section>
              )}
            </Dropzone>

            {/* Thumnail */}
            <div
              style={{
                display: "flex",
                width: "300px",
                height: "240px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src alt />
            </div>
          </div>

          <Item
            label="제목"
            name="Title"
            style={{ display: "block", margin: "10px 0 0 0" }}
          >
            <Input value={title} onChange={onTitleChange} />
          </Item>

          <Item
            label="설명"
            name="Description"
            style={{ display: "block", margin: "10px 0 0 0" }}
          >
            <TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              value={description}
              onChange={onDescription}
              style={{ resize: "none" }}
            />
          </Item>

          <Select
            value={privacy}
            style={{ display: "block", margin: "10px 0 0 0" }}
            onChange={onPrivacy}
          >
            {PrivacyOption.map((item) => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>

          <Select
            value={category}
            style={{ display: "block", margin: "10px 0 0 0" }}
            onChange={onCategory}
          >
            {CategoryOption.map((item) => (
              <Option value={item.label}>{item.label}</Option>
            ))}
          </Select>

          <Button
            type="primary"
            size={"large"}
            style={{ margin: "10px 0 0 0" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Content>
  );
}

export default VideoUploadPage;
