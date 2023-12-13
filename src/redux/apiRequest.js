import axios from "axios";
import {
  loginError,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  addStaffFailed,
  addStaffStart,
  addStaffSuccess,
  getAllUsersFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getEmployeesError,
  getEmployeesStart,
  getEmployeesSuccess,
  getManagersError,
  getManagersStart,
  getManagersSuccess,
} from "./employeeSlice";
import {
  deleteWarehouseError,
  deleteWarehouseStart,
  deleteWarehouseSuccess,
  editWarehouseStart,
  editWarehouseSuccess,
  getAllWarehouseError,
  getAllWarehouseStart,
  getAllWarehouseSuccess,
} from "./warehouseSlice";
import {
  getCustomersStart,
  getCustomersSuccess,
  getSuppliersStart,
  getSuppliersSuccess,
} from "./partnerSlice";

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

export const registerEmployeeUser = async (employeeId, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "https://warehousemanagement.onrender.com/api/auth/register",
      employeeId
    );
    dispatch(registerSuccess(res.data));
    // navigate("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch(registerFailed());
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
      "https://warehousemanagement.onrender.com/api/employee/staff"
    );
    dispatch(getEmployeesSuccess(res.data));
    // console.log("hihi");
  } catch (e) {
    console.log(e);
    dispatch(getEmployeesError(e.response.data));
  }
};

export const getAllUsersAccount = async (accessToken, dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await axios.get(
      "https://warehousemanagement.onrender.com/api/user",
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getAllUsersSuccess(res.data));
    // console.log("hihi");
  } catch (e) {
    console.log(e);
    dispatch(getAllUsersFailed());
  }
};

export const deleteWarehouse = async (warehouseId, dispatch) => {
  dispatch(deleteWarehouseStart());

  await axios.delete(
    `https://warehousemanagement.onrender.com/api/warehouse/${warehouseId}`
  );
  dispatch(deleteWarehouseSuccess());
};

export const editWarehouse = async (WarehouseId, newWarehouse, dispatch) => {
  dispatch(editWarehouseStart());

  await axios.put(
    `https://warehousemanagement.onrender.com/api/warehouse/${WarehouseId}`,
    newWarehouse
  );
  dispatch(editWarehouseSuccess());
};

export const getAllSupplier = async (dispatch) => {
  dispatch(getSuppliersStart());

  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/partner/supplier`
  );
  dispatch(getSuppliersSuccess(res.data));
};

export const updateSupplier = async (partnerId, newPartner) => {
  await axios.put(
    `https://warehousemanagement.onrender.com/api/partner/${partnerId}`,
    newPartner
  );
};

export const deletePartner = async (partnerId) => {
  await axios.delete(
    `https://warehousemanagement.onrender.com/api/partner/${partnerId}`
  );
};

export const getAllCustomer = async (dispatch) => {
  dispatch(getCustomersStart());

  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/partner/customer`
  );
  dispatch(getCustomersSuccess(res.data));
};
