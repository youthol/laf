import http from '../utils/http';

export const getItems = (id,params = {}) => {
  return http.get(`/getdata/${id}`, params);
};

// 删除数据，管理员
export const deleteItem = (id,status, params = {}) => {
  return http.post(`/deletedata/${id}/${status}`, params);;
};

// 更新状态，管理员
export const updatestatus = (id,status, params = {}) => {
  return http.post(`/updatestatus/${status}?id=${id}&status=2&checkUser=${params.checkUser}&checkPhone=${params.checkPhone}`);
 
};

// search
export const search = (status, params = {}) => {
    return http.post(`/searchdata/${status}`, params) ;
};

// 上传数据
export const upload = (id,params = {}) => {
  return http.post(`/insertdata/${id}`, params);
};
// 获取单条数据，以查看详情
export const getItemById = (id,params = {}) => {
  return http.post(`/searchdata/${id}?searchId=${params.searchId}`);
};
