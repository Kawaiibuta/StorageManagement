/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import {
  Table,
  Form,
  Input,
  message,
  Modal,
  Tabs,
  Tooltip,
  Popconfirm,
  Button,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import ToolBar from "../../components/ToolBar/toolbar.js";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePartner,
  getAllCustomer,
  getAllSupplier,
} from "../../redux/apiRequest.js";

import UpdateSupplierForm from "../../components/Form/UpdateSupplierForm.js";
import UpdateCustomerForm from "../../components/Form/UpdateCustomerForm.js";
import TabPane from "antd/es/tabs/TabPane.js";
import { FaUserTie } from "react-icons/fa6";
import customerIcon from "../../assets/images/customer_icon.png";
import customerIconActive from "../../assets/images/customer_icon_active.png";
import CustomTable from "../../components/Table/index.js";
import Highlighter from "react-highlight-words";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,

  ...restProps
}) => {
  const inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Partner() {
  const [form] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [currentTab, setCurrentTab] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);

  const dispatch = useDispatch();
  const suppliersList = useSelector(
    (state) => state.partner.supplier?.allSuppliers
  );
  const customersList = useSelector(
    (state) => state.partner.customer?.allCustomers
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

  const handleDelete = async (key) => {
    try {
      // await axios.delete()
      await deletePartner(key);

      onUpdateData();
      message.success("Delete partner success");
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
  };

  const partner_columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 90,
      ...getColumnSearchProps("code"),
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
      title: "Address",
      dataIndex: "address",
      key: "6",
      ...getColumnSearchProps("address"),
      width: 250,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_num",
      key: "phone_num",
      width: 200,
      ...getColumnSearchProps("phone_num"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      ...getColumnSearchProps("email"),
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
            <Tooltip title="Edit" key="edit">
              <a onClick={() => edit(record)}>
                {<RiEditBoxLine size={24} color="purple" />}
              </a>
            </Tooltip>
            <Tooltip title="Delete" key="delete">
              <Popconfirm
                title="Sure to delete partner?"
                onConfirm={() => handleDelete(record.key)}
              >
                <a>{<RiDeleteBin6Line size={24} color="red" />}</a>
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
  ];

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getAllSupplier(dispatch);
        await getAllCustomer(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  const customer = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={4} page={"customer"}></ToolBar>
      <CustomTable
        scrollX={null}
        columns={partner_columns}
        dataSource={customersList?.map((cus) => {
          return {
            key: cus._id,
            code: cus.code,
            name: cus.name,
            address: cus.contactId.address,
            phone_num: cus.contactId.phone_num,
            email: cus.contactId.email,
          };
        })}
        form={
          <UpdateCustomerForm
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
        onUpdateData={onUpdateData}
        title="Update Customer"
      />
    </div>
  );

  const supplier = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={4} page={"supplier"}></ToolBar>
      <CustomTable
        columns={partner_columns}
        dataSource={suppliersList?.map((supplier) => {
          return {
            key: supplier._id,
            code: supplier.code,
            name: supplier.name,
            address: supplier.contactId.address,
            phone_num: supplier.contactId.phone_num,
            email: supplier.contactId.email,
          };
        })}
        form={
          <UpdateSupplierForm
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
        onUpdateData={onUpdateData}
        title="Update Supplier"
      />
      {/* <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateSupplierForm
          isModalOpen={isModalOpen}
          handleCancelButton={handleCancel}
          handleOkButton={handleOk}
          onUpdateData={onUpdateData}
          formData={formData}
        />
      </Modal>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          loading={isFetching}
          style={{ marginTop: "10px", maxWidth: "85vw" }}
          columns={partner_columns}
          dataSource={suppliersList?.map((supplier) => {
            return {
              key: supplier._id,
              code: supplier.code,
              name: supplier.name,
              address: supplier.contactId.address,
              phone_num: supplier.contactId.phone_num,
              email: supplier.contactId.email,
            };
          })}
          pagination={{
            showQuickJumper: true,
            total: suppliersList?.length,
          }}
          scroll={{
            y: "60vh",
          }}
        />
      </Form> */}
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
            >
              <FaUserTie size={30} /> SUPPLIER
            </span>
          }
          key="1"
        >
          {supplier}
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
                    ? customerIconActive
                    : customerIcon
                }
                alt="warehouses"
                style={{ width: "30px", height: "30px" }}
              />
              CUSTOMER
            </span>
          }
          key="2"
        >
          {customer}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Partner;
