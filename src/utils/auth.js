const TOKEN_KEY = "geek_pc";

// 获取token
const getTokenByLocalStorage = () => localStorage.getItem(TOKEN_KEY);
// 存储token
const setTokenByLocalStorage = (token) =>
  localStorage.setItem(TOKEN_KEY, token);
// 清除token
const clearTokenByLocalStorage = () => localStorage.removeItem(TOKEN_KEY);

export {
  getTokenByLocalStorage,
  setTokenByLocalStorage,
  clearTokenByLocalStorage,
};
