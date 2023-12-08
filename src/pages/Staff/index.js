import React, { useState, useEffect } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { PiEyeBold } from "react-icons/pi";
import axios from "axios";
import { getAllEmployees, getAllWarehouses } from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";

function user_item(id, employee_name, role, user_name, password) {
  this.id = id;
  this.employee_name = employee_name;
  this.role = role;
  this.user_name = user_name;
  this.password = password;
}
const user_dataSource = [];
for (let i = 1; i < 100; i++) {
  user_dataSource.push(
    new user_item(
      i,
      "Employee Name " + i.toString(),
      "Manager/Employee",
      "Username_" + i.toString(),
      "Password_" + i.toString()
    )
  );
}
console.log(user_dataSource);

const user_columns = [
  {
    title: "ID",
    fixed: "left",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Employee",
    dataIndex: "employee_name",
    key: "employee_name",
    fixed: "left",
    width: 250,
  },
  {
    title: "Role",
    width: 200,
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Username",
    dataIndex: "user_name",
    key: "user_name",
    width: 200,
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
    width: 200,
  },
  {
    render: () => (
      <div>
        <a>{<PiEyeBold />}</a>
      </div>
    ),
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
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
    title: "Employee Type",
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

const staff_user = (
  <div style={{ maxWidth: "80%", width: "100%", minWidth: "90%" }}>
    <ToolBar type={2} page={"user"}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "100%" }}
      columns={user_columns}
      dataSource={user_dataSource}
      pagination={{
        showQuickJumper: true,
        total: user_dataSource.length,
      }}
      scroll={{
        x: 1659,
      }}
    />
  </div>
);

function Staff() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (state) => state.employee.employee?.allEmployees
  );
  console.log("employee", employeeList);

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

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
          { name: "User", content: staff_user },
        ]}
      />
    </div>
  );
}

export default Staff;
