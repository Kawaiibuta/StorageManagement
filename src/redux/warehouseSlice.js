import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouse: {
      allWarehouses: null,
      isFetching: false,
      error: false,
    },
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
  },
});

export const {
  getAllWarehouseError,
  getAllWarehouseStart,
  getAllWarehouseSuccess,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
