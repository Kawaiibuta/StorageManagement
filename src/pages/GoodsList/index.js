import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { AudioOutlined } from "@ant-design/icons";
import TabView from "../../components/Button Header/TabView";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
function good(
  id,
  name,
  sku_code,
  description,
  price,
  unit,
  image,
  specification
) {
  this.id = id;
  this.name = name;
  this.sku_code = sku_code;
  this.description = description;
  this.price = price;
  this.unit = unit;
  this.image = image;
  this.specification = specification;
}
const dataSource = [];
for (let i = 1; i < 100; i++) {
  dataSource.push(
    new good(
      i,
      "Name_" + i.toString(),
      "A00000" + i.toString(),
      "A small yellow box",
      "300.000",
      "Box",
      "image link",
      "x:30cm y:20cm z:10cm"
    )
  );
}

const columns = [
  {
    title: "ID",
    width: 100,
    dataIndex: "id",
    key: "id",
    fixed: "left",
  },
  {
    title: "Full Name",
    width: 200,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "SKU",
    width: 100,
    dataIndex: "sku_code",
    key: "1",
  },
  {
    title: "Description",
    width: 400,
    dataIndex: "description",
    key: "2",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "3",
    width: 100,
    sorter: true,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "4",
    width: 100,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "5",
    width: 100,
  },
  {
    title: "Specification",
    dataIndex: "specification",
    fixed: "left",
    key: "6",
    width: 300,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 250,
    render: () => <ActionBar numActions={5} />,
  },
];

const goodslist = (
  <div style={{ marginLeft: "0px" }}>
    <ToolBar type={1}></ToolBar>
    <Table
      style={{ marginTop: "10px" }}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        showQuickJumper: true,
        total: dataSource.length,
      }}
      scroll={{
        x: 1300,
      }}
    />
  </div>
);
function GoodsList() {
  return (
    <div style={{ padding: 0 }}>
      <TabView
        tabs={[{ name: "Goods List", content: goodslist, padding: "0px" }]}
      />
    </div>
  );
}

export default GoodsList;
