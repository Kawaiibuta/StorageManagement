import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Table,
  message,
  Input,
  Form,
  Popconfirm,
  Button,
  Space,
  Tooltip,
  Select,
} from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import {
  deleteWarehouse,
  editWarehouse,
  getAllWarehouses,
  onGetAllManagers,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  managersList,
  ...restProps
}) => {
  if (inputType === "select") {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name="managerCode"
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
            <Select options={managersList}></Select>
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }
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

function WarehouseInterconnection() {
  const [form] = Form.useForm();
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  const managersList = useSelector(
    (state) => state.employee.manager?.allManagers
  );
  const allWarehouseList = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );

  const columns = [
    {
      title: "Code",
      fixed: "left",
      dataIndex: "code",
      key: "code",
      width: 80,
    },
    {
      title: "Warehouse Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      editable: true,
    },
    {
      title: "Warehouse Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      editable: true,
    },
    {
      title: "Warehouse Contact",
      dataIndex: "phone_num",
      key: "phone_num",
      editable: true,
    },
    {
      title: "Warehouse Manager",
      dataIndex: "managerCode",
      key: "managerCode",
      width: 200,
      editable: true,
    },
    {
      title: "Warehouse Capacity",
      dataIndex: "capacity",
      key: "capacity",
      editable: true,
    },

    {
      title: "Warehouse Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      editable: true,
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
      width: 200,
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 200,
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
                  handleDelete(record);
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

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    console.log("edit", record);
    form.setFieldsValue({
      name: "",
      address: "",
      phone_num: "",
      managerCode: "",
      capacity: "",
      description: "",
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
      await editWarehouse(
        key,
        {
          managerId: row.managerCode,
          name: row.name,
          capacity: row.capacity,
          description: row.description,
          email: row.email,
          phone_num: row.phone_num,
          address: row.address,
        },
        dispatch
      );
      console.log("row", row);

      message.success("Edit warehouse success");
      setEditingKey("");
      onUpdateData();
    } catch (e) {
      console.log(e);
      message.error(e.messsage);
    }
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "managerCode" ? "select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        managersList: managersList?.map((manager) => {
          return {
            value: manager._id,
            label: manager.code,
          };
        }),
      }),
    };
  });

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const handleDelete = async (record) => {
    console.log(record);
    try {
      await deleteWarehouse(record.key, dispatch);
      onUpdateData();
      message.success("Delete warehouse success");
    } catch (e) {
      message.error(e.response.data);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      await getAllWarehouses(dispatch);

      await onGetAllManagers(dispatch);
      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  const warehouseinter = (
    <div style={{ width: "100%" }}>
      <ToolBar
        managersList={managersList}
        onUpdateData={onUpdateData}
        type={2}
        page={"warehouseinter"}
      ></ToolBar>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          bordered
          loading={isFetching}
          style={{
            marginTop: "10px",
            maxWidth: "85vw",
          }}
          columns={mergedColumns}
          dataSource={allWarehouseList?.map((wh) => {
            return {
              key: wh._id,
              code: wh.code,
              name: wh.name,
              address: wh.contactId.address,
              phone_num: wh.contactId.phone_num,
              managerCode: wh.managerId?.code,
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
            y: "65vh",
          }}
        />
      </Form>
    </div>
  );

  return (
    <div>
      <TabView
        style={{ backgroundColor: "red" }}
        tabs={[
          {
            name: "Warehouse Interconnection",
            content: warehouseinter,
          },
        ]}
      />
    </div>
  );
}

export default WarehouseInterconnection;
