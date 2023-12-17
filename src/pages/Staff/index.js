import React, { useState, useEffect } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import {
  getAllEmployees,
  getAllUsersAccount,
  getAllWarehouses,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
const user_columns = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Employee",
    dataIndex: "employee_name",
    key: "employee_name",
  },
  {
    title: "Role",

    dataIndex: "role",
    key: "role",
  },
  {
    title: "Username",
    dataIndex: "user_name",
    key: "user_name",
  },

  {
    title: "Action",
    key: "operation",
    fixed: "right",

    render: () => <ActionBar numActions={"edt_del"} />,
  },
];
const employee_columns = [
  {
    title: "Code",
    fixed: "left",
    dataIndex: "id",
    key: "id",
    width: 90,
  },
  {
    title: "Full Name",
    width: 200,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "6",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "6",
    width: 150,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_num",
    key: "6",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "6",
    width: 200,
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse_name",
    key: "6",
    width: 200,
  },
  {
    title: "Start Time",
    dataIndex: "start_time",
    key: "6",
    width: 200,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
    render: () => <ActionBar numActions={"edt_del"} />,
  },
];

function Staff() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (state) => state.employee.employee?.allEmployees
  );
  const usersList = useSelector((state) => state.employee.user?.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const staff_user = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"user"}></ToolBar>
      <Table
        bordered
        loading={isFetching}
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={user_columns}
        dataSource={usersList?.map((user, index) => {
          return {
            id: index + 1,
            employee_name: user.employeeId.name,
            role: user.isEmployee ? "Employee" : "Manager",
            user_name: user.username,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: usersList?.length,
        }}
        scroll={{
          y: "60vh",
        }}
      />
    </div>
  );

  const staff_employee = (
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"employee"}></ToolBar>
      <Table
        bordered
        loading={isFetching}
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={employee_columns}
        dataSource={employeeList?.map((employee) => {
          return {
            id: employee.code,
            name: employee.name,
            type: employee.position,
            address: employee.contactId.address,
            phone_num: employee.contactId.phone_num,
            email: employee.contactId.email,
            warehouse_name: employee.warehouseId.name,
            start_time: employee.startDate,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: employeeList?.length,
        }}
        scroll={{
          x: 1800,
          y: "60vh",
        }}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getAllEmployees(dispatch);
        getAllUsersAccount(user.accessToken, dispatch);
        await getAllWarehouses(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  return (
    <div>
      <TabView
        tabs={[
          { name: "Employee", content: staff_employee },
          { name: "Manager", content: staff_manager },
          { name: "User", content: staff_user },
        ]}
      />
    </div>
  );
}

export default Staff;
