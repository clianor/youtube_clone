import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Typography, Form, Input, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const { Item } = Form;
const { Option } = Select;

const PrivacyOption = [
  { value: 0, label: "Privacy" },
  { value: 1, label: "Public" },
];

const CategoryOption = [
  { label: "Film & Animation" },
  { label: "Autos & Vehicles" },
  { label: "Music" },
  { label: "Pets & Animals" },
  { label: "Sports" },
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

  return (
    <div className="CONTENTS">
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
            <Dropzone
              onDrop={(acceptedFiles) => console.log(acceptedFiles)}
              multiple
              maxSize
            >
              {({ getRootProps, getInputProps }) => (
                <section
                  style={{
                    display: "flex",
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <PlusOutlined style={{ fontSize: "3rem" }} />
                  </div>
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
            label="Title"
            name="Title"
            style={{ display: "block", margin: "10px 0 0 0" }}
          >
            <Input value={title} onChange={onTitleChange} />
          </Item>

          <Item
            label="Description"
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
    </div>
  );
}

export default VideoUploadPage;
