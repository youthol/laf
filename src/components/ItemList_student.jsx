import React, { Component } from "react";
import { Table, Button, Layout } from "antd";
import { getItems } from "../api/auth";
import Searchfor from "./SearchFor";
import {withRouter} from "react-router-dom";
const { Column } = Table;
const { Header } = Layout;
class ItemList_Student extends Component {
  state = {
    identity: "",
  };
  componentDidMount() {
    this.getItemList();
    this.identity_set()
  }

  toDetail = (id, status) => {
    this.props.history.push("/search_result_Detail/" + id + "/" + status);
  };

  getItemList = async () => {
    const id = this.props.match.params.id;
    const rowData = await getItems(id);
    if (!rowData) {
      alert("连接服务器失败")
      return
    }
    const data = rowData[0].map((el) => ({ ...el, key: el.id }));
    if (data && data.length) {
      this.setState({ data });
    }
  };

  identity_set=()=>{
    // 告诉子组件目前是lost还是found
    const identity_status = this.props.match.params.id;
    if (identity_status === "1") {
      this.setState({
        identity:"lost"
      })
    } else {
      this.setState({
        identity:"found"
      })
    }
  }
  
  SearchData_return=val=>{
      const searchdata = val.map((el) => ({ ...el, key: el.id }));
      if (searchdata && searchdata.length) {
        this.setState({ data:searchdata });
      }else{
        alert("未找到相应数据")
      }
  }
  render() {


    return (
      <div>
        {/* search组件 */}
        <Button type="dashed" size="large"  href="#search"  className="BackButton" > 
              返回上一页
         </Button>
        <Header className="ItemList_Header">

          <h1 className="page-title">
            <span>搜索</span>
          </h1>
        </Header>
        <Searchfor
          handleData={this.SearchData_return}
          status={this.props.match.params.id}
        />
        <Header className="ItemList_Header">
          <h1 className="page-title">
            <span>全部数据展示</span>
          </h1>
        </Header>

        {/* table */}
        <Table dataSource={this.state.data} className="ItemTable">
          {/* <Column title="ID" dataIndex="id" key="id" /> */}
          <Column
            title="物品"
            dataIndex={this.state.identity + "_name"}
            key="lost_name"
          />
          <Column
            title="联系人"
            dataIndex={this.state.identity + "_person"}
            key="lost_person"
          />
          <Column
            title="地点"
            dataIndex={this.state.identity + "_place"}
            key="lost_place"
          />
          <Column title="联系方式" dataIndex={this.state.identity + "_phone"} />
          {/* <Column
            title="物品状态"
            dataIndex={this.state.identity + "_status"}
          /> */}

          <Column
            title="操作"
            key="action"
            render={(text) => (
              <Button.Group>
                {/* 这里函数要添加()=>目前我还没搞清为什么 */}
                <Button
                  onClick={() =>
                    this.toDetail(text.id, this.props.match.params.id)
                  }
                >
                  详情
                </Button>
              </Button.Group>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default  withRouter(ItemList_Student);
