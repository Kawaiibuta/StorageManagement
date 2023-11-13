import React from "react";
import TabView from "../../components/Button Header/TabView";
import { Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { PiEyeBold } from "react-icons/pi";

function good_item(
  id,
  name,
  sku_code,
  supplier_name,
  price,
  unit,
  image,
  specification,
  warehouse_name
) {
  this.id = id;
  this.name = name;
  this.sku_code = sku_code;
  this.supplier_name = supplier_name;
  this.price = price;
  this.unit = unit;
  this.image = image;
  this.specification = specification;
  this.warehouse_name = warehouse_name;
}
const good_dataSource = [];
for (let i = 1; i < 100; i++) {
  good_dataSource.push(
    new good_item(
      i,
      "Product Name " + i.toString(),
      "A00000" + i.toString(),
      "Supplier" + i.toString(),
      "300.000",
      "Box",
      "image link",
      "x:30cm y:20cm z:10cm",
      "Warehouse" + i.toString()
    )
  );
}

const good_columns = [
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
    title: "SKU",
    width: 200,
    dataIndex: "sku_code",
    key: "sku_code",
  },
  {
    title: "Supplier",
    dataIndex: "supplier_name",
    key: "supplier_name",
    width: 200,
    sorter: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 200,
    sorter: true,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    width: 200,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 200,
    render: () => (
      <div>
        <a>{<PiEyeBold />}</a>
      </div>
    ),
  },
  {
    title: "Specification",
    dataIndex: "specification",
    key: "specification",
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse_name",
    key: "warehouse_name",
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

const goodslist = (
  <div
    style={{
      maxWidth: "1800px",
      width: "100%",
      minWidth: "90%",
    }}
  >
    <ToolBar type={2}></ToolBar>
    <Table
      style={{ marginTop: "10px", maxWidth: "100%" }}
      columns={good_columns}
      dataSource={good_dataSource}
      pagination={{
        showQuickJumper: true,
        total: good_dataSource.length,
      }}
      scroll={{
        x: 2000,
      }}
    />
  </div>
);
function GoodsList() {
  return (
    <div style={{ width: "100%" }}>
      <TabView tabs={[{ name: "Goods List", content: goodslist }]} />
    </div>
  );
}

export default GoodsList;
