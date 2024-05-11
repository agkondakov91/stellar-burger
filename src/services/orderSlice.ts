import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '@api';

import { TOrder, TOrdersData } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFetchFeeds = createAsyncThunk(
  'order/getFetchFeeds',
  getFeedsApi
);

export const getFetchOrders = createAsyncThunk(
  'order/getFetchOrders',
  getOrdersApi
);

export const getFetchBurger = createAsyncThunk(
  'order/getFetchBurger',
  orderBurgerApi
);

export const getFetchOrderByNumber = createAsyncThunk(
  'order/getFetchOrderByNumber',
  getOrderByNumberApi
);

type TOrderState = {
  feed: TOrdersData | null;
  orderData: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  feed: null,
  orderData: [],
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderData = action.payload.orders;
        state.feed = action.payload;
        state.orderRequest = false;
      })
      .addCase(getFetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getFetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(getFetchBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getFetchBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.orderRequest = false;
      })
      .addCase(getFetchBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getFetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderModalData = action.payload.orders[0];
      });
  }
});

export const reducerOrder = orderSlice.reducer;
export const { orderReset } = orderSlice.actions;
