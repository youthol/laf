import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
const errorHandle = (response, status) => {
  try {
    const { errors } = response.data;
    if (errors) {
      for (let error in errors) {
        if (errors[error] instanceof Array) {
          errors[error].forEach(el => message.error(el));
        }
      }
    } else {
      message.error(response.data.message);
    }
  } catch (e) {
    console.error(e);
  }
};



const instance = axios.create({
  baseURL: 'https://youthapi.sdut.edu.cn/api/laf',
  // withCredentials 表示跨域请求时是否需要使用凭证
  withCredentials: false,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  // 超时; (自动) 暂停;
  // timeout: 3000
});


// 全局的拦截器,网络差或者请求超时的情况
// 以及获取useID时需要Authorization
instance.interceptors.request.use(
  config => {
    const { token } = sessionStorage;
    // 判断是否已经登陆
    if (token) {
      config.data= {
        randKey: token,
        uName: "youth"
      }
    }

    // 对post和get进行处理
    if (config.method === 'post' || config.method === 'put') {
      // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    console.error(error);
    // promise对象弹出错误reject
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response, response.status);
      return Promise.reject(response);
    } else {
      console.error('连接到服务器失败');
    }
  }
);
export default instance