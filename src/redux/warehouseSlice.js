import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouse: {
      allWarehouses: null,
      isFetching: false,
      error: false,
      transfers: null,
    },
    msg: "",
  },
  reducers: {
    getAllWarehouseStart: (state) => {
      state.warehouse.isFetching = true;
    },

    getAllWarehouseSuccess: (state, action) => {
      state.warehouse.isFetching = false;
      state.warehouse.allWarehouses = action.payload;
      state.warehouse.error = false;
    },
    getAllWarehouseError: (state) => {
      state.warehouse.isFetching = false;
      state.warehouse.error = true;
    },
    deleteWarehouseStart: (state) => {
      state.warehouse.isFetching = true;
    },
    deleteWarehouseSuccess: (state, action) => {
      state.warehouse.isFetching = false;
      state.warehouse.error = false;
      state.msg = action.payload;
    },
    deleteWarehouseError: (state, action) => {
      state.warehouse.isFetching = false;
      state.warehouse.error = true;
      state.msg = action.payload;
    },
    editWarehouseStart: (state) => {
      state.warehouse.isFetching = true;
    },
    editWarehouseSuccess: (state, action) => {
      state.warehouse.isFetching = false;
      state.warehouse.error = false;
      state.msg = action.payload;
    },
    editWarehouseError: (state, action) => {
      state.warehouse.isFetching = false;
      state.warehouse.error = true;
      state.msg = action.payload;
    },
    getAllTransferStart: (state) => {
      state.warehouse.isFetching = true;
    },
    getAllTransferSuccess: (state, action) => {
      state.warehouse.isFetching = false;
      state.warehouse.transfers = action.payload;
    },
  },
});

export const {
  getAllWarehouseError,
  getAllWarehouseStart,
  getAllWarehouseSuccess,
  deleteWarehouseError,
  deleteWarehouseStart,
  deleteWarehouseSuccess,
  editWarehouseError,
  editWarehouseStart,
  editWarehouseSuccess,
  getAllTransferStart,
  getAllTransferSuccess,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
