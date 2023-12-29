/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
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
} from "antd";

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
      fixed: "left",
      dataIndex: "code",
      key: "code",
      width: 90,
    },
    {
      title: "Full Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "6",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_num",
      key: "phone_num",
      width: 200,
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
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
                {<RiEditBoxLine size={20} color="purple" />}
              </a>
            </Tooltip>
            <Tooltip title="Delete" key="delete">
              <Popconfirm
                title="Sure to delete partner?"
                onConfirm={() => handleDelete(record.key)}
              >
                <a>{<RiDeleteBin6Line size={20} />}</a>
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
      <ToolBar onUpdateData={onUpdateData} type={2} page={"customer"}></ToolBar>
      <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateCustomerForm
          isModalOpen={isModalOpen}
          handleCancelButton={handleCancel}
          handleOkButton={handleOk}
          onUpdateData={onUpdateData}
          formData={formData}
        />
      </Modal>

      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={isFetching}
        bordered
        style={{ marginTop: "10px", maxWidth: "85vw" }}
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
        pagination={{
          showQuickJumper: true,
          total: customersList?.length,
        }}
        scroll={{
          y: "60vh",
        }}
      />
    </div>
  );

  const supplier = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"supplier"}></ToolBar>
      <Modal
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
      </Form>
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
