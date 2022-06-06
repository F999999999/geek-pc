import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "@/store/reducers/user";
import userReducer, { USER_FEATURE_KEY } from "@/store/userSlice";
import articleReducer, { ARTICLE_FEATURE_KEY } from "@/store/articleSlice";

export const store = configureStore({
  // 是否开启浏览器的 redux 开发者调试工具
  devTools: process.env.NODE_ENV !== "production",
  // reducer 选项用于替换原有的 combineReducers 方法, 用于合并应用中的多个 reducer 函数, 组成最终的 Store 对象
  reducer: {
    [USER_FEATURE_KEY]: userReducer,
    [ARTICLE_FEATURE_KEY]: articleReducer,
  },
});
