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
  Modal,
} from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import {
  deleteWarehouse,
  editWarehouse,
  getAllWarehouses,
  onGetAllManagers,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import UpdateWarehouseForm from "../../components/Form/UpdateWarehouseForm.js";

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
    },
    {
      title: "Warehouse Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Warehouse Contact",
      dataIndex: "phone_num",
      key: "phone_num",
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
    },

    {
      title: "Warehouse Description",
      dataIndex: "description",
      key: "description",
      width: 200,
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

      render: (_, record) => (
        <Space>
          <Tooltip title="Edit" key="edit">
            {" "}
            <Button
              disabled={isModalOpen}
              onClick={() => edit(record)}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete" key="delete">
            {" "}
            <Button
              disabled={isModalOpen}
              onClick={() => {
                handleDelete(record.key);
              }}
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

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
        rowClassName="editable-row"
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
