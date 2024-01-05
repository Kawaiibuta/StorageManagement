import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    goodsList: {
      allProducts: null,
      allProductsIncludeDelete: null,
      isFetching: false,
      allOutbounds: null,
    },
    outbound: {
      allOutbounds: null,
      isFetching: false,
    },
    inbound: {
      allInBounds: null,
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
} = productSlice.actions;

export default productSlice.reducer;
