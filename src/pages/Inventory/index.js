import React from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { PiEyeBold } from "react-icons/pi";

function inventory_item(
  product_id,
  product_name,
  product_detail,
  total_quantity,
  onhand,
  inbound_stock,
  outbound_stock
) {
  this.product_id = product_id;
  this.product_name = product_name;
  this.product_detail = product_detail;
  this.total_quantity = total_quantity;
  this.onhand = onhand;
  this.inbound_stock = inbound_stock;
  this.outbound_stock = outbound_stock;
}
const inventory_dataSource = [];
for (let i = 1; i < 100; i++) {
  inventory_dataSource.push(
    new inventory_item(
      i,
      "Product Name " + i.toString(),
      "Link đến Product",
      (i * 6).toString(),
      (i * 3).toString(),
      (i * 2).toString(),
      (i * 1).toString()
    )
  );
}
function report_item(id, employee_name, timestamp) {
  this.id = id;
  this.employee_name = employee_name;
  this.timestamp = timestamp;
}
const report_dataSource = [];
for (let i = 1; i < 100; i++) {
  report_dataSource.push(
    new report_item(i, "Employee Name " + i.toString(), "00:00:00 12/11/2023")
  );
}
const inventory_columns = [
  {
    title: "Product ID",
    fixed: "left",
    dataIndex: "product_id",
    key: "id",
    width: 100,
  },
  {
    title: "Product Name",
    width: 250,
    dataIndex: "product_name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Detail",
    dataIndex: "product_detail",
    key: "product_detail",
    width: 100,
    fixed: "left",
    render: () => (
      <div>
        <a>{<PiEyeBold />}</a>
      </div>
    ),
  },
  {
    title: "Total",
    dataIndex: "total_quantity",
    key: "6",
  },
  {
    title: "On Hand",
    dataIndex: "onhand",
    key: "6",
  },
  {
    title: "Inbound Stock",
    dataIndex: "inbound_stock",
    key: "6",
  },
  {
    title: "Outbound Stock",
    dataIndex: "outbound_stock",
    key: "6",
  },
];
const report_columns = [
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
    key: "6",
    width: 290,
  },
  {
    title: "Create at",
    dataIndex: "timestamp",
    key: "6",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 230,
    render: () => <ActionBar numActions={"report"} />,
  },
];

const inventory_product = (
  <div style={{ maxWidth: "80%", width: "100%", minWidth: "90%" }}>
    <ToolBar type={1}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "80vw" }}
      columns={inventory_columns}
      dataSource={inventory_dataSource}
      pagination={{
        showQuickJumper: true,
        total: inventory_dataSource.length,
      }}
      scroll={{
        x: 1659,
      }}
    />
  </div>
);
const inventory_report = (
  <div
    style={{
      maxWidth: "80%",
      width: "100%",
      minWidth: "90%",
    }}
  >
    <ToolBar type={2} page={"report"}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "80vw" }}
      columns={report_columns}
      dataSource={report_dataSource}
      pagination={{
        showQuickJumper: true,
        total: report_dataSource.length,
      }}
      scroll={{
        x: 1800,
      }}
    />
  </div>
);

function Inventory() {
  return (
    <div>
      <TabView
        tabs={[
          { name: "Inventory", content: inventory_product },
          { name: "Inventory Report", content: inventory_report },
        ]}
      />
    </div>
  );
}

export default Inventory;
