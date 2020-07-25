import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import Axios from "axios";
import {
  Layout,
  Space,
  Typography,
  Form,
  Input,
  Button,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

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

function VideoUploadPage({ history }) {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(PrivacyOption[0].value);
  const [category, setCategory] = useState(CategoryOption[0].label);

  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isVertical, setIsVertical] = useState(false);

  const onTitleChange = (event) => setTitle(event.currentTarget.value);

  const onDescription = (event) => setDescription(event.currentTarget.value);

  const onPrivacy = (value) => setPrivacy(value);

  const onCategory = (value) => setCategory(value);

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      writer: user.userId,
      title: title,
      description: description,
      privacy: privacy,
      filePath: filePath,
      catogory: category,
      duration: duration,
      thumbnail: thumbnail,
      isVertical: isVertical,
    };

    Axios.post("/api/video", variables)
      .then((res) => {
        if (res.data.success) {
          message.success("성공적으로 업로드를 완료하였습니다.");

          setTimeout(() => {
            history.push("/");
          }, 3000);
        }
      })
      .catch((error) => alert("비디오 업로드에 실패하였습니다."));
  };

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

    Axios.post("/api/video/file", formData, config)
      .then((res) => {
        let variable = {
          filePath: res.data.filePath,
          fileName: res.data.fileName,
        };

        setFilePath(res.data.filePath);

        Axios.post("/api/video/file/thumbnail", variable)
          .then((res) => {
            if (res.data.success) {
              setDuration(res.data.fileDuration);
              setThumbnail(res.data.filePath);
              setIsVertical(res.data.isVertical);
            }
          })
          .catch((error) => {
            alert("썸네일 생성에 실패하였습니다.");
            console.error(error);
          });
      })
      .catch((error) => {
        alert("비디오 업로드에 실패했습니다.");
        console.error(error);
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
          <Space
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
                    width: "320px",
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
                width: "320px",
                height: "240px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {thumbnail && (
                <img
                  src={
                    process.env.NODE_ENV === "production"
                      ? "/" + thumbnail
                      : `http://localhost:5000/${thumbnail}`
                  }
                  alt="thumbnail"
                />
              )}
            </div>
          </Space>

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
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>

          <Select
            value={category}
            style={{ display: "block", margin: "10px 0 0 0" }}
            onChange={onCategory}
          >
            {CategoryOption.map((item) => (
              <Option key={item.label} value={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            size={"large"}
            style={{ margin: "10px 0 0 0" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Content>
  );
}

export default withRouter(VideoUploadPage);
