import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenByLocalStorage, http, setTokenByLocalStorage } from "@/utils";

// 登录
export const login = createAsyncThunk("user/login", async (payload) => {
  return await http.post("/authorizations", payload);
});

// slice 名称
export const USER_FEATURE_KEY = "user";

// 属性的初始值
const initialState = {
  token: getTokenByLocalStorage() || "",
};

export const { actions, reducer: userReducer } = createSlice({
  // name 属性用于指定 slice 的名称, 用于区分不同的 slice
  name: USER_FEATURE_KEY,
  // initialState 属性用于指定初始状态, 可以是一个函数, 在函数中可以访问到其他 slice 的 state
  initialState,
  // reducers 属性用于指定 slice 的 reducer 函数, 用于处理 action, 可以是一个函数, 在函数中可以访问到其他 slice 的 state
  reducers: {
    // 设置 token
    setToken: (state, action) => {
      // 保存 token 到 localStorage
      setTokenByLocalStorage(action.payload);
      // 更新 state
      state.token = action.payload;
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
  },
});

// actions: 对象类型，用于存储 action creator 函数
// { setToken: (payload) => ({ type: "user/setToken", payload }) }
export const { setToken } = actions;

export default userReducer;
