import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table, message } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import { getAllWarehouses, onGetAllManagers } from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";

// let data = [];
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
    dataIndex: "contact_info",
    key: "contact_info",
  },
  {
    title: "Warehouse Manager",
    dataIndex: "managerName",
    key: "managerName",
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
    render: () => <ActionBar numActions={"edt_del"} />,
  },
];

function WarehouseInterconnection() {
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const managersList = useSelector(
    (state) => state.employee.manager?.allManagers
  );
  const allWarehouseList = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );
  const isError = useSelector((state) => state.employee.manager?.error);

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const warehouseinter = (
    <div style={{ width: "100%" }}>
      <ToolBar
        managersList={managersList}
        onUpdateData={onUpdateData}
        type={2}
        page={"warehouseinter"}
      ></ToolBar>
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
            code: wh.code,
            name: wh.name,
            address: wh.contactId.address,
            contact_info: wh.contactId.phone_num,
            managerName: wh.managerId?.name,
            capacity: wh.capacity,
            description: wh.description,
            // createTime: wh.createdAt,
            // updateTime: wh.updatedAt,
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

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      await getAllWarehouses(dispatch);
      setIsFetching(false);
      await onGetAllManagers(dispatch);
    }
    fetchData();
    // console.log(allWarehouseList);
  }, [dispatch, isUpdateData]);

  if (isError) {
    message.error("Something went wrong!");
  }

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
