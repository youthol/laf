import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import md5 from 'md5'
import { Component } from 'react';
import './style.scss'
export default class LoginForm extends Component{
    // constructor(props){
    //   super(props)
    // }
  
    render(){
        // onSubmit在antd4.x已弃用，由onFinish替代
      const onFinish = values => {
        values.pass=md5(values.pass)
        this.props.form.handleSubmit(values)
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
      return (
        <Form
        className="login-form"
        //   {...layout}
          name="basic"
          initialValues={{remember: true, }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input   placeholder="UserName"
            prefix={<UserOutlined className="site-form-item-icon"
             />}
             />
          </Form.Item>
    
          <Form.Item
            name="pass"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            
          >
            <Input.Password placeholder="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
    
    
          <Form.Item 
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </Form.Item>
        </Form>
      );
    }
} 

LoginForm.propTypes = {
    title: PropTypes.string,
    form: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };


