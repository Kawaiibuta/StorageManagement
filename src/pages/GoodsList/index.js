/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import {
  Button,
  Image,
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
import { SearchOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import dayjs from "dayjs";

import ToolBar from "../../components/ToolBar/toolbar.js";

import { PiEyeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllSupplier,
  getAllTransfer,
  getAllWarehouses,
  getGoodsListByWarehouseId,
} from "../../redux/apiRequest.js";
import goodsListIcon from "../../assets/images/goods_list_icon.png";

import UpdateProductForm from "../../components/Form/UpdateProductForm.js";
import TabPane from "antd/es/tabs/TabPane.js";
import CustomTable from "../../components/Table/index.js";
import Highlighter from "react-highlight-words";
import { MdCallReceived, MdSend } from "react-icons/md";
import ProductTransferForm from "../../components/Form/ProductTransferForm.js";

function GoodsList() {
  const [isFetching, setIsFetching] = useState(false);

  const [isUpdateData, setIsUpdateData] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [formDataTransfer, setFormDataTransfer] = useState();
  const [selectedRow, setSelectedRow] = useState([]);
  const [isModalViewTransferOpen, setIsModalViewTransferOpen] = useState(false);
  const [selectTransferId, setSelectTransferId] = useState(null);
  const [selectTransferStatus, setSelectTransferStatus] = useState(null);
  const [currentTab, setCurrentTab] = useState();
  const transfersList = useSelector(
    (state) => state.warehouse.warehouse?.transfers
  );
  const dispatch = useDispatch();
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );
  const userWarehouseId = useSelector(
    (state) => state.auth.login?.currentUser.employeeId.warehouseId
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isManager = user.employeeId.position === "Manager";

  const showModalViewTransfer = () => {
    setIsModalViewTransferOpen(true);
  };
  const handleOkViewTransfer = () => {
    setIsModalViewTransferOpen(false);
    onUpdateData();
  };
  const handleCancelViewTransfer = () => {
    setIsModalViewTransferOpen(false);
  };

  //select row
  const onSelectChange = (newSelectedRow) => {
    console.log("selectedRowKeys changed: ", newSelectedRow);

    if (selectedRow.find((row) => row.key === newSelectedRow.key)) {
      setSelectedRow(
        selectedRow.filter((row) => row.key !== newSelectedRow.key)
      );
    } else {
      setSelectedRow([...selectedRow, newSelectedRow]);
    }
  };

  const rowSelection = {
    // selectedRowKeys,
    onSelect: (record) => {
      console.log("record", record);
      onSelectChange(record);
    },
  };

  //end select row
  const viewTransfer = (record) => {
    setFormDataTransfer(record);
    showModalViewTransfer();
  };

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

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const edit = (record) => {
    setFormData(record);
    showModal();
  };

  const handleDelete = async (key) => {
    try {
      console.log("key", key);
      await deleteProduct(key);
      onUpdateData();
      message.success("Delete product success");
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
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

  const good_columns = [
    {
      title: "SKU",
      width: 110,
      dataIndex: "sku_code",
      key: "sku_code",

      ...getColumnSearchProps("sku_code"),
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Full Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Supplier",
      dataIndex: "supplierCodeAndName",
      key: "supplierCodeAndName",
      width: 230,
      sorter: true,
      ...getColumnSearchProps("supplierCodeAndName"),
    },
    {
      title: "Maximum Quantity",
      dataIndex: "maximum_quantity_format",
      key: "maximum_quantity_format",
      width: 150,

      sorter: (a, b) => a.maximum_quantity - b.maximum_quantity,
    },
    {
      title: "Price",
      dataIndex: "price_format",
      key: "price_format",
      width: 150,

      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 100,
      ...getColumnSearchProps("unit"),

      sorter: (a, b) => a.unit - b.unit,
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
    {
      title: "Specification",
      dataIndex: "specification",
      key: "specification",
      width: 200,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <>
          <Tooltip title="Edit" key="edit">
            <a onClick={() => edit(record)}>
              {<RiEditBoxLine size={24} color="purple" />}
            </a>
          </Tooltip>
          <Tooltip title="Delete" key="delete">
            <Popconfirm
              title="Sure to delete product?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>{<RiDeleteBin6Line size={24} color="red" />}</a>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const goodslist = (
    <div
      className="GoodsTable"
      style={{
        width: "100%",
      }}
    >
      <ToolBar
        className="ToolBar"
        style={{ backgroundColor: "red", width: "95%" }}
        productSelectionList={selectedRow}
        onUpdateData={onUpdateData}
        type={isManager ? 3 : 2}
        page={"product"}
      ></ToolBar>
      <CustomTable
        rowSelection={isManager ? rowSelection : null}
        columns={good_columns}
        dataSource={goodsList?.map((goods) => {
          return {
            key: goods?._id,
            name: goods.name,
            sku_code: goods.skuCode,
            supplier_name: goods.supplierId?.code,
            supplier_id: goods.supplierId?._id,
            supplierCodeAndName:
              goods.supplierId?.code + " - " + goods.supplierId?.name,
            maximum_quantity: goods.maximumQuantity,
            maximum_quantity_format: goods.maximumQuantity.toLocaleString(),
            price: goods.price,
            price_format: Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(goods.price),
            unit: goods.unit,
            image: goods.imageUrl,
            specification: goods.specification,
          };
        })}
        form={
          <UpdateProductForm
            isModalOpen={isModalOpen}
            handleCancelButton={handleCancel}
            handleOkButton={handleOk}
            onUpdateData={onUpdateData}
            formData={formData}
          />
        }
        handleCancel={handleCancel}
        handleOk={handleOk}
        isFetching={isFetching}
        isModalOpen={isModalOpen}
        marginTop={20}
        onUpdateData={onUpdateData}
        scrollX={1800}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllSupplier(dispatch);
        getAllWarehouses(dispatch);
        getAllTransfer(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  const transfer_columns = [
    {
      title: "Code",

      dataIndex: "code",
      key: "code",
      width: 110,
      ...getColumnSearchProps("code"),
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,

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
      title: "From Warehouse",
      dataIndex: "fromWarehouse",
      key: "6",
      width: 200,
      ...getColumnSearchProps("fromWarehouse"),
    },

    {
      title: "To Warehouse",
      dataIndex: "toWarehouse",
      key: "6",
      width: 200,
      ...getColumnSearchProps("toWarehouse"),
    },

    {
      title: "Create At",
      dataIndex: "createAt",
      key: "6",
      width: 200,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <>
            <Tooltip key="view" title="View">
              <a
                onClick={() => {
                  viewTransfer(record.productList);
                  setSelectTransferId(record.key);
                  setSelectTransferStatus(record.status);
                }}
              >
                {<PiEyeBold size={24} color="#85dcea" />}
              </a>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const transfer = (
    <div
      className="TransferTable"
      style={{
        width: "100%",
      }}
    >
      <ProductTransferForm
        isModalOpen={isModalViewTransferOpen}
        productList={formDataTransfer}
        handleCancelButton={handleCancelViewTransfer}
        handleOkButton={handleOkViewTransfer}
        onUpdateData={onUpdateData}
        type="view"
        transferId={selectTransferId}
        isTransferSendScreen={
          currentTab === "4" || selectTransferStatus !== "Waiting"
            ? true
            : false
        }
      />
      <CustomTable
        isFetching={isFetching}
        marginTop={5}
        title="View Transfer"
        columns={transfer_columns}
        dataSource={transfersList
          ?.filter((transfer) => {
            if (currentTab === "4") {
              return (
                transfer.fromWarehouse._id === userWarehouseId &&
                transfer.employees.length === 0
              );
            } else
              return (
                transfer.toWarehouse._id === userWarehouseId &&
                transfer.employees.length === 0
              );
          })
          .map((transfer) => {
            let status;
            if (transfer.isAccepted === true) {
              status = "Approved";
            } else if (transfer.isAccepted === false) {
              status = "Reject";
            } else {
              status = "Waiting";
            }
            return {
              key: transfer._id,
              code: transfer.code,
              status: status,
              toWarehouse:
                transfer.toWarehouse.code + " - " + transfer.toWarehouse.name,
              productList: transfer.products,
              fromWarehouse:
                transfer.fromWarehouse.code +
                " - " +
                transfer.fromWarehouse.name,
              createAt: dayjs(transfer.createAt).format("DD-MM-YYYY HH:mm:ss"),
            };
          })}
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
              className="TabButton"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={goodsListIcon}
                alt="goodslist"
                style={{ width: "30px", height: "30px" }}
              />
              GOODS LIST
            </span>
          }
          key="1"
        >
          {goodslist}
        </TabPane>
        {isManager ? (
          <TabPane
            tab={
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // width: "150px",
                }}
              >
                <MdSend size={28} />
                TRANSFER SEND
              </span>
            }
            key="4"
          >
            {transfer}
          </TabPane>
        ) : null}
        {isManager ? (
          <TabPane
            tab={
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // width: "150px",
                }}
              >
                <MdCallReceived size={28} />
                TRANSFER RECEIVED
              </span>
            }
            key="5"
          >
            {transfer}
          </TabPane>
        ) : null}
      </Tabs>
    </div>
  );
}
export default GoodsList;
