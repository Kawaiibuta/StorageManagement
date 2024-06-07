import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: {
      allEmployees: null,
      allEmployeesIncludeDelete: null,
      isFetching: false,
      error: false,
    },
    manager: {
      allManagers: null,
      isFetching: false,
      error: false,
      msg: null,
    },
    staff: {
      allStaffs: null,
      isFetching: false,
      error: false,
      success: false,
      message: "",
    },
    user: {
      allUsers: null,
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getEmployeesStart: (state) => {
      state.employee.isFetching = true;
    },
    getEmployeesSuccess: (state, action) => {
      state.employee.isFetching = false;
      state.employee.allEmployees = action.payload;
      state.employee.error = false;
    },
    getEmployeesError: (state) => {
      state.employee.isFetching = false;
      state.employee.error = true;
    },
    getManagersStart: (state) => {
      state.manager.isFetching = true;
    },
    getManagersSuccess: (state, action) => {
      state.manager.isFetching = false;
      state.manager.allManagers = action.payload;
      state.manager.error = false;
    },
    getManagersError: (state, action) => {
      state.manager.isFetching = false;
      state.manager.error = true;
      state.manager.msg = action.payload;
    },
    getStaffsStart: (state) => {
      state.staff.isFetching = true;
    },
    getStaffsSuccess: (state, action) => {
      state.staff.isFetching = false;
      state.staff.allStaffs = action.payload;
      state.staff.error = false;
    },
    getStaffsError: (state) => {
      state.staff.isFetching = false;
      state.staff.error = true;
    },
    addStaffStart: (state) => {
      state.staff.isFetching = true;
    },
    addStaffSuccess: (state) => {
      state.staff.isFetching = false;
      state.staff.error = false;
      state.staff.success = true;
      // state.staff.message = action.payload;
    },
    addStaffFailed: (state, action) => {
      state.staff.isFetching = false;
      state.staff.error = true;
      state.staff.success = false;
      state.staff.message = action.payload;
    },
    getAllUsersStart: (state) => {
      state.user.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.error = false;
      state.user.success = true;
      state.user.allUsers = action.payload;
    },
    getAllUsersFailed: (state) => {
      state.user.isFetching = false;
      state.user.error = true;
      state.user.success = false;
    },
    getEmployeesIncludeDeleteStart: (state) => {
      state.employee.isFetching = true;
    },
    getEmployeesIncludeDeleteSuccess: (state, action) => {
      state.employee.isFetching = false;
      state.employee.allEmployeesIncludeDelete = action.payload;
      state.employee.error = false;
    },
  },
});

export const {
  getAllUsersFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getEmployeesError,
  getEmployeesStart,
  getEmployeesSuccess,
  getManagersStart,
  getManagersSuccess,
  getManagersError,
  addStaffFailed,
  addStaffStart,
  addStaffSuccess,
  getStaffsError,
  getStaffsStart,
  getStaffsSuccess,
  getEmployeesIncludeDeleteStart,
  getEmployeesIncludeDeleteSuccess,
} = employeeSlice.actions;

export default employeeSlice.reducer;
