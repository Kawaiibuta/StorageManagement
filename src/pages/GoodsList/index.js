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
  Tooltip,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";

import ToolBar from "../../components/ToolBar/toolbar.js";

import { PiEyeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllSupplier,
  getAllWarehouses,
  getGoodsListByWarehouseId,
} from "../../redux/apiRequest.js";
import goodsListIcon from "../../assets/images/goods_list_icon.png";

import UpdateProductForm from "../../components/Form/UpdateProductForm.js";
import TabPane from "antd/es/tabs/TabPane.js";
import CustomTable from "../../components/Table/index.js";
import Highlighter from "react-highlight-words";

function GoodsList() {
  const [isFetching, setIsFetching] = useState(false);

  const [isUpdateData, setIsUpdateData] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );
  const userWarehouseId = useSelector(
    (state) => state.auth.login?.currentUser.employeeId.warehouseId
  );

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
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"product"}></ToolBar>
      <CustomTable
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
        title="Update Product"
      />
      {/* <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateProductForm
          isModalOpen={isModalOpen}
          handleCancelButton={handleCancel}
          handleOkButton={handleOk}
          onUpdateData={onUpdateData}
          formData={formData}
        />
      </Modal>
      <Table
        bordered
        loading={isFetching}
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={good_columns}
        dataSource={goodsList?.map((goods) => {
          return {
            key: goods?._id,
            name: goods.name,
            sku_code: goods.skuCode,
            supplier_name: goods.supplierId?.code,
            supplier_id: goods.supplierId?._id,
            maximum_quantity: goods.maximumQuantity,
            price: goods.price,
            unit: goods.unit,
            image: goods.imageUrl,
            specification: goods.specification,
            warehouse_name: goods.warehouseId?.code,
            warehouse_id: goods.warehouseId?._id,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: goodsList?.length,
        }}
        scroll={{
          x: 1800,
          y: "60vh",
        }}
      /> */}
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllSupplier(dispatch);
        getAllWarehouses(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  return (
    <div style={{ margin: "0px 16px" }}>
      <Tabs size="large" defaultActiveKey="1">
        <TabPane
          tab={
            <span
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
      </Tabs>
    </div>
  );
}
export default GoodsList;
