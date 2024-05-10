import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFetchFeeds = createAsyncThunk(
  'feed/getFetchFeeds',
  async () => await getFeedsApi()
);

type TFeedsState = {
  feed: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  feed: null,
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getFetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
        state.error = null;
      });
  }
});

export const reducerFeeds = feedsSlice.reducer;
export const { feedsSelector } = feedsSlice.selectors;
