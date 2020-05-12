import React, { Component } from "react";
import { Form, Input, Button, DatePicker, Radio, notification } from "antd";
import "./style/item_info.scss";
import { search } from "../api/auth";
const { RangePicker } = DatePicker;

// time
const rangeConfig = {
  rules: [{ type: "array", required: true, message: "请选择时间范围!" }],
};

// 提示
notification.config({
  placement: "bottomRight",
  bottom: 220,
  duration: 3,
});

const openNotification = () => {
  notification.open({
    message: "温馨提示",
    description: "关键词越准确，可以更精准的找到需要的信息 ",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

// 类主体
class Search_For extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
   onFinish = (values) => {
    const begin_time_stamp =
      Date.parse(new Date(values.picker[0].format("YYYY-MM-DD HH:mm"))) / 1000;
    const end_time_stamp =
      Date.parse(new Date(values.picker[1].format("YYYY-MM-DD HH:mm"))) / 1000;
    // 简单的方法把字符串转为数字
    if (values.status === "1") {
      values.status = 1;
    }else
    {
      values.status = 2;
    }
    // 去掉无用的不再使用的time_pick属性，然后从新设置时间戳属性
    delete values.picker;
    values.startTime = begin_time_stamp;
    values.endTime = end_time_stamp;
    values.searchKey="name"

 /**
   * @description 请求所有搜索数据
   * @param {*} status 
   * @returns
   */
    search(this.props.status, values).then((v) => {
        //  @description 调用父组件函数，传值到父组件
      this.props.handleData(v[0]);
    });

  };

  // 失败
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <Form
        className="search_form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          onClick={openNotification}
          name="keyWord"
          rules={[{ required: true, message: "请输入关键词!" }]}
        >
          <Input placeholder="请输入丢失物品关键词" />
        </Form.Item>

        {/* 时间范围 */}
        <Form.Item name="picker" {...rangeConfig}>
          <RangePicker />
        </Form.Item>

        {/* 是否领取 */}
        <Form.Item name="status" >
          <Radio.Group>
            <Radio value="0">已领取</Radio>
            <Radio value="1">未领取</Radio>
          </Radio.Group>
        </Form.Item>
        {/* 提交 */}
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            查找
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Search_For;
