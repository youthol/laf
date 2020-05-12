import React, { Component } from "react";
import { Form, Input, Button,  Checkbox } from "antd";
import BasicLayout from "../../../layout/BasicLayout/index";
class ItemEdit extends Component {
  state = {
    userid: 0,
    userInfo: {},
  };
  componentDidMount() {
    this.initialization();
  }
  //   handleSubmit = e => {
  //     e.preventDefault();
  //     const { validateFields } = this.props.form;
  //     validateFields((err, values) => {
  //       if (!err) {
  //         const data = Object.assign({}, values, {
  //           birthday: moment(values.birthday).format('YYYY-MM-DD'),
  //           department: values.department.join('+'),
  //           duty_at: values.duty_at.join('|')
  //         });
  //         this.putUserInfo(values.id, data);
  //       }
  //     });
  //   };
  initialization = async () => {
    const info = this.props.match.params;
    console.log(info);
    
    // const user = await getItemsById(id);
    // this.setState({
    //   userinfo: user.data.userinfo,
    // });
  };
  //   putUserInfo = async (id, data) => {
  //     if (!id || !data) return;
  //     await putUser(id, data);
  //     this.props.history.push('/users');
  //   };
  render() {
    const status = [
      { label: "已领取", value: "0" },
      { label: "未领取", value: "1" },
    ];

    return (
      <BasicLayout>
        {this.state.userinfo && (
          <Form
            initialValues={{
              name: this.state.userinfo.name,
            }}
            // onSubmit={this.handleSubmit}
          >
            <Form.Item
              name="name"
              label="联系人"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" placeholder="请输入姓名" />
            </Form.Item>
            {/* 状态选择 */}
            <Form.Item label="物品状态">
              <Checkbox.Group options={status} />
            </Form.Item>

            {/* 提交 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        )}
      </BasicLayout>
    );
  }
}

export default ItemEdit;
