import React from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { PiEyeBold } from "react-icons/pi";

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
      "Employee",
      "Username_" + i.toString(),
      "Password_" + i.toString()
    )
  );
}
function employee_item(
  id,
  name,
  type,
  address,
  phone_num,
  email,
  warehouse_name,
  start_time
) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.address = address;
  this.phone_num = phone_num;
  this.email = email;
  this.warehouse_name = warehouse_name;
  this.start_time = start_time;
}
const employee_dataSource = [];
for (let i = 1; i < 100; i++) {
  employee_dataSource.push(
    new employee_item(
      i,
      "Employee Name " + i.toString(),
      "Manager/Employee",
      "123 ABC Street, State " + i.toString(),
      "0900900900" + i.toString(),
      i.toString() + "@gmail.com",
      "Warehouse" + i.toString(),
      "00:00:00 12/11/2023"
    )
  );
}
function manager_item(
  id,
  name,
  type,
  address,
  phone_num,
  email,
  warehouse_name,
  start_time
) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.address = address;
  this.phone_num = phone_num;
  this.email = email;
  this.warehouse_name = warehouse_name;
  this.start_time = start_time;
}
const manager_dataSource = [];
for (let i = 1; i < 100; i++) {
  manager_dataSource.push(
    new manager_item(
      i,
      "Manager Name " + i.toString(),
      "Manager",
      "123 ABC Street, State " + i.toString(),
      "0900900900" + i.toString(),
      i.toString() + "@gmail.com",
      "Warehouse" + i.toString(),
      "00:00:00 12/11/2023"
    )
  );
}
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
    title: "ID",
    fixed: "left",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Full Name",
    width: 250,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "6",
    width: 180,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "6",
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
    width: 300,
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
    width: 300,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
    render: () => <ActionBar numActions={"edt_del"} />,
  },
];

const staff_employee = (
  <div
    style={{
      maxWidth: "80%",
      width: "100%",
      minWidth: "90%",
    }}
  >
    <ToolBar type={2} page={"employee"}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "80vw" }}
      columns={employee_columns}
      dataSource={employee_dataSource}
      pagination={{
        showQuickJumper: true,
        total: employee_dataSource.length,
      }}
      scroll={{
        x: 2000,
      }}
    />
  </div>
);
const staff_manager = (
  <div
    style={{
      maxWidth: "80%",
      width: "100%",
      minWidth: "90%",
    }}
  >
    <ToolBar type={2} page={"employee"}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "80vw" }}
      columns={employee_columns}
      dataSource={manager_dataSource}
      pagination={{
        showQuickJumper: true,
        total: manager_dataSource.length,
      }}
      scroll={{
        x: 2000,
      }}
    />
  </div>
);

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
