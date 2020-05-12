import React, { Component } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UploadPic from "./UploadPic";
import { Form, Input, DatePicker, Button, notification ,message} from "antd";
import {withRouter} from "react-router-dom";
import "./style/item_info.scss";
import { upload } from "../api/auth";

// body
class ItemInfo extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      identity: this.props.identity,
      id: 0,
      noticeBar: "发布后请在近期保持电话畅通，谢谢您的配合！",
    };
  }

  // 告诉接口，这是lost 还是 found
  componentDidMount() {
    if (this.state.identity === "拾物") {
      this.setState({id:2})
    } else {
      this.setState({id:1})
    }
  }

  // 友情提示
  openNotification = () => {
    notification.open({
      message: "温馨提示",
      description: "失物信息越准确，可以更加快的找到物品哦!",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  // success or fail
  MySwal = withReactContent(Swal);
  onFinish = (values) => {
    // 这里修改各个数据，然后将数据放入新的数组
    const time = values.time.format("YYYY-MM-DD HH:mm");
    const time_stamp = Date.parse(new Date(time)) / 1000;
    values.time = time_stamp;
    // 设置上传图片地址
    
    if (values.imgs) {
      console.log("have picture");
      if (values.imgs.fileList[0] && !values.imgs.fileList[1]) {
        const img1 = values.imgs.fileList[0].response.data[0].img_name;
        values.imgs = img1;
      } else if (values.imgs.fileList[1] && !values.imgs.fileList[2]) {
        const img1 = values.imgs.fileList[0].response.data[0].img_name;
        const img2 = values.imgs.fileList[1].response.data[0].img_name;
        values.imgs = [img1, img2].join("|");
      } else if (values.imgs.fileList[2]) {
        const img1 = values.imgs.fileList[0].response.data[0].img_name;
        const img2 = values.imgs.fileList[1].response.data[0].img_name;
        const img3 = values.imgs.fileList[2].response.data[0].img_name;
        values.imgs = [img1, img2, img3].join("|");
      } else {
        console.log("Error");
      }
    }else if(!values.imgs){
      console.log("don't have");
      
    }else{
      console.log("这玩意有毛病");
    }
    this.uploadValue(values);
  };

  /**
   * @description 请求创建新的日程记录
   * @param {*} data
   * @returns
   */
   uploadValue = (data) => {
    const id = this.state.id;
    const uploadback = upload(id, data);
    uploadback.then((v)=>{
     if (v.msg==="发布成功") {
      message.success(v.msg)
      this.props.history.push("/search")
     }else{
       message.error("oops,发布失败了，联系下程序猿") } })
  };
  onFinishFailed = (errorInfo) => {console.log("Failed:", errorInfo); };
  onFinishFailed = (errorInfo) => {console.log("Failed:", errorInfo);};
  render() {
    return (
      <div>
        <div v-if="noticeBarShow" className="noticeBar">
          <div className="notice-warp">
            <div>{this.state.noticeBar}</div>
          </div>
        </div>
        <Button type="dashed" size="large"  href="#"  className="Item_page_Button" > 
              返回上一页
         </Button>
        <Form
          className="form"
          name="validate_other"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          {/* 时间选择 */}
          <Form.Item name="time" label={this.state.identity + "时间"}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          {/* 失物地点 */}
          <Form.Item
            name="place"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            label={this.state.identity + "地点"}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          {/* 电话号码输入 */}
          <Form.Item
            name="phoneNumber"
            label="联系方式"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          {/* 联系人 */}
          <Form.Item name="personName" label="联系人">
            <Input />
          </Form.Item>

          {/* 失物简介 */}
          <Form.Item
            name="detail"
            label={this.state.identity + "简介"}
            onClick={this.openNotification}
          >
            <Input />
          </Form.Item>

          {/* 失物名称 */}
          <Form.Item name="thingName" label={this.state.identity + "名称"}>
            <Input />
          </Form.Item>

          {/* upload */}
          <UploadPic />

          {/* 提交 */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="SubmitButton"
            >
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default  withRouter(ItemInfo);
