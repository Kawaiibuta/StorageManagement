import React from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";

function partner_item(id, name, address, phone_num, email) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.phone_num = phone_num;
  this.email = email;
}
const supplier_dataSource = [];
for (let i = 1; i < 100; i++) {
  supplier_dataSource.push(
    new partner_item(
      i,
      "Supplier " + i.toString(),
      "123 ABC Street, State " + i.toString(),
      "0900" + i.toString(),
      i.toString() + "@gmail.com"
    )
  );
}
const customer_dataSource = [];
for (let i = 1; i < 100; i++) {
  customer_dataSource.push(
    new partner_item(
      i,
      "Customer " + i.toString(),
      "123 ABC Street, State " + i.toString(),
      "0900" + i.toString(),
      i.toString() + "@gmail.com"
    )
  );
}

const partner_columns = [
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
    title: "Address",
    dataIndex: "address",
    key: "6",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_num",
    key: "phone_num",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
    render: () => <ActionBar numActions={"edt_del"} />,
  },
];

const supplier = (
  <div style={{ maxWidth: "1800px", width: "100%", minWidth: "90%" }}>
    <ToolBar type={2}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "100%" }}
      columns={partner_columns}
      dataSource={supplier_dataSource}
      pagination={{
        showQuickJumper: true,
        total: supplier_dataSource.length,
      }}
      scroll={{
        x: 1800,
      }}
    />
  </div>
);
const customer = (
  <div style={{ maxWidth: "1800px", width: "100%", minWidth: "90%" }}>
    <ToolBar type={2}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "100%" }}
      columns={partner_columns}
      dataSource={customer_dataSource}
      pagination={{
        showQuickJumper: true,
        total: customer_dataSource.length,
      }}
      scroll={{
        x: 1800,
      }}
    />
  </div>
);

function Partner() {
  return (
    <div>
      <TabView
        tabs={[
          { name: "Supplier", content: supplier },
          { name: "Customer", content: customer },
        ]}
      />
    </div>
  );
}

export default Partner;
