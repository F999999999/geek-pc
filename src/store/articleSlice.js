import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";

// 获取频道数据
export const getChannels = createAsyncThunk("article/getChannel", async () => {
  return await http.get("channels");
});

// 获取文章列表
export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (payload) => {
    return await http.get("mp/articles", { params: payload });
  }
);

// 删除文章
export const delArticles = createAsyncThunk(
  "article/delArticles",
  async (payload) => {
    return await http.delete("mp/articles/" + payload);
  }
);

// 添加文章
export const addArticle = createAsyncThunk(
  "article/addArticle",
  async (payload) => {
    const draft = !!payload.draft;
    delete payload.draft;
    return http.post(`mp/articles?draft=${draft}`, payload);
  }
);

// 修改文章
export const editArticle = createAsyncThunk(
  "article/editArticle",
  (payload) => {
    const id = payload.id;
    const draft = !!payload.draft;
    delete payload.id;
    delete payload.draft;
    return http.put(`mp/articles/${id}?draft=${draft}`, payload);
  }
);

// 获取文章
export const getArticle = createAsyncThunk("article/getArticle", (payload) => {
  return http.get("mp/articles/" + payload);
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
    // 频道数据
    [getChannels.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
    },
    // 文章列表
    [getArticles.fulfilled]: (state, action) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.per_page;
      state.count = action.payload.total_count;
      state.list = action.payload.results;
    },
  },
});

export default articleReducer;
