/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table, Tabs, Tag, Tooltip } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { PiEyeBold } from "react-icons/pi";
import {
  getAllProductsIncludeDelete,
  getGoodsListByWarehouseId,
  getInventoryReport,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane.js";
import inventoryIcon from "../../assets/images/inventory_icon.png";
import inventoryIconActive from "../../assets/images/inventory_icon_active.png";
import invenReportIcon from "../../assets/images/inventory_report_icon.png";
import invenReportIconActive from "../../assets/images/inventory_report_icon_active.png";
import CustomTable from "../../components/Table/index.js";
import dayjs from "dayjs";
import { RiPrinterLine } from "react-icons/ri";
import InventoryReport from "../../components/Form/InventoryReport.js";
import InBoundBill from "../../components/Form/InBoundBill.js";
import InventoryReportBill from "../../components/Form/InventoryReportBill.js";

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

function Inventory() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );
  const userWarehouseId = user.employeeId.warehouseId;
  const dispatch = useDispatch();
  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const viewInventoryReport = (record) => {
    setFormData(record);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onUpdateData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const report_columns = [
    {
      title: "Code",

      dataIndex: "code",
      width: 150,
      key: "code",
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,

      render: (status) => {
        let color;
        if (status === "Waiting") color = "geekblue";
        else if (status === "Approved") color = "green";
        else {
          color = "red";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
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
      width: 150,
      render: (_, record) => {
        return (
          <>
            <Tooltip key="view" title="View">
              <a
                onClick={() => {
                  viewInventoryReport(record);
                }}
              >
                {<PiEyeBold size={24} color="#85dcea" />}
              </a>
            </Tooltip>
            <Tooltip key="print" title="Print">
              <a>{<RiPrinterLine size={24} color="#1ba79b" />}</a>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const inventory_report = (
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"report"}></ToolBar>
      <InventoryReport
        isModalOpen={isModalOpen}
        handleCancelButton={handleCancel}
        handleOkButton={handleOk}
        onUpdateData={onUpdateData}
        formData={formData}
      ></InventoryReport>
      <CustomTable
        columns={report_columns}
        dataSource={dataSource?.map((report) => {
          let status;
          if (report.isApproved === true) {
            status = "Approved";
          } else if (report.isApproved === false) {
            status = "Reject";
          } else {
            status = "Waiting";
          }
          return {
            key: report._id,
            code: report.code,
            status: status,
            totalActualQuantity: report.totalActualQuantity,
            totalDiffQuantity: report.totalDiffQuantity,
            increaseQuantity: report.increaseQuantity,
            decreaseQuantity: report.decreaseQuantity,
            createdAt: dayjs(report.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            updatedAt: dayjs(report.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
            reportDetails: report.reportDetails,
          };
        })}
        isFetching={isFetching}
      />
      {/* <Table
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
      /> */}
    </div>
  );

  const inventory_columns = [
    {
      title: "SKU",
      width: 110,
      dataIndex: "sku_code",
      key: "sku_code",
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Full Name",
      width: 200,
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      sorter: (a, b) => a.maximum_quantity - b.maximum_quantity,
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 170,
      render: (text, _) => (
        <img src={text} style={{ width: "70px" }} alt="product"></img>
      ),
    },
  ];

  const inventory_product = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={1}></ToolBar>
      <CustomTable
        isFetching={isFetching}
        columns={inventory_columns}
        dataSource={goodsList?.map((goods) => {
          return {
            key: goods?._id,
            name: goods.name,
            sku_code: goods.skuCode,
            quantity: goods.quantity,
            image: goods.imageUrl,
          };
        })}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await getInventoryReport(userWarehouseId);
        getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllProductsIncludeDelete(dispatch);
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
