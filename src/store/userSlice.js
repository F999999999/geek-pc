import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearTokenByLocalStorage,
  getTokenByLocalStorage,
  http,
  setTokenByLocalStorage,
} from "@/utils";

// 登录
export const login = createAsyncThunk("user/login", async (payload) => {
  return await http.post("/authorizations", payload);
});

// 获取用户信息
export const getUserInfo = createAsyncThunk("user/profile", async (payload) => {
  return await http.get("/user/profile");
});

// slice 名称
export const USER_FEATURE_KEY = "user";

// 属性的初始值
const initialState = {
  token: getTokenByLocalStorage() || "",
  userInfo: {},
};

export const { actions, reducer: userReducer } = createSlice({
  // name 属性用于指定 slice 的名称, 用于区分不同的 slice
  name: USER_FEATURE_KEY,
  // initialState 属性用于指定初始状态, 可以是一个函数, 在函数中可以访问到其他 slice 的 state
  initialState,
  // reducers 属性用于指定 slice 的 reducer 函数, 用于处理 action, 可以是一个函数, 在函数中可以访问到其他 slice 的 state
  reducers: {
    // 清空 token
    clearToken: (state) => {
      // 清空保存在 localStorage 中的 token
      clearTokenByLocalStorage();
      // 清空 state 中的 token
      state.token = "";
    },
  },
  // 通过 extraReducers 配置项处理异步 action
  extraReducers: {
    // 等待
    [login.pending]: (state, action) => {
      console.log("pending", action);
    },
    // 成功
    [login.fulfilled]: (state, action) => {
      console.log("fulfilled", action);
      if (action.payload.token) {
        setTokenByLocalStorage(action.payload.token);
        state.token = action.payload.token;
      }
    },
    // 失败
    [login.rejected]: (state, action) => {
      console.log("rejected", action);
    },
    // 获取用户信息
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// actions: 对象类型，用于存储 action creator 函数
// { setToken: (payload) => ({ type: "user/setToken", payload }) }
export const { clearToken } = actions;

export default userReducer;
