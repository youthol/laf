import React, { Component } from 'react';
import LoginForm from './Components/LoginForm';
import {postLogin} from '../../api/login'
import moment from 'moment';
import {checkLogin} from '../../utils/auth'
import {Layout,message} from 'antd'
const { Header } = Layout;
class Login extends Component {

componentDidMount(){
  if (checkLogin() === 1) {
    console.log("has login");
    this.props.history.push('/manage');
  }
}




    /**
   * @description 处理提交事件
   * @param {*} e
   */
    handleSubmit = values => {
        this.postUserLogin(values);
      };

    postUserLogin= async value =>{
        if(!value) return ;
        const rowData = await postLogin (value)
        if ( !rowData ) {
          message.error('服务器错误，请检查网络是否正常！');
          return;
        }
        const { key } = rowData;
        const expires_at = moment()
        .add(3600, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
        sessionStorage.clear();
        sessionStorage.setItem('token', key);
        sessionStorage.setItem('expires_at', expires_at);
        this.props.history.push('/manage');
    }


    render() {
        return (
    
            <Layout>
          <Header className="Header">
            <h1 className="page-title">
              <span>管理员登陆</span>
            </h1>
          </Header>
            <LoginForm form={this}  handleSubmit={this.handleSubmit}  />
          </Layout>

        );
      }
}


export default Login