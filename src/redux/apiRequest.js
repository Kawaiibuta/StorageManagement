import axios from "axios";
import {
  loginError,
  loginStart,
  loginSuccess,
  logoutSuccess,
  logoutStart,
  registerFailed,
  registerStart,
  registerSuccess,
  logoutError,
} from "./authSlice";
import {
  addStaffFailed,
  addStaffStart,
  addStaffSuccess,
  getAllUsersFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getEmployeesError,
  getEmployeesIncludeDeleteStart,
  getEmployeesIncludeDeleteSuccess,
  getEmployeesStart,
  getEmployeesSuccess,
  getManagersError,
  getManagersStart,
  getManagersSuccess,
  getStaffsError,
  getStaffsStart,
  getStaffsSuccess,
} from "./employeeSlice";
import {
  deleteWarehouseStart,
  deleteWarehouseSuccess,
  editWarehouseStart,
  editWarehouseSuccess,
  getAllTransferStart,
  getAllTransferSuccess,
  getAllWarehouseError,
  getAllWarehouseStart,
  getAllWarehouseSuccess,
} from "./warehouseSlice";
import {
  getCustomersStart,
  getCustomersSuccess,
  getPartnersIncludeDeleteStart,
  getPartnersIncludeDeleteSuccess,
  getSuppliersStart,
  getSuppliersSuccess,
} from "./partnerSlice";
import {
  getInboundsStart,
  getInboundsSuccess,
  getOutboundsStart,
  getOutboundsSuccess,
  getProductsIncludeDeleteStart,
  getProductsIncludeDeleteSuccess,
  getProductsStart,
  getProductsSuccess,
} from "./productSlice";

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());

  const res = await axios.post(
    "https://warehousemanagement.onrender.com/api/auth/login",
    user
  );
  dispatch(loginSuccess(res.data));
  // navigate("/dashboard");
};

export const updateReportApproved = async (reportId, data) => {
  const res = await axios.put(
    `https://warehousemanagement.onrender.com/api/report/${reportId}`,
    data
  );

  // navigate("/dashboard");
};

export const logoutUser = async (id, accessToken, dispatch, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(
      "https://warehousemanagement.onrender.com/api/auth/logout",
      id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutError());
  }
  // dispatch(logoutStart());

  // await axiosJWT.post(
  //   "https://warehousemanagement.onrender.com/api/auth/logout",
  //   id,
  //   {
  //     headers: { token: `Bearer ${accessToken}` },
  //   }
  // );
  // dispatch(logoutSuccess());
};

export const registerEmployeeUser = async (
  employeeId,
  dispatch,
  accessToken
) => {
  dispatch(registerStart());

  const res = await axios.post(
    "https://warehousemanagement.onrender.com/api/auth/register",
    employeeId,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
  dispatch(registerSuccess(res.data));
  // navigate("/dashboard");
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

export const getAllEmployeeIncludeDelete = async (dispatch) => {
  dispatch(getEmployeesIncludeDeleteStart());

  const res = await axios.get(
    "https://warehousemanagement.onrender.com/api/employee"
  );

  dispatch(getEmployeesIncludeDeleteSuccess(res.data));
};

export const updateTransfer = async (transferId, data) => {
  const res = await axios.put(
    `https://warehousemanagement.onrender.com/api/transfer/${transferId}`,
    data
  );
};

export const addStaff = async (dispatch, staff) => {
  dispatch(addStaffStart());
  try {
    await axios.post(
      "https://warehousemanagement.onrender.com/api/employee",
      staff
    );
    dispatch(addStaffSuccess());
  } catch (e) {
    console.log(e);
    dispatch(
      addStaffFailed(
        e.response.data instanceof String
          ? e.response.data
          : "Something went wrong!"
      )
    );
  }
};

export const getAllEmployeesByWarehouseId = async (dispatch, warehouseId) => {
  dispatch(getEmployeesStart());
  try {
    const res = await axios.get(
      `https://warehousemanagement.onrender.com/api/employee/staff/byWarehouse/${warehouseId}`
    );
    dispatch(getEmployeesSuccess(res.data));
    // console.log("hihi");
  } catch (e) {
    console.log(e);
    dispatch(
      getEmployeesError(
        e.response.data instanceof String
          ? e.response.data
          : "Something went wrong!"
      )
    );
  }
};

export const getAllStaffs = async (dispatch) => {
  dispatch(getStaffsStart());
  try {
    const res = await axios.get(
      "https://warehousemanagement.onrender.com/api/employee/staff"
    );
    dispatch(getStaffsSuccess(res.data));
    // console.log("hihi");
  } catch (e) {
    console.log(e);
    dispatch(
      getStaffsError(
        e.response.data instanceof String
          ? e.response.data
          : "Something went wrong!"
      )
    );
  }
};

export const updateEmployee = async (employeeId, formData) => {
  await axios.put(
    `https://warehousemanagement.onrender.com/api/employee/${employeeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteEmployee = async (employeeId, accessToken) => {
  await axios.delete(
    `https://warehousemanagement.onrender.com/api/employee/${employeeId}`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
};

export const deleteUser = async (userId) => {
  await axios.delete(
    `https://warehousemanagement.onrender.com/api/user/${userId}`
  );
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

export const getGoodsListByWarehouseId = async (dispatch, warehouseId) => {
  dispatch(getProductsStart());

  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/product/byWarehouse/${warehouseId}`
  );
  dispatch(getProductsSuccess(res.data));
};

export const addProduct = async (formData) => {
  await axios.post(
    `https://warehousemanagement.onrender.com/api/product`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateProduct = async (productId, formData) => {
  await axios.put(
    `https://warehousemanagement.onrender.com/api/product/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteProduct = async (productId) => {
  await axios.delete(
    `https://warehousemanagement.onrender.com/api/product/${productId}`
  );
};

export const addTransaction = async (transactionData) => {
  await axios.post(
    `https://warehousemanagement.onrender.com/api/transaction`,
    transactionData
  );
};

export const getAllOutbound = async (dispatch, warehouseId) => {
  dispatch(getOutboundsStart());

  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/transaction/outbound/byWarehouse/${warehouseId}`
  );

  dispatch(getOutboundsSuccess(res.data));
};

export const updateTransaction = async (transactionId, data) => {
  await axios.put(
    `https://warehousemanagement.onrender.com/api/transaction/${transactionId}`,
    data
  );
};

export const deleteTransaction = async (transactionId) => {
  await axios.delete(
    `https://warehousemanagement.onrender.com/api/transaction/${transactionId}`
  );
};

export const getAllInbound = async (dispatch, warehouseId) => {
  dispatch(getInboundsStart());

  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/transaction/inbound/byWarehouse/${warehouseId}`
  );

  dispatch(getInboundsSuccess(res.data));
};

export const getAllPartnersIncludeDelete = async (dispatch) => {
  dispatch(getPartnersIncludeDeleteStart());
  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/partner/`
  );
  dispatch(getPartnersIncludeDeleteSuccess(res.data));
};

export const getProductById = async (productId) => {
  return await axios.get(
    `https://warehousemanagement.onrender.com/api/product/${productId}`
  );
};

export const addTransfer = async (data) => {
  return await axios.post(
    `https://warehousemanagement.onrender.com/api/transfer`,
    data
  );
};

export const getAllTransfer = async (dispatch) => {
  dispatch(getAllTransferStart());
  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/transfer`
  );
  dispatch(getAllTransferSuccess(res.data));
};

export const getAllProductsIncludeDelete = async (dispatch) => {
  dispatch(getProductsIncludeDeleteStart());
  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/product/`
  );
  dispatch(getProductsIncludeDeleteSuccess(res.data));
};

export const getWarehouseById = async (warehouseId) => {
  return await axios.get(
    `https://warehousemanagement.onrender.com/api/warehouse/${warehouseId}`
  );
};

export const updateStatus = async (transactionId, status) => {
  await axios.put(
    `https://warehousemanagement.onrender.com/api/transaction/status/${transactionId}`,
    status
  );
};

export const getInventoryReport = async (warehouseId) => {
  const res = await axios.get(
    `https://warehousemanagement.onrender.com/api/report/byWarehouse/${warehouseId}`
  );
  return res.data;
};

export const addInventoryReport = async (data) => {
  await axios.post(
    `https://warehousemanagement.onrender.com/api/report/`,
    data
  );
};

// export const deleteUser = async (userId) => {

//   const res = await axios.get(
//     `https://warehousemanagement.onrender.com/api/transaction/inbound`
//   );

//   dispatch(getInboundsSuccess(res.data));
// };
