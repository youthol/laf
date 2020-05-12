import http from '../utils/http'


// 这里是将data转为对象形式,为用户名和密码，并post出去
export  const postLogin = (data = {}) => {
  return http.post('/login', data);
};

// export const getUserInfo = (params = {}) => {
//   return http.get('/user', params);
// };
