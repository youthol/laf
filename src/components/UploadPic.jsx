import React, { Component } from "react";
import { Upload, Form, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// 函数引入
import compress from "./Js/Upload_info";

export default class Upload_Pic_Video extends Component {
  beforeUpload = (file) => {
    //  实现图片压缩
    const p = compress(file);
    return p;
  };
  render() {
    const Picprops = {
      name: "fileImage",
      action: "https://youthapi.sdut.edu.cn/api/laf/upload/Image",
      beforeUpload: this.beforeUpload,
      accept: "image/*",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          if (info.file.response.status === "OK") {
            message.success(`${info.file.name} 文件上传成功`);
          } else if (info.file.response.status === "error") {
            message.error(`${info.file.name} 文件上传失败`);
          }
        }

      },
    };

    return (
      <div>
        {/* 图片上传 */}
        <Form.Item label="图片" extra="上传丢失物品图片" name="imgs">
          <Upload {...Picprops}>
            <Button>
              <UploadOutlined /> 点击上传(最多三张哦)
            </Button>
          </Upload>
        </Form.Item>
      </div>
    );
  }
}
