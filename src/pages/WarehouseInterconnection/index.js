/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import warehouseset from "../../assets/images/warehouseset-active.png";
import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";

import {
  Table,
  message,
  Modal,
  Tabs,
  Popconfirm,
  Tooltip,
  Input,
  Space,
  Button,
} from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import {
  deleteWarehouse,
  getAllWarehouses,
  onGetAllManagers,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import UpdateWarehouseForm from "../../components/Form/UpdateWarehouseForm.js";

import TabPane from "antd/es/tabs/TabPane.js";

function WarehouseInterconnection() {
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const managersList = useSelector(
    (state) => state.employee.manager?.allManagers
  );
  const allWarehouseList = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const handleDelete = async (key) => {
    try {
      await deleteWarehouse(key, dispatch);
      onUpdateData();
      message.success("Delete warehouse success");
    } catch (e) {
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
  };

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
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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

  const columns = [
    {
      title: "Code",
      fixed: "left",
      dataIndex: "code",
      key: "code",
      width: 80,
      ...getColumnSearchProps("code"),
    },
    {
      title: "Warehouse Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Warehouse Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Warehouse Contact",
      dataIndex: "phone_num",
      key: "phone_num",
      ...getColumnSearchProps("phone_num"),
    },
    {
      title: "Warehouse Manager",
      dataIndex: "managerCode",
      key: "managerCode",
      width: 200,
    },
    {
      title: "Warehouse Capacity",
      dataIndex: "capacity",
      key: "capacity",
      sorter: (a, b) => a.capacity - b.capacity,
    },

    {
      title: "Warehouse Description",
      dataIndex: "description",
      key: "description",
      width: 200,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 140,
      render: (_, record) => (
        <>
          <Tooltip title="Edit" key="edit">
            <a onClick={() => edit(record)}>
              {<RiEditBoxLine size={20} color="purple" />}
            </a>
          </Tooltip>
          <Tooltip title="Delete" key="delete">
            <Popconfirm
              // placement="bottom"
              title="Sure to delete warehouse"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>
                <RiDeleteBin6Line
                  // onClick={() => handleDelete(record.key)}
                  size={20}
                />
              </a>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const warehouseinter = (
    <div width="100%">
      <ToolBar
        managersList={managersList}
        onUpdateData={onUpdateData}
        type={2}
        page={"warehouseinter"}
      ></ToolBar>
      <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateWarehouseForm
          managersList={managersList}
          handleCancelButton={handleCancel}
          handleOkButton={handleOk}
          onUpdateData={onUpdateData}
          formData={formData}
        />
      </Modal>

      <Table
        bordered
        loading={isFetching}
        style={{
          marginTop: "10px",
          maxWidth: "85vw",
        }}
        columns={columns}
        dataSource={allWarehouseList?.map((wh) => {
          return {
            key: wh._id,
            code: wh.code,
            name: wh.name,
            address: wh.contactId.address,
            phone_num: wh.contactId.phone_num,
            email: wh.contactId.email,
            managerCode: wh.managerId?.code,
            managerId: wh.managerId?._id,
            capacity: wh.capacity,
            description: wh.description,
            createTime: wh.createdAt,
            updateTime: wh.updatedAt,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: allWarehouseList?.length,
        }}
        scroll={{
          x: 1800,
          y: "55vh",
        }}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      await getAllWarehouses(dispatch);

      await onGetAllManagers(dispatch);
      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  return (
    <div style={{ margin: "0px 16px" }}>
      {/* <ConfigProvider
        theme={{
          components: {
            Tabs: {},
          },
        }}
      > */}
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
                src={warehouseset}
                alt="warehouses"
                // style={{ marginRight: 10 }}
                style={{ width: "30px", height: "30px" }}
              />
              WAREHOUSE
            </span>
          }
          key="1"
        >
          {warehouseinter}
        </TabPane>
      </Tabs>
      {/* </ConfigProvider> */}
    </div>
  );
}

export default WarehouseInterconnection;
