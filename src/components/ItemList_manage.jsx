import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, Popconfirm } from "antd";
import { checkPermission } from "../utils/auth";
const { Column } = Table;

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: "lost",
    };
  }
  render() {
    return (
      <div>
        {this.props.data && (
          <Table
            dataSource={this.props.data}
            expandedRowRender={this.props.data.handleExpandRow}
          >
            <Column title="ID" dataIndex="id" key="id" />
            <Column
              title="物品"
              dataIndex={this.props.identity + "_name"}
              key="name"
            />
            <Column
              title="联系人"
              dataIndex={this.props.identity + "_person"}
              key="person"
            />
            <Column
              title="地点"
              dataIndex={this.props.identity + "_place"}
              key="place"
            />
            <Column
              title="联系方式"
              dataIndex={this.props.identity + "_phone"}
              key="phone"
            />
            <Column
              title="物品状态"
              dataIndex={this.props.identity + "_status"}
              key="status"
            />
            <Column
              title="操作"
              key="action"
              render={(text) => (
                <Button.Group>
                  <Button
                    disabled={!checkPermission(["status"], true)}
                    onClick={() => this.props.handleEdit(text)}
                  >
                    修改状态
                  </Button>
                  <Button
                    onClick={() =>
                      this.props.handDetail(text.id,this.props.status)
                    }
                  >
                    查看详情
                  </Button>
                  <Popconfirm
                    disabled={!checkPermission(["status"], true)}
                    title="Are you sure delete this data?"
                    onConfirm={() =>
                      this.props.handleDelete(text.id,this.props.status)
                    }
                  >
                    <Button disabled={!checkPermission(["status"], true)}>
                      删除本条
                    </Button>
                  </Popconfirm>
                </Button.Group>
              )}
            />
          </Table>
        )}
      </div>
    );
  }
}

ItemList.propTypes = {
  data: PropTypes.array,
  handleExpandRow: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ItemList;
