import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, message, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./style.scss";
const { Header, Sider, Content, Footer } = Layout;

class BasicLayout extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  // Log out
  handleLogout = () => {
    Modal.confirm({
      title: "是否退出当前账号",
      okType: "danger",
      okText: "是",
      cancelText: "否",
      onOk: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("expires_at");
        message.success("已退出");
        this.props.refresh();
        this.props.history.push("/login");
      },
    });
  };
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className="site-Slider"
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={() => this.props.handleStatus(1)}>
              <UserOutlined />
              <span>失物数据</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.props.handleStatus(2)}>
              <VideoCameraOutlined />
              <span>拾物数据</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Button onClick={this.handleLogout}>Log out</Button>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 500,
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            {" "}
            ©2020 Created by Youthol
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
