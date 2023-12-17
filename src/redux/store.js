import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeeReducer from "./employeeSlice";
import warehouseReducer from "./warehouseSlice";
import partnerReducer from "./partnerSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    warehouse: warehouseReducer,
    partner: partnerReducer,
  },
});
