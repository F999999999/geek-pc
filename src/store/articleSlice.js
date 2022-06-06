import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";

// 获取频道数据
export const getChannels = createAsyncThunk("article/getChannel", async () => {
  return await http.get("channels");
});

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
    [getChannels.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
    },
  },
});

export default articleReducer;
