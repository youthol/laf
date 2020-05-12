import React, { Component } from "react";
import ItemList from "../../components/ItemList_manage";
import { getItems, deleteItem, updatestatus } from "../../api/auth";
import BasicLayout from "../../layout/BasicLayout";
import {message} from 'antd'

class Item extends Component {
  state = {
    data: [],
    status: 1,
    identity: "",
  };

  componentDidMount() {
    this.getItemList();
  }

  getItemList = async () => {
    const id = this.state.status;
    const rowData = await getItems(id);
    if (!rowData) {
      message.error('服务器错误，请检查网络是否正常！');
      return;
    }
    const data = rowData[0].map((el) => ({ ...el, key: el.id }));
    if (id === 1) {
      this.setState({identity:"lost"})
    } else {
      this.setState({identity:"found"})
    }
    if (data && data.length) {
      this.setState({ data });
    }
  };

  // layout 子组件点击，更换父组件identity_status
  handleStatus = (identity_status) => {
    this.setState({
      status:identity_status
    })
    this.getItemList();
  };


  // if判断修改lost还是found，然后传值，修改
  handleEdit = async (item) => {
    if (!item) return;
    const id = item.id;
    const status = this.state.status;
    if (status === 1) {
      const params = {
        checkUser: item.lost_person,
        checkPhone: item.lost_phone,
      };
      const editBack= await updatestatus(id, status, params);
      if (editBack.status ==="ok") {
        message.success("修改成功")
      }else{
        message.error("修改失败")
      }
    } else {
      const params = {
        checkUser: item.found_person,
        checkPhone: item.found_phone,
      };
      const editBack= await updatestatus(id, status, params); 
      if (editBack.status ==="ok") {
        message.success("修改成功")
      }else{
        message.error("修改失败")
      }
    }  
    this.getItemList()
  };

  // 删除数据
  handleDelete = async (id, status) => {
    if (!id) return;
    const deleteBack = await deleteItem(id, status)
    if (deleteBack.status ==="ok") {
      message.success("删除成功")
    }else{
      message.error("删除失败")
    }
    
    this.getItemList();
  };


  // 查看详情
  handleDetail = async (id, status) => {
    if (!id) return;
    this.props.history.push("/search_result_Detail/" + id + "/" + status);  
  };

  // 退出后刷新界面
  refresh=()=>{
    this.getItemList();
  }

 
  render() {
    return (
      <BasicLayout 
      refresh={this.refresh}
      handleStatus={this.handleStatus}>
        <ItemList
          data={this.state.data}
          status={this.state.status}
          identity={this.state.identity}
          handleEdit={this.handleEdit}
          handDetail={this.handleDetail}
          handleDelete={this.handleDelete}
        />
      </BasicLayout>
    );
  }
}

export default Item;
