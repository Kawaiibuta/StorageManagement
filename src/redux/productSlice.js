import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "./apiRequest";

const productSlice = createSlice({
  name: "product",
  initialState: {
    goodsList: {
      allProducts: null,
      allProductsIncludeDelete: null,
      isFetching: false,
      allOutbounds: null,
    },
    category: {
      allCategory: null,
      isFetching: false,
    },
    outbound: {
      allOutbounds: null,
      isFetching: false,
    },
    inbound: {
      allInBounds: null,
      isFetching: false,
    },
    order: {
      allOrder: null,
      isFetching: false,
    },
  },
  reducers: {
    getProductsStart: (state) => {
      state.goodsList.isFetching = true;
    },
    getProductsSuccess: (state, action) => {
      state.goodsList.isFetching = false;
      state.goodsList.allProducts = action.payload;
    },

    getCategoryStart: (state) => {
      state.category.isFetching = true;
    },
    getCategorySuccess: (state, action) => {
      state.category.allCategory = action.payload;
      state.category.isFetching = false;
    },
    getOutboundsStart: (state) => {
      state.outbound.isFetching = true;
    },
    getOutboundsSuccess: (state, action) => {
      state.outbound.isFetching = false;
      state.outbound.allOutbounds = action.payload;
    },
    getInboundsStart: (state) => {
      state.inbound.isFetching = true;
    },
    getInboundsSuccess: (state, action) => {
      state.inbound.isFetching = false;
      state.inbound.allInBounds = action.payload;
    },
    getProductsIncludeDeleteStart: (state) => {
      state.goodsList.isFetching = true;
    },
    getProductsIncludeDeleteSuccess: (state, action) => {
      state.goodsList.isFetching = false;
      state.goodsList.allProductsIncludeDelete = action.payload;
    },
    getOrdersStart: (state) => {
      state.order.isFetching = true;
    },
    getOrdersSuccess: (state, action) => {
      state.order.isFetching = false;
      state.order.allOrder = action.payload;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getOutboundsStart,
  getOutboundsSuccess,
  getInboundsStart,
  getInboundsSuccess,
  getProductsIncludeDeleteStart,
  getProductsIncludeDeleteSuccess,
  getOrdersStart,
  getOrdersSuccess,
  getCategoryStart,
  getCategorySuccess,
} = productSlice.actions;

export default productSlice.reducer;
