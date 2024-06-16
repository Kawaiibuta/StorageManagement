/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import TabView from "../../components/Button Header/TabView.js";
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
  deleteOrder,
  deleteTransaction,
  getAllOrder,
  updateStatus,
} from "../../redux/apiRequest.js";
// import InBoundForm from "../../components/Form/InBoundForm.js";
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
import InBoundForm from "../../components/Form/InBoundForm.js";

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

function OrderPage() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.product.order?.allOrder);

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
      await updateStatus(key, "Delivered");
      console.log("updatestatus");
      onUpdateData();
      message.success("Update inbound status success!");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (key) => {
    console.log("key", key);
    try {
      await deleteOrder(key);

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

  const inbound_columns = [
    {
      title: "ASN",
      dataIndex: "asn",
      key: "asn",
      width: 120,
      ...getColumnSearchProps("id"),
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
        if (status === "Ordering") color = "geekblue";
        else if (status === "PAID") color = "cyan";
        else color = "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Total Value",
      dataIndex: "total_price",
      key: "total_price",
      width: 150,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      ...getColumnSearchProps("creator"),
      width: 200,
    },

    {
      title: "Create Time",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
    },
    {
      title: "Update Time",
      dataIndex: "updated_at",
      key: "updated_at",
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
                style={{ marginRight: 10 }}
                onClick={() => {
                  edit(record);
                }}
              >
                {<PiEyeBold size={24} color="#85dcea" />}
              </a>
            </Tooltip>
            <a style={{ marginRight: 10 }}>
              {
                <RiCheckboxLine
                  color={record.status === "Delivered" ? "gray" : ""}
                  size={24}
                  onClick={
                    record.status === "Delivered"
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
              {/* <PrintButton key={record._id} record={formData} /> */}
            </a>

            <Tooltip title="Delete" key="delete">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={
                  record.status === "Delivered"
                    ? null
                    : () => handleDelete(record.key)
                }
              >
                <a>
                  {
                    <RiDeleteBin6Line
                      size={24}
                      color={record.status === "Delivered" ? "gray" : "red"}
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
      {/* <ToolBa r onUpdateData={onUpdateData} type={2} page={"inbound"}></ToolBar> */}
      <InBoundForm
        isModalOpen={isModalOpen}
        handleCancelButton={handleCancel}
        handleOkButton={handleOk}
        onUpdateData={onUpdateData}
        formData={formData}
      />

      <CustomTable
        isFetching={isFetching}
        marginTop={20}
        title="Update Outbound"
        scrollX={1800}
        columns={inbound_columns}
        dataSource={ordersList
          ?.filter((order) => order.is_deleted === false)
          .map((order) => {
            return {
              key: order.id,
              asn: order.code,
              status: order.status,
              is_deleted: order.is_deleted,
              customer: order.customer,
              total_price: Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(order.total_price),
              total_price_without_format: order.total_price,
              created_at: dayjs(order.created_at).format("DD-MM-YYYY HH:mm:ss"),
              updated_at: dayjs(order.updated_at).format("DD-MM-YYYY HH:mm:ss"),
              orderDetail: order.orderDetail,
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

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        await getAllOrder(dispatch);
      } catch (e) {
        console.log(e);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  console.log("orderlist" + ordersList);

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
      </Tabs>
    </div>
  );
}

export default OrderPage;
