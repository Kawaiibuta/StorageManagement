/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  message,
} from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import {
  RiDeleteBin6Line,
  RiCheckboxLine,
  RiEditBoxLine,
  RiPrinterLine,
} from "react-icons/ri";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { PiEyeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getAllInbound,
  getAllPartnersIncludeDelete,
  getAllProductsIncludeDelete,
  getAllSupplier,
  getAllWarehouses,
  getGoodsList,
  getGoodsListByWarehouseId,
  updateStatus,
} from "../../redux/apiRequest.js";
import InBoundForm from "../../components/Form/InBoundForm.js";
import asnIcon from "../../assets/images/asn_icon.png";
import asnIconActive from "../../assets/images/asn_icon_active.png";
import orderInboundIcon from "../../assets/images/oder_inbound_icon.png";
import orderInboundIconActive from "../../assets/images/order_inbound_icon_active.png";
import receiveListIcon from "../../assets/images/receive_list_icon.png";
import receiveListIconActive from "../../assets/images/receive_list_icon_done.png";
import TabPane from "antd/es/tabs/TabPane.js";
import { ExportButtonForInBound } from "../../components/Print/index.js";
import CustomTable from "../../components/Table/index.js";
import dayjs from "dayjs";
import InBoundBill from "../../components/Form/InBoundBill.js";
import { useReactToPrint } from "react-to-print";
import Highlighter from "react-highlight-words";

const PrintButton = ({ record }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ display: "none" }}>
        <InBoundBill formData={record} ref={componentRef} />
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

function InBound() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);
  const dispatch = useDispatch();

  const inboundsList = useSelector(
    (state) => state.product.inbound?.allInBounds
  );

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId?.warehouseId;

  //search function
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //end search

  const edit = (record) => {
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

  const showModalView = (record) => {
    setFormData(record);
    setIsModalViewOpen(true);
  };
  const handleOkView = () => {
    setIsModalViewOpen(false);
  };
  const handleCancelView = () => {
    setIsModalViewOpen(false);
  };

  const handleEditStatus = async (key) => {
    console.log("key", key);
    try {
      console.log("updatestatus");
      await updateStatus(key, {
        status: "Done",
      });
      onUpdateData();
      message.success("Update inbound status success!");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (key) => {
    console.log("key", key);
    try {
      await deleteTransaction(key);

      onUpdateData();
      message.success("Delete inbound success");
    } catch (e) {
      console.log(e);
      console.log("isstring", e.response.data instanceof String);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
  };

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        await getAllInbound(dispatch, userWarehouseId);
        getAllWarehouses(dispatch);
        getAllSupplier(dispatch);
        getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllPartnersIncludeDelete(dispatch);
        getAllProductsIncludeDelete(dispatch);
      } catch (e) {
        console.log(e);
      }
      setIsFetching(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isUpdateData]);

  const inbound_columns = [
    {
      title: "ASN",
      dataIndex: "ASN",
      key: "ASN",
      width: 120,
      ...getColumnSearchProps("ASN"),
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Status",

      dataIndex: "status",
      key: "status",
      width: 80,
      defaultFilteredValue:
        currentTab === "2" ? ["Order"] : currentTab === "3" ? ["Done"] : [""],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => {
        let color;
        if (status === "Order") color = "geekblue";
        else if (status === "Done") color = "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Supplier",
      dataIndex: "supplierCodeAndName",
      key: "supplierCodeAndName",
      ...getColumnSearchProps("supplierCodeAndName"),
      width: 200,
    },
    {
      title: "Total Value",
      dataIndex: "total_value",
      key: "total_value",
      width: 150,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      ...getColumnSearchProps("creator"),
      width: 200,
    },

    {
      title: "Create Time",
      dataIndex: "create_time",
      key: "create_time",
      width: 200,
    },
    {
      title: "Update Time",
      dataIndex: "update_time",
      key: "update_time",
      width: 200,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <Tooltip key="view" title="View">
              <a
                onClick={() => {
                  showModalView(record);
                }}
              >
                {<PiEyeBold size={24} color="#85dcea" />}
              </a>
            </Tooltip>
            <a>
              {
                <RiCheckboxLine
                  color={record.status === "Done" ? "gray" : ""}
                  size={24}
                  onClick={
                    record.status === "Done"
                      ? null
                      : () => handleEditStatus(record.key)
                  }
                />
              }
            </a>
            <a
              onClickCapture={() => {
                setFormData(record);
              }}
            >
              <PrintButton key={record._id} record={formData} />
            </a>

            <Tooltip title="Edit" key="edit">
              <a onClick={record.status === "Done" ? null : () => edit(record)}>
                {
                  <RiEditBoxLine
                    size={24}
                    color={record.status === "Done" ? "gray" : "purple"}
                  />
                }
              </a>
            </Tooltip>
            <Tooltip title="Delete" key="delete">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={
                  record.status === "Done"
                    ? null
                    : () => handleDelete(record.key)
                }
              >
                <a>
                  {
                    <RiDeleteBin6Line
                      size={24}
                      color={record.status === "Done" ? "gray" : "red"}
                    />
                  }
                </a>
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const all = (
    <div
      className="InboundTable"
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"inbound"}></ToolBar>
      <InBoundForm
        isModalOpen={isModalOpen}
        handleCancelButton={handleCancel}
        handleOkButton={handleOk}
        onUpdateData={onUpdateData}
        formData={formData}
      />
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
      >
        <Modal
          style={{
            top: 20,
          }}
          title=" &nbsp;"
          width={700}
          footer={null}
          open={isModalViewOpen}
          onOk={handleOkView}
          onCancel={handleCancelView}
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
          <ExportButtonForInBound formData={formData} />
        </Modal>
      </ConfigProvider>

      <CustomTable
        isFetching={isFetching}
        marginTop={20}
        title="Update Outbound"
        scrollX={1800}
        columns={inbound_columns}
        dataSource={inboundsList?.map((inbound) => {
          return {
            key: inbound._id,
            ASN: inbound.code,
            status: inbound.status,
            supplier: inbound.partnerId.code,
            supplierId: inbound.partnerId._id,
            supplierCodeAndName:
              inbound.partnerId.code + " - " + inbound.partnerId.name,
            supplierName: inbound.partnerId.name,
            total_value: Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(inbound.total),
            creator: inbound.employeeId.code + " - " + inbound.employeeId.name,
            creatorName: inbound.employeeId.name,
            trans_details: inbound.transactionDetails,
            create_time: dayjs(inbound.createdAt).format("DD-MM-YYYY HH:mm:ss"),
            update_time: dayjs(inbound.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
          };
        })}
        onUpdateData={onUpdateData}
      />
    </div>
  );

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
                    ? asnIconActive
                    : asnIcon
                }
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              ASN
            </span>
          }
          key="1"
        >
          {all}
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
                    ? orderInboundIconActive
                    : orderInboundIcon
                }
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              ORDER
            </span>
          }
          key="2"
        >
          {all}
        </TabPane>
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={() => setHoveredTab("3")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <img
                src={
                  currentTab === "3" || hoveredTab === "3"
                    ? receiveListIconActive
                    : receiveListIcon
                }
                alt="goodslist"
                style={{ width: "30px", height: "30px" }}
              />
              DONE
            </span>
          }
          key="3"
        >
          {all}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default InBound;
