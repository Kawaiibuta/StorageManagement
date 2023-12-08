import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeeReducer from "./employeeSlice";
import warehouseReducer from "./warehouseSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    warehouse: warehouseReducer,
  },
});
