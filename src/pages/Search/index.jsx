import React, { Component } from "react";
import { Button, Layout } from "antd";
import { QuestionCircleOutlined,PhoneOutlined} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

class Search extends Component {
  render() {
    return (
      <div>
         <Layout>

          <Header className="Header">

            <h1 className="page-title">
              <span>分页查找</span>
            </h1>
            <p className="page-describe">失物招领负责电话：2787235</p> 
          </Header>
          <Content className="Content">
            <Button type="primary" size="large" href="#ItemList_Student/1"  className="Button" icon={<QuestionCircleOutlined />} > 
              点击查看失物数据
            </Button>
            <Button type="primary" size="large" href="#ItemList_Student/2"  className="Button" style={{background:'#ffc107'}} icon={<PhoneOutlined />}>
            点击查看招领数据
            </Button>
          </Content>
          <Button type="dashed" size="large"  href="#"  className="BackButton_search_page" > 
              返回上一页
         </Button>
          <Footer className="Footer">Copyright © 2016-2020 青春在线</Footer>
        </Layout>
      </div>
    );
  }
}

export default Search;
