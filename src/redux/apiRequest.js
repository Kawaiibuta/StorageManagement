import axios from "axios";
import { loginError, loginStart, loginSuccess } from "./authSlice";
import {
  addStaffFailed,
  addStaffStart,
  addStaffSuccess,
  getEmployeesError,
  getEmployeesStart,
  getEmployeesSuccess,
  getManagersError,
  getManagersStart,
  getManagersSuccess,
} from "./employeeSlice";
import {
  getAllWarehouseError,
  getAllWarehouseStart,
  getAllWarehouseSuccess,
} from "./warehouseSlice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://warehousemanagement.onrender.com/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    // navigate("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch(loginError());
  }
};

export const onGetAllManagers = async (dispatch) => {
  dispatch(getManagersStart());
  try {
    const res = await axios.get(
      "https://warehousemanagement.onrender.com/api/employee/manager"
    );
    dispatch(getManagersSuccess(res.data));
  } catch (e) {
    console.log(e);
    dispatch(getManagersError());
  }
};

export const getAllWarehouses = async (dispatch) => {
  dispatch(getAllWarehouseStart());
  try {
    const res = await axios.get(
      "https://warehousemanagement.onrender.com/api/warehouse"
    );
    dispatch(getAllWarehouseSuccess(res.data));
  } catch (e) {
    console.log(e);
    dispatch(getAllWarehouseError());
  }
};

export const addStaff = async (dispatch, staff) => {
  dispatch(addStaffStart());
  try {
    const res = await axios.post(
      "https://warehousemanagement.onrender.com/api/employee",

      staff
    );
    dispatch(addStaffSuccess());
  } catch (e) {
    console.log(e);
    dispatch(addStaffFailed(e.response.data));
  }
};

export const getAllEmployees = async (dispatch) => {
  dispatch(getEmployeesStart());
  try {
    const res = await axios.get(
      "https://warehousemanagement.onrender.com/api/employee"
    );
    dispatch(getEmployeesSuccess(res.data));
    // console.log("hihi");
  } catch (e) {
    console.log(e);
    dispatch(getEmployeesError(e.response.data));
  }
};
