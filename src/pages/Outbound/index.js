/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Popconfirm, Table, Tabs, Tooltip, message } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getAllCustomer,
  getAllOutbound,
  getAllSupplier,
  getGoodsList,
  getGoodsListByWarehouseId,
  updateStatus,
} from "../../redux/apiRequest.js";
import {
  RiDeleteBin6Line,
  RiCheckboxLine,
  RiEditBoxLine,
  RiPrinterLine,
} from "react-icons/ri";
import { PiEyeBold } from "react-icons/pi";
import OutBoundForm from "../../components/Form/OutBoundForm.js";
import dnIcon from "../../assets/images/dn_icon.png";
import dnIconActive from "../../assets/images/dn_icon_active.png";
import orderIcon from "../../assets/images/order_outbound_icon.png";
import orderIconActive from "../../assets/images/order_outbound_icon_active.png";
import doneIcon from "../../assets/images/outbound_done_icon.png";
import doneIconActive from "../../assets/images/outbound_done_icon_active.png";
import TabPane from "antd/es/tabs/TabPane.js";

function Outbound() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);

  const outboundsList = useSelector(
    (state) => state.product.outbound?.allOutbounds
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId?.warehouseId;

  const order = "In order";
  const delivery = "In delivery";
  const done = "Done";
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
    console.log("key", key);
    try {
      await deleteTransaction(key);

      onUpdateData();
      message.success("Delete outbound success");
    } catch (e) {
      console.log(e);
      // message.error("Something went wrong");
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
  };

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const handleEditStatus = async (key) => {
    console.log("key", key);
    try {
      console.log("updatestatus");
      await updateStatus(key, {
        status: "Done",
      });
      onUpdateData();
      message.success("Update outbound status success!");
    } catch (e) {
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getAllOutbound(dispatch, userWarehouseId);
        getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllCustomer(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isUpdateData]);
  const outbound_columns = [
    {
      title: "DN",
      fixed: "left",
      dataIndex: "DN",
      key: "DN",
      // width: 60,
    },
    {
      title: "Status",
      fixed: "left",
      dataIndex: "status",
      key: "status",
      // width: 60,
      defaultFilteredValue:
        currentTab === "2" ? ["Order"] : currentTab === "3" ? ["Done"] : [""],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Total Value",
      dataIndex: "total_value",
      key: "total_value",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },

    {
      title: "Create Time",
      dataIndex: "create_time",
      key: "create_time",
      // width: 300,
    },
    {
      title: "Update Time",
      dataIndex: "update_time",
      key: "update_time",
      // width: 300,
    },

    // {
    //   title: "Finish at",
    //   dataIndex: "finish_timestamp",
    //   key: "finish_timestamp",
    //   width: 300,
    // },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 230,
      render: (_, record) => {
        return (
          <>
            <a>{<PiEyeBold />}</a>
            <a>
              {<RiCheckboxLine onClick={() => handleEditStatus(record.key)} />}
            </a>
            <a>{<RiPrinterLine />}</a>
            <Tooltip title="Edit" key="edit">
              <a onClick={() => edit(record)}>
                {<RiEditBoxLine size={20} color="purple" />}
              </a>
            </Tooltip>
            <Tooltip title="Delete" key="delete">
              <Popconfirm
                title="Sure to delete?"
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

  const all = (
    <div style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"outbound"}></ToolBar>
      <OutBoundForm
        isModalOpen={isModalOpen}
        handleCancelButton={handleCancel}
        handleOkButton={handleOk}
        onUpdateData={onUpdateData}
        formData={formData}
      />
      <Table
        bordered
        loading={isFetching}
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={outbound_columns}
        dataSource={outboundsList?.map((outbound) => {
          return {
            key: outbound._id,
            DN: outbound.code,
            status: outbound.status,
            customer: outbound.partnerId?.code,
            customerId: outbound.partnerId._id,
            total_value: outbound.total,
            creator: outbound.employeeId?.code,
            trans_details: outbound.transactionDetails,
            // create_time: outbound.updateAt.format("DD-MM-YY HH:MM:SS"),
            // update_time: outbound.updateAt.format("DD-MM-YY HH:MM:SS"),
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: outboundsList?.length,
        }}
        scroll={{
          y: "60vh",
        }}
      />
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
              onMouseEnter={() => setHoveredTab("1")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <img
                src={
                  currentTab === "1" || hoveredTab === "1"
                    ? dnIconActive
                    : dnIcon
                }
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              DN
            </span>
          }
          key="1"
        >
          {all}
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
                    ? orderIconActive
                    : orderIcon
                }
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              ORDER
            </span>
          }
          key="2"
        >
          {all}
        </TabPane>
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={() => setHoveredTab("3")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <img
                src={
                  currentTab === "3" || hoveredTab === "3"
                    ? doneIconActive
                    : doneIcon
                }
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              DONE
            </span>
          }
          key="3"
        >
          {all}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Outbound;
