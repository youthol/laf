import React, { Component } from "react";
import { Button, Layout } from "antd";
import { QuestionCircleOutlined,PhoneOutlined,SearchOutlined } from '@ant-design/icons';
import './style.scss';
const { Header, Footer, Content } = Layout;

class Home extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header className="Header">
            <h1 className="page-title">
              <span>失物招领</span>
            </h1>
            <p className="page-describe">失物招领负责电话：2787235</p> 
          </Header>
          <Content className="Content">
            <Button type="primary" size="large"  href="#lost"  className="Button" icon={<QuestionCircleOutlined />} > 
              失物
            </Button>
            <Button type="primary" size="large" href="#found"  className="Button" style={{background:'#ffc107'}} icon={<PhoneOutlined />}>
            招领
            </Button>
            <Button type="primary" size="large" href="#search"  className="Button"  style={{background:'#17a2b8'}} icon={<SearchOutlined />}>
              查找
            </Button>
          </Content>
          <Footer className="Footer">Copyright © 2016-2020 青春在线</Footer>
        </Layout>
      </div>
    );
  }
}

export default Home;
