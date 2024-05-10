import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '@api';

import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFetchFeeds = createAsyncThunk(
  'order/getFetchFeeds',
  async () => await getFeedsApi()
);

export const getFetchOrders = createAsyncThunk(
  'order/getFetchOrders',
  async () => await getOrdersApi()
);

export const getFetchBurger = createAsyncThunk(
  'order/getFetchBurger',
  async (orderData: string[]) => await orderBurgerApi(orderData)
);

export const getFetchOrderByNumber = createAsyncThunk(
  'order/getFetchOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderState = {
  orderData: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
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
