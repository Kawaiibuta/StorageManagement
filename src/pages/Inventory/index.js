/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  ConfigProvider,
  Modal,
  Space,
  Tabs,
  Tag,
  Tooltip,
  message,
} from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";

import { PiEyeBold } from "react-icons/pi";
import {
  getAllProduct,
  updateReportApproved,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane.js";
import { CloseOutlined } from "@ant-design/icons";
import inventoryIcon from "../../assets/images/inventory_icon.png";
import inventoryIconActive from "../../assets/images/inventory_icon_active.png";
import invenReportIcon from "../../assets/images/inventory_report_icon.png";
import { MoreOutlined } from '@ant-design/icons';

import invenReportIconActive from "../../assets/images/inventory_report_icon_active.png";
import CustomTable from "../../components/Table/index.js";
import dayjs from "dayjs";
import { RiPrinterLine } from "react-icons/ri";

import { useReactToPrint } from "react-to-print";
import InventoryReportBillIndividual from "../../components/Form/InventoryReportBillIndividual.js";

const PrintButton = ({ record }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ display: "none" }}>
        <InventoryReportBillIndividual formData={record} ref={componentRef} />
      </div>
      <Tooltip title="Print" key="print">
        {
          <RiPrinterLine
            onClick={() => {
              handlePrint();
            }}
            size={24}
            color="#1ba79b"
          />
        }
      </Tooltip>
    </>
  );
};

const ApprovedAndRejectButton = ({
  title,
  id,
  onUpdateData,
  handleOkButton,
}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            textHoverBg: "white",
            defaultBg:
              title === "REJECT" ? "crimson" : "rgba(156, 188, 235, 1)",
            defaultColor: "white",
            fontWeight: "500",
          },
        },
      }}
    >
      <Button
        onClick={async () => {
          setLoading(true);
          try {
            await updateReportApproved(id, {
              isApproved: title === "REJECT" ? false : true,
            });
            handleOkButton();
            onUpdateData();
            message.success("Update transfer success");
          } catch (e) {
            console.log(e);
            message.error(
              typeof e.response.data === "string"
                ? e.response.data
                : "Something went wrong!"
            );
          }

          setLoading(false);
        }}
        style={{
          padding: "0px 50px",
          marginBottom: "24px",
          width: "200px",
        }}
        type="default"
        size="large"
        loading={loading}
      >
        {title}
      </Button>
    </ConfigProvider>
  );
};

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
    (state) => state.product.goodsList?.allProductsIncludeDelete
  );
  const isManager = user?.employeeId?.position === "Manager";
  const userWarehouseId = user?.employeeId?.warehouseId;
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
            <a
              onClickCapture={() => {
                setFormData(record);
              }}
            >
              <PrintButton key={record._id} record={formData} />
            </a>
          </>
        );
      },
    },
  ];

  const inventory_report = (
    <div
      className="ReportTable"
      style={{
        width: "100%",
      }}
    >
      <ToolBar
        allInventoryReportData={dataSource}
        onUpdateData={onUpdateData}
        type={4}
        page={"report"}
      ></ToolBar>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              titleFontSize: 24,
              headerBg: "rgba(156, 188, 235, 1)",
              paddingLG: 0,
              padding: 0,
            },
          },
        }}
      ></ConfigProvider>
      <Modal
        style={{
          top: 20,
        }}
        title=" &nbsp;"
        width={700}
        footer={
          formData?.status === "Waiting" &&
          isManager && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              {" "}
              <Space>
                <ApprovedAndRejectButton
                  title="REJECT"
                  id={formData?.key}
                  handleOkButton={handleOk}
                  onUpdateData={onUpdateData}
                >
                  Ok
                </ApprovedAndRejectButton>
                <ApprovedAndRejectButton
                  title="APPROVED"
                  id={formData?.key}
                  handleOkButton={handleOk}
                  onUpdateData={onUpdateData}
                >
                  Ok
                </ApprovedAndRejectButton>
              </Space>
            </div>
          )
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={
          <CloseOutlined
            style={{
              fontSize: "25px",
              paddingTop: "10px",
              paddingRight: "20px",
              color: "white",
            }}
          />
        }
      >
        <InventoryReportBillIndividual type="view" formData={formData} />
      </Modal>

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
            managerId: report.managerId,
          };
        })}
        isFetching={isFetching}
      />
    </div>
  );

  const inventory_columns = [
    {
      title: "SKU",
      dataIndex: "sku_code",
      key: "sku_code",
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Creator",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.maximum_quantity - b.maximum_quantity,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, _) => (
        <img src={text} style={{ width: "70px" }} alt="product"></img>
      ),
    },
  ];

  const inventory_product = (
    <div className="InventoryTable" style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={1}></ToolBar>
      <CustomTable
        isFetching={isFetching}
        columns={inventory_columns}
        dataSource={goodsList?.map((goods) => {
          return {
            key: goods?.id,
            name: goods.name,
            created_by: goods.created_by,
            sku_code: goods.sku_code,
            quantity: goods.quantity,
            description: goods.description,
            image: goods.images.length === 0 ? undefined : goods.images[0].url,
          };
        })}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        getAllProduct(dispatch)
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
              ORDER
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
