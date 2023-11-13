import React from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";

function outbound_item(
  id,
  order_timestamp,
  finish_timestamp,
  status,
  employee_name
) {
  this.id = id;
  this.order_timestamp = order_timestamp;
  this.finish_timestamp = finish_timestamp;
  this.status = status;
  this.employee_name = employee_name;
}
const outbound_dataSource = [];
for (let i = 1; i < 100; i++) {
  outbound_dataSource.push(
    new outbound_item(
      i,
      "2023-11-11 00:00:00",
      "2023-11-11 23:59:59",
      "Order/Delivery/Done",
      "Employee " + i.toString()
    )
  );
}

const outbound_columns = [
  {
    title: "ID",
    fixed: "left",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Order at",
    dataIndex: "order_timestamp",
    key: "order_timestamp",
    width: 300,
  },
  {
    title: "Finish at",
    dataIndex: "finish_timestamp",
    key: "finish_timestamp",
    width: 300,
  },
  {
    title: "Employee",
    dataIndex: "employee_name",
    key: "employee_name",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 230,
    render: () => <ActionBar numActions={"bound"} />,
  },
];

const all = (
  <div style={{ maxWidth: "1800px", width: "100%", minWidth: "90%" }}>
    <ToolBar type={2}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "100%" }}
      columns={outbound_columns}
      dataSource={outbound_dataSource}
      pagination={{
        showQuickJumper: true,
        total: outbound_dataSource.length,
      }}
      scroll={{
        x: 1659,
      }}
    />
  </div>
);
const order = "In order";
const delivery = "In delivery";
const done = "Done";

function Outbound() {
  return (
    <div>
      <TabView
        tabs={[
          { name: "ALL", content: all },
          { name: "Order", content: order },
          { name: "Delivery", content: delivery },
          { name: "Done", content: done },
        ]}
      />
    </div>
  );
}

export default Outbound;
