import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Button, Table } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import axios from "axios";

// let data = [];

function WarehouseInterconnection() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Code",
      fixed: "left",
      dataIndex: "code",
      key: "code",
      width: 60,
    },
    {
      title: "Full Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      width: 200,
    },
    {
      title: "Contact",
      dataIndex: "contact_info",
      key: "contact_info",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: () => <ActionBar numActions={"edt_del"} />,
    },
  ];

  function onLoadingChange() {
    setLoading(!loading);
  }

  function warehouse(code, name, address, capacity, contact_info, description) {
    this.code = code;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.contact_info = contact_info;
    this.description = description;
  }

  function Warehouseinter({ warehouses }) {
    console.log("data", warehouses);
    return (
      <div style={{ maxWidth: "80%", width: "100%", minWidth: "90%" }}>
        <ToolBar
          onLoadingChange={onLoadingChange}
          type={2}
          page={"warehouseinter"}
        ></ToolBar>
        <Table
          style={{ marginTop: "10px", maxWidth: "80vw" }}
          columns={columns}
          dataSource={warehouses}
          pagination={{
            showQuickJumper: true,
            total: warehouses.length,
          }}
          scroll={{
            x: 2000,
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        "https://warehousemanagement.onrender.com/api/warehouse"
      );

      const whList = [];

      for (const wh in request.data) {
        const nextWarehouse = new warehouse(
          request.data[wh].code,
          request.data[wh].name,
          request.data[wh].contactId.address,
          request.data[wh].capacity,
          request.data[wh].contactId.phone_num,
          request.data[wh].description
        );
        whList.push(nextWarehouse);
      }

      setDataSource(whList);

      // onLoadingChange();
      return request.data;
    }
    fetchData();
  }, [loading]);

  console.log("return", dataSource);
  return (
    <div>
      <TabView
        style={{ backgroundColor: "red" }}
        tabs={[
          {
            name: "Warehouse Interconnection",
            content: <Warehouseinter warehouses={dataSource} />,
          },
        ]}
      />
      <Button onClick={onLoadingChange}>new</Button>
    </div>
    // <Warehouseinter warehouses={dataSource} />
  );
}

export default WarehouseInterconnection;
