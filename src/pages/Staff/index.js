/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
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
  Tooltip,
  message,
} from "antd";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { FaRegUser, FaUser } from "react-icons/fa";
import ToolBar from "../../components/ToolBar/toolbar.js";
import dayjs from "dayjs";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
  deleteEmployee,
  deleteUser,
  getAllEmployeesByWarehouseId,
  getAllStaffs,
  getAllUsersAccount,
  getAllWarehouses,
  onGetAllManagers,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import UpdateEmployeeForm from "../../components/Form/UpdateEmployeeForm.js";
import TabPane from "antd/es/tabs/TabPane.js";
import Highlighter from "react-highlight-words";
import { MdAssignmentInd } from "react-icons/md";
import managerIcon from "../../assets/images/manager_icon.png";
import managerIconActive from "../../assets/images/manager_icon_active.png";
import { LuUser2 } from "react-icons/lu";
import CustomTable from "../../components/Table/index.js";

function Staff() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [currentTab, setCurrentTab] = useState();
  const [hoveredTab, setHoveredTab] = useState(null);
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (state) => state.employee.employee?.allEmployees
  );
  const managersList = useSelector(
    (state) => state.employee.manager?.allManagers
  );
  const usersList = useSelector((state) => state.employee.user?.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

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
      await deleteEmployee(key);
      onUpdateData();
      message.success("Delete staff success");
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
  };

  const handleDeleteUser = async (key) => {
    try {
      console.log("key", key);
      await deleteUser(key, user.accessToken);
      onUpdateData();
      message.success("Delete staff success");
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
  //end search

  const employee_columns = [
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
      width: 180,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "6",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_num",
      key: "6",
      width: 150,
      ...getColumnSearchProps("phone_num"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "6",
      width: 200,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Warehouse",
      dataIndex: "warehouseCodeAndName",
      key: "6",
      width: 200,
      ...getColumnSearchProps("warehouseCodeAndName"),
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "6",
      width: 200,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <>
          <Tooltip title="Edit" key="edit">
            <a onClick={() => edit(record)}>
              {<RiEditBoxLine size={24} color="purple" />}
            </a>
          </Tooltip>
          <Tooltip title="Delete" key="delete">
            <Popconfirm
              title="Sure to delete staff"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>{<RiDeleteBin6Line size={24} color="red" />}</a>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const user_columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Employee",
      dataIndex: "employee_name",
      key: "employee_name",
      ...getColumnSearchProps("employee_name"),
      width: 200,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      width: 150,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,

      render: (_, record) => (
        <>
          <Tooltip title="Delete" key="delete">
            <Popconfirm
              title="Sure to delete user"
              onConfirm={() => handleDeleteUser(record.key)}
            >
              <a>{<RiDeleteBin6Line size={24} color="red" />}</a>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const staff_user = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"user"}></ToolBar>
      <CustomTable
        columns={user_columns}
        dataSource={usersList?.map((user, index) => {
          return {
            key: user._id,
            id: index + 1,
            employee_name: user.employeeId.name,
            role: user.isEmployee ? "Employee" : "Manager",
            user_name: user.username,
          };
        })}
        isFetching={isFetching}
        onUpdateData={onUpdateData}
      />
      {/* <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateEmployeeForm
          isModalOpen={isModalOpen}
          handleCancelButton={handleCancel}
          handleOkButton={handleOk}
          onUpdateData={onUpdateData}
        />
      </Modal>
      <Table
        bordered
        loading={isFetching}
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={user_columns}
        dataSource={usersList?.map((user, index) => {
          return {
            key: user._id,
            id: index + 1,
            employee_name: user.employeeId.name,
            role: user.isEmployee ? "Employee" : "Manager",
            user_name: user.username,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: usersList?.length,
        }}
        scroll={{
          y: "60vh",
        }}
      /> */}
    </div>
  );

  const staff_manager = (
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar
        position="Manager"
        onUpdateData={onUpdateData}
        type={2}
        page={"employee"}
      ></ToolBar>
      {/* <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#6c7ae0",
              headerColor: "white",
              rowHoverBg: "#bae0ff",
            },
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
          title={
            <p
              style={{
                marginLeft: "24px",
                fontWeight: 500,
                fontSize: 24,
                padding: "16px 0px",
              }}
            >
              Update Warehouse
            </p>
          }
          closeIcon={
            <CloseOutlined
              style={{
                fontSize: "25px",
                paddingTop: "20px",
                paddingRight: "20px",
                color: "white",
              }}
            />
          }
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <UpdateEmployeeForm
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
          columns={employee_columns}
          dataSource={managersList?.map((employee) => {
            return {
              key: employee._id,
              code: employee.code,
              name: employee.name,
              type: employee.position,
              address: employee.contactId.address,
              phone_num: employee.contactId.phone_num,
              email: employee.contactId.email,
              idCard: employee.idCard,
              gender: employee.gender,
              avatar: employee.imageUrl,
              warehouse_code: employee.warehouseId?.code,
              warehouse_id: employee.warehouseId?._id,
              start_time: employee.startDate,
              birthday: employee.birthday,
            };
          })}
          pagination={{
            showQuickJumper: true,
            total: managersList?.length,
          }}
          scroll={{
            x: 2000,
            y: "60vh",
          }}
        />
      </ConfigProvider> */}
      <CustomTable
        marginTop={5}
        scrollX={1800}
        title="Update Manager"
        columns={employee_columns}
        dataSource={managersList?.map((employee) => {
          return {
            key: employee._id,
            code: employee.code,
            name: employee.name,
            type: employee.position,
            address: employee.contactId.address,
            phone_num: employee.contactId.phone_num,
            email: employee.contactId.email,
            idCard: employee.idCard,
            gender: employee.gender,
            avatar: employee.imageUrl,
            warehouse_code: employee.warehouseId?.code,
            warehouse_id: employee.warehouseId?._id,
            warehouseCodeAndName:
              employee.warehouseId?.code + " - " + employee.warehouseId?.name,
            start_time: dayjs(employee.startDate).format("DD-MM-YYYY HH:mm:ss"),
            birthday: employee.birthday,
          };
        })}
        form={
          <UpdateEmployeeForm
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
      />
    </div>
  );

  const staff_employee = (
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar
        position="Employee"
        onUpdateData={onUpdateData}
        type={2}
        page={"employee"}
      ></ToolBar>
      <CustomTable
        marginTop={5}
        columns={employee_columns}
        dataSource={employeeList?.map((employee) => {
          return {
            key: employee._id,
            code: employee.code,
            name: employee.name,
            type: employee.position,
            address: employee.contactId.address,
            phone_num: employee.contactId.phone_num,
            email: employee.contactId.email,
            idCard: employee.idCard,
            gender: employee.gender,
            avatar: employee.imageUrl,
            warehouse_name: employee.warehouseId?.name,
            warehouse_code: employee.warehouseId?.code,
            warehouseCodeAndName:
              employee.warehouseId?.code + " - " + employee.warehouseId?.name,
            warehouse_id: employee.warehouseId?._id,
            start_time: dayjs(employee.startDate).format("DD-MM-YYYY HH:mm:ss"),
            birthday: employee.birthday,
          };
        })}
        form={
          <UpdateEmployeeForm
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
        title="Update Employee"
      />
      {/* <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateEmployeeForm
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
        columns={employee_columns}
        dataSource={employeeList?.map((employee) => {
          return {
            key: employee._id,
            code: employee.code,
            name: employee.name,
            type: employee.position,
            address: employee.contactId.address,
            phone_num: employee.contactId.phone_num,
            email: employee.contactId.email,
            idCard: employee.idCard,
            gender: employee.gender,
            avatar: employee.imageUrl,
            warehouse_name: employee.warehouseId?.name,
            warehouse_code: employee.warehouseId?.code,
            warehouse_id: employee.warehouseId?._id,
            start_time: employee.startDate,
            birthday: employee.birthday,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: employeeList?.length,
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
        await getAllEmployeesByWarehouseId(dispatch, userWarehouseId);
        await onGetAllManagers(dispatch);
        getAllUsersAccount(user.accessToken, dispatch);
        getAllStaffs(dispatch);
        await getAllWarehouses(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isUpdateData]);

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
              <MdAssignmentInd size={30} />
              EMPLOYEE
            </span>
          }
          key="1"
        >
          {staff_employee}
        </TabPane>
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "75.31px",
              }}
              onMouseEnter={() => setHoveredTab("2")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <img
                src={
                  currentTab === "2" || hoveredTab === "2"
                    ? managerIconActive
                    : managerIcon
                }
                alt="warehouses"
                // style={{ marginRight: 10 }}
                style={{ width: "30px", height: "30px" }}
              />
              MANAGER
            </span>
          }
          key="2"
        >
          {staff_manager}
        </TabPane>
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "75.31px",
              }}
            >
              <FaUser size={28} />
              USER
            </span>
          }
          key="3"
        >
          {staff_user}
        </TabPane>
      </Tabs>
    </div>
  );
}

<style jsx>{`
  .custom-tab:hover {
    background-color: #e6f7ff;
  }
`}</style>;

export default Staff;
