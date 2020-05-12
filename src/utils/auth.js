import moment from 'moment';
//import store from '../store';

/**
 * @description 检查是否登录
 * @returns 1正常; 2过期; 3未登录
 */
export const checkLogin = () => {
  const { token, expires_at } = sessionStorage;
  if (token && moment().isBefore(expires_at)) {
    return 1;
  } else if (token && moment().isAfter(expires_at)) {
    return 2;
  } else {
    return 3;
  }
};



/**
 * @description 检查是否有相应权限
 * @param {*} perms 权限数组
 * @returns true:有权限; false:无权限
 */
export const checkPermission = perms => {
  let currentStatus  = checkLogin();
  if (!perms) return false;
  let hasPermission = false;
    if ( currentStatus === 1 ) {
      hasPermission = true;
  }
  return hasPermission;
};