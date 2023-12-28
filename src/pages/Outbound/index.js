/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table, message } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getAllCustomer,
  getAllOutbound,
  getAllSupplier,
  getGoodsList,
} from "../../redux/apiRequest.js";
import {
  RiDeleteBin6Line,
  RiCheckboxLine,
  RiEditBoxLine,
  RiPrinterLine,
} from "react-icons/ri";
import { PiEyeBold } from "react-icons/pi";
import OutBoundForm from "../../components/Form/OutBoundForm.js";

function Outbound() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();

  const outboundsList = useSelector(
    (state) => state.product.outbound?.allOutbounds
  );

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
      message.success("Delete partner success");
    } catch (e) {
      console.log(e);
      // message.error("Something went wrong");
      message.error(e.response.data);
    }
  };

  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getAllOutbound(dispatch);
        getGoodsList(dispatch);
        getAllCustomer(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
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
            <a>{<RiCheckboxLine />}</a>
            <a>{<RiPrinterLine />}</a>
            <a onClick={() => edit(record)}>{<RiEditBoxLine />}</a>
            <a onClick={() => handleDelete(record.key)}>
              {<RiDeleteBin6Line />}
            </a>
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
            customer: outbound.partnerId.code,
            customerId: outbound.partnerId._id,
            total_value: outbound.total,
            creator: outbound.employeeId.code,
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

  return (
    <div>
      <TabView
        tabs={[
          { name: "ALL", content: all },
          { name: "Order", content: order },
          { name: "Delivery", content: delivery },
          { name: "Done", content: done },
        ]}
      />
    </div>
  );
}

export default Outbound;
