import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import {
  Table,
  Form,
  Input,
  Tooltip,
  Space,
  Button,
  message,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePartner,
  getAllCustomer,
  getAllSupplier,
  updateSupplier,
} from "../../redux/apiRequest.js";
import axios from "axios";

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

function partner_item(id, name, address, phone_num, email) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.phone_num = phone_num;
  this.email = email;
}
const supplier_dataSource = [];
for (let i = 1; i < 100; i++) {
  supplier_dataSource.push(
    new partner_item(
      i,
      "Supplier " + i.toString(),
      "123 ABC Street, State " + i.toString(),
      "0900" + i.toString(),
      i.toString() + "@gmail.com"
    )
  );
}
const customer_dataSource = [];
for (let i = 1; i < 100; i++) {
  customer_dataSource.push(
    new partner_item(
      i,
      "Customer " + i.toString(),
      "123 ABC Street, State " + i.toString(),
      "0900" + i.toString(),
      i.toString() + "@gmail.com"
    )
  );
}

function Partner() {
  const [form] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const dispatch = useDispatch();
  const suppliersList = useSelector(
    (state) => state.partner.supplier?.allSuppliers
  );
  const customersList = useSelector(
    (state) => state.partner.customer?.allCustomers
  );

  const edit = (record) => {
    console.log("edit", record);
    form.setFieldsValue({
      name: "",
      address: "",
      phone_num: "",
      email: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    console.log("key", key);
    try {
      const row = await form.validateFields();

      console.log("row", row);
      await updateSupplier(key, {
        name: row.name,
        email: row.email,
        phone_num: row.phone_num,
        address: row.address,
      });

      message.success("Edit partner success");
      setEditingKey("");
      onUpdateData();
    } catch (e) {
      console.log(e);
      message.error(e.messsage);
    }
  };

  const handleDelete = async (key) => {
    try {
      // await axios.delete()
      await deletePartner(key);

      onUpdateData();
      message.success("Delete partner success");
    } catch (e) {
      console.log(e);
      message.error(e.response.data);
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
      width: 120,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Tooltip title="Save" key="save">
              {" "}
              <Button
                icon={<SaveOutlined />}
                onClick={() => save(record.key)}
              ></Button>
            </Tooltip>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Tooltip title="Cancel" key="cancel">
                {" "}
                <Button icon={<CloseOutlined />}></Button>
              </Tooltip>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Tooltip title="Edit" key="edit">
              {" "}
              <Button
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                icon={<EditOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Delete" key="delete">
              {" "}
              <Button
                disabled={editingKey !== ""}
                onClick={() => {
                  handleDelete(record.key);
                }}
                icon={<DeleteOutlined />}
                danger
              ></Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = partner_columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
      <Form form={form}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          loading={isFetching}
          bordered
          style={{ marginTop: "10px", maxWidth: "85vw" }}
          columns={mergedColumns}
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
      </Form>
    </div>
  );

  const supplier = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"supplier"}></ToolBar>
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
          columns={mergedColumns}
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

  return (
    <div>
      <TabView
        tabs={[
          { name: "Supplier", content: supplier },
          { name: "Customer", content: customer },
        ]}
      />
    </div>
  );
}

export default Partner;
