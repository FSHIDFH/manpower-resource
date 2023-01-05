import Cookies from "js-cookie";

const TokenKey = "hrsaas-ihrm-token";
// 设定一个独一无二的key，ihrm也有国际人力资源管理的意思

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
