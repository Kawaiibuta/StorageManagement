import React from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";

function warehouse(id, name, address, capacity, contact_info, description) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.capacity = capacity;
  this.contact_info = contact_info;
  this.description = description;
}
const dataSource = [];
for (let i = 1; i < 100; i++) {
  dataSource.push(
    new warehouse(
      i,
      "Warehouse " + i.toString(),
      "123 ABC Street, State " + i.toString(),
      (i * 100).toString(),
      "0900" + i.toString(),
      "This is the description for warehouse"
    )
  );
}

const columns = [
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
    key: "address",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
    width: 200,
  },
  {
    title: "Contact",
    dataIndex: "contact_info",
    key: "contact_info",
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 120,
    render: () => <ActionBar numActions={"edt_del"} />,
  },
];
const warehouseinter = (
  <div style={{ maxWidth: "80%", width: "100%", minWidth: "90%" }}>
    <ToolBar type={2} page={"warehouseinter"}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "80vw" }}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        showQuickJumper: true,
        total: dataSource.length,
      }}
      scroll={{
        x: 2000,
      }}
    />
  </div>
);

function WarehouseInterconnection() {
  return (
    <div>
      <TabView
        style={{ backgroundColor: "red" }}
        tabs={[{ name: "Warehouse Interconnection", content: warehouseinter }]}
      />
    </div>
  );
}

export default WarehouseInterconnection;
