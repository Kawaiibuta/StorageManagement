/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Table, message } from "antd";
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
} from "../../redux/apiRequest.js";
import InBoundForm from "../../components/Form/InBoundForm.js";

function InBound() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();

  const inboundsList = useSelector(
    (state) => state.product.inbound?.allInBounds
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
    console.log("key", key);
    try {
      await deleteTransaction(key);

      onUpdateData();
      message.success("Delete inbound success");
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
        await getAllInbound(dispatch);
        getGoodsList(dispatch);
        getAllSupplier(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
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
      // width: 60,
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

export default InBound;
