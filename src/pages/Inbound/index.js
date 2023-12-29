/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Popconfirm, Table, Tabs, Tooltip, message } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";
import ActionBar from "../../components/ActionBar/actionbar.js";
import {
  RiDeleteBin6Line,
  RiCheckboxLine,
  RiEditBoxLine,
  RiPrinterLine,
} from "react-icons/ri";
import { PiEyeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getAllInbound,
  getAllSupplier,
  getGoodsList,
  getGoodsListByWarehouseId,
  updateStatus,
} from "../../redux/apiRequest.js";
import InBoundForm from "../../components/Form/InBoundForm.js";
import asnIcon from "../../assets/images/asn_icon.png";
import asnIconActive from "../../assets/images/asn_icon_active.png";
import orderInboundIcon from "../../assets/images/oder_inbound_icon.png";
import orderInboundIconActive from "../../assets/images/order_inbound_icon_active.png";
import receiveListIcon from "../../assets/images/receive_list_icon.png";
import receiveListIconActive from "../../assets/images/receive_list_icon_done.png";
import TabPane from "antd/es/tabs/TabPane.js";

function InBound() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);

  const inboundsList = useSelector(
    (state) => state.product.inbound?.allInBounds
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId?.warehouseId;

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

  const handleEditStatus = async (key) => {
    console.log("key", key);
    try {
      console.log("updatestatus");
      await updateStatus(key, {
        status: "Done",
      });
      onUpdateData();
      message.success("Update inbound status success!");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (key) => {
    console.log("key", key);
    try {
      await deleteTransaction(key);

      onUpdateData();
      message.success("Delete inbound success");
    } catch (e) {
      console.log(e);
      console.log("isstring", e.response.data instanceof String);
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

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getAllInbound(dispatch, userWarehouseId);
        getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllSupplier(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isUpdateData]);

  const inbound_columns = [
    {
      title: "ASN",
      fixed: "left",
      dataIndex: "ASN",
      key: "ASN",
      // width: 60,
    },
    {
      title: "Status",
      fixed: "left",
      dataIndex: "status",
      key: "status",
      defaultFilteredValue:
        currentTab === "2" ? ["Order"] : currentTab === "3" ? ["Done"] : [""],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
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
      width: 250,
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
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"inbound"}></ToolBar>
      <InBoundForm
        isModalOpen={isModalOpen}
        handleCancelButton={handleCancel}
        handleOkButton={handleOk}
        onUpdateData={onUpdateData}
        formData={formData}
      ></InBoundForm>
      <Table
        loading={isFetching}
        bordered
        style={{ marginTop: "10px", maxWidth: "85vw" }}
        columns={inbound_columns}
        dataSource={inboundsList?.map((inbound) => {
          return {
            key: inbound._id,
            ASN: inbound.code,
            status: inbound.status,
            supplier: inbound.partnerId.code,
            supplierId: inbound.partnerId._id,
            total_value: inbound.total,
            creator: inbound.employeeId.code,
            trans_details: inbound.transactionDetails,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: inboundsList?.length,
        }}
        scroll={{
          y: "60vh",
        }}
      />
    </div>
  );
  const order = "In order";
  const delivery = "In delivery";
  const done = "Done";

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
                    ? asnIconActive
                    : asnIcon
                }
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              ASN
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
                    ? orderInboundIconActive
                    : orderInboundIcon
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
                    ? receiveListIconActive
                    : receiveListIcon
                }
                alt="goodslist"
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

export default InBound;
