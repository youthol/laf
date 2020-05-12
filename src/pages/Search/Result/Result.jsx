import React, { Component } from "react";
import { Button,message } from "antd";
// 图片依赖
import Zmage from "react-zmage";
import { getItemById } from "../../../api/auth";
import { List } from "antd";
import { HomeOutlined } from "@ant-design/icons";

class Result extends Component {
  componentWillMount() {
    const params = {};
    params.searchId = this.props.match.params.id;
    const status = this.props.match.params.status;
    getItemById(status, params).then((val) => {
      this.setState({
        detail: val[0][0],
      });

      // 使用最笨的方法给数据改个名,if()里的status是页面lost/found，detail.status是物品的状态（捡到/未捡到）
      if (this.props.match.params.status === "1") {
        this.setState({
          status: this.state.detail.lost_status,
          name: this.state.detail.lost_name,
          phone: this.state.detail.lost_phone,
          item_detail: this.state.detail.lost_detail,
          time: this.state.detail.lost_time,
          place: this.state.detail.lost_place,
          person: this.state.detail.lost_person,
          image: this.state.detail.lost_img,
        });
      } else if (this.props.match.params.status === "2") {
        this.setState({
          status: this.state.detail.found_status,
          name: this.state.detail.found_name,
          phone: this.state.detail.found_phone,
          item_detail: this.state.detail.found_detail,
          time: this.state.detail.found_time,
          place: this.state.detail.found_place,
          person: this.state.detail.found_person,
          image: this.state.detail.found_img,
        });
      } else {
        console.log("oops,something went wrong");
        message.error("oops,好像出错了")
      }
      this.logic();
    });
    
  }

  state = {
    detail: {},
    url1: "",
    url2: "",
    url3: "",
    data:[]
  };
  logic = () => {
    const time = new Date(this.state.time * 1000);
    var year = time.getFullYear() + "年";
    var month = time.getMonth() + 1 + "月";
    var date = time.getDate() + "日";
    var hour = time.getHours() + "时";
    var minute = time.getMinutes() + "分";
    this.setState({
      time: [year, month, date, hour, minute].join("--"),
    });
    // // 展示当下是否领取/未领取
    if (this.state.status === 2) {
      this.setState({
        status: "已领取",
      });
    } else {
      this.setState({
        status: "未领取",
      });
    }
    

   this.setState({
     data:[
      {
        title: "物品名称",
        information: this.state.name,
      },
      {
        title: "联系人",
        information: this.state.person,
      },
      {
        title: "手机号",
        information: this.state.phone,
      },
      {
        title: "丢失时间",
        information: this.state.time,
      },
      {
        title: "物品细节",
        information: this.state.item_detail,
      },
      {
        title: "丢失地点",
        information: this.state.place,
      },
      {
        title: "当前状态",
        information: this.state.status,
      },
    ]
   })
    

    // 这里加的 || "" ,可以避免split导致的报错，我也不知道为什么
    const imgUrl = this.state.image || "";
    // // 这里也是使用的简单的if方法判断，URL里包含了几个图片
    if (imgUrl.length < 31) {
      const url1 = "https://youthapi.sdut.edu.cn" + imgUrl;
      this.setState({
        url1: url1,
      });
    } else if (imgUrl.length < 58 && imgUrl.length > 31) {
      const spil = imgUrl.split("|");
      const url1 = "https://youthapi.sdut.edu.cn" + spil[0];
      const url2 = "https://youthapi.sdut.edu.cn" + spil[1];
      this.setState({ url1: url1, url2: url2 });
    } else if (imgUrl.length > 58) {
      const spil = imgUrl.split("|");
      const url1 = "https://youthapi.sdut.edu.cn" + spil[0];
      const url2 = "https://youthapi.sdut.edu.cn" + spil[1];
      const url3 = "https://youthapi.sdut.edu.cn" + spil[2];
      this.setState({
        url1: url1,
        url2: url2,
        url3: url3,
      });
    } else {
      console.log("some thing went wrong");
    }
  };

  render() {
    return (
      <div> 
        <Button
          type="primary"
          href="#"
          style={{ background: "pink" }}
          icon={<HomeOutlined />}
        >
          返回首页
        </Button>
        {/* 数据展示 */}

        <div className="Result_container">
          <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.information}
                />
              </List.Item>
            )}
          />

          {/* 图片  */}
          <Zmage
            src={this.state.url1}
            style={{ width: "40%", height: "40%" }}
            backdrop="linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(26,94,215,1) 100%)"
            set={[
              {
                src: this.state.url1,
                alt: "First image description",
              },
              {
                src: this.state.url3,
                alt: "仅有一张图片",
              },
              {
                src: this.state.url2,
                alt: "仅有二张图片",
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Result;
