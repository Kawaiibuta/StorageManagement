import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table, Tabs } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { PiEyeBold } from "react-icons/pi";
import {
  getGoodsListByWarehouseId,
  getInventoryReport,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane.js";
import inventoryIcon from "../../assets/images/inventory_icon.png";
import inventoryIconActive from "../../assets/images/inventory_icon_active.png";
import invenReportIcon from "../../assets/images/inventory_report_icon.png";
import invenReportIconActive from "../../assets/images/inventory_report_icon_active.png";

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
    title: "Code",
    fixed: "left",
    dataIndex: "code",
    key: "code",
    width: 150,
  },
  {
    title: "Total Actual Quantity",
    dataIndex: "totalActualQuantity",
    key: "totalActualQuantity",
    width: 200,
  },
  {
    title: "Total Difference Quantity",
    dataIndex: "totalDiffQuantity",
    key: "totalDiffQuantity",
    width: 200,
  },
  {
    title: "Increase Quantity",
    dataIndex: "increaseQuantity",
    key: "increaseQuantity",
    width: 200,
  },
  {
    title: "Decrease Quantity",
    dataIndex: "decreaseQuantity",
    key: "decreaseQuantity",
    width: 200,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
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

function Inventory() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;
  const dispatch = useDispatch();
  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const inventory_report = (
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"report"}></ToolBar>
      <Table
        bordered
        loading={isFetching}
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={report_columns}
        dataSource={dataSource?.map((report) => {
          return {
            key: report._id,
            code: report.code,
            totalActualQuantity: report.totalActualQuantity,
            totalDiffQuantity: report.totalDiffQuantity,
            increaseQuantity: report.increaseQuantity,
            decreaseQuantity: report.decreaseQuantity,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: dataSource?.length,
        }}
        scroll={{
          x: 1800,
        }}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await getInventoryReport(userWarehouseId);
        getGoodsListByWarehouseId(dispatch, userWarehouseId);
        setDataSource(data);
      } catch (e) {
        console.log(e);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [isUpdateData, dispatch, userWarehouseId]);

  console.log("datasource", dataSource);

  const onTabsChange = (key) => {
    console.log(key);
    setCurrentTab(key);
  };

  return (
    <div style={{ margin: "0px 16px" }}>
      <Tabs onChange={onTabsChange} size="large" defaultActiveKey="1">
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={() => setHoveredTab("1")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <img
                src={
                  currentTab === "1" || hoveredTab === "1"
                    ? inventoryIconActive
                    : inventoryIcon
                }
                alt="goodslist"
                style={{ width: "30px", height: "30px" }}
              />
              INVENTORY
            </span>
          }
          key="1"
        >
          {inventory_product}
        </TabPane>
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={() => setHoveredTab("2")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <img
                src={
                  currentTab === "2" || hoveredTab === "2"
                    ? invenReportIconActive
                    : invenReportIcon
                }
                alt="goodslist"
                style={{ width: "30px", height: "30px" }}
              />
              INVENTORY REPORT
            </span>
          }
          key="2"
        >
          {inventory_report}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Inventory;
