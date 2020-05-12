import axios from './axios'


export default {
  get(url, params, headers) {
    let options = {};
    if (params) {
      options.params = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return axios.get(url, options);
  },
  post(url, data, params, headers) {
    let options = {};
    if (params) {
      options.params = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return axios.post(url, data, options);
  },

}