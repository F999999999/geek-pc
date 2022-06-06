import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";

// 获取频道数据
export const getChannels = createAsyncThunk("article/getChannel", async () => {
  return await http.get("channels");
});

// 获取内容列表
export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (payload) => {
    return await http.get("mp/articles", { params: payload });
  }
);

// slice 名称
export const ARTICLE_FEATURE_KEY = "article";

// 初始化数据
const initialState = {
  channels: [],
  page: 0,
  pageSize: 0,
  count: 0,
  list: [],
};

export const { reducer: articleReducer } = createSlice({
  name: ARTICLE_FEATURE_KEY,
  initialState,
  reducers: {},
  extraReducers: {
    // 频道数据
    [getChannels.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
    },
    // 内容列表
    [getArticles.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.page = action.payload.page;
      state.pageSize = action.payload.per_page;
      state.count = action.payload.total_count;
      state.list = action.payload.results;
    },
  },
});

export default articleReducer;
