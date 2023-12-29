/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TabView from "../../components/Button Header/TabView";
import { Image, Modal, Popconfirm, Table, Tabs, Tooltip, message } from "antd";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";

import ToolBar from "../../components/ToolBar/toolbar.js";

import { PiEyeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllSupplier,
  getAllWarehouses,
  getGoodsListByWarehouseId,
} from "../../redux/apiRequest.js";
import goodsListIcon from "../../assets/images/goods_list_icon.png";

import UpdateProductForm from "../../components/Form/UpdateProductForm.js";
import TabPane from "antd/es/tabs/TabPane.js";

function GoodsList() {
  const [isFetching, setIsFetching] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUpdateData, setIsUpdateData] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );
  const userWarehouseId = useSelector(
    (state) => state.auth.login?.currentUser.employeeId.warehouseId
  );

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
      await deleteProduct(key);
      onUpdateData();
      message.success("Delete product success");
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

  const good_columns = [
    {
      title: "SKU",
      width: 110,
      dataIndex: "sku_code",
      key: "sku_code",
      fixed: "left",
    },
    {
      title: "Full Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },

    {
      title: "Supplier",
      dataIndex: "supplier_name",
      key: "supplier_name",
      width: 200,
      sorter: true,
    },
    {
      title: "Maximum Quantity",
      dataIndex: "maximum_quantity",
      key: "maximum_quantity",
      width: 200,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.maximum_quantity - b.maximum_quantity,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 200,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 200,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.unit - b.unit,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (text, _) => (
        <div>
          <a
            onClick={() => {
              setImageUrl(text);
              console.log(imageUrl);
              setVisible(true);
            }}
          >
            {<PiEyeBold />}
          </a>
        </div>
      ),
    },
    {
      title: "Specification",
      dataIndex: "specification",
      key: "specification",
      width: 200,
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse_name",
      key: "warehouse_name",
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
              {<RiEditBoxLine size={20} color="purple" />}
            </a>
          </Tooltip>
          <Tooltip title="Delete" key="delete">
            <Popconfirm
              title="Sure to delete product?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>{<RiDeleteBin6Line size={20} />}</a>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const goodslist = (
    <div
      style={{
        width: "100%",
      }}
    >
      <ToolBar onUpdateData={onUpdateData} type={2} page={"product"}></ToolBar>
      <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UpdateProductForm
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
        columns={good_columns}
        dataSource={goodsList?.map((goods) => {
          return {
            key: goods?._id,
            name: goods.name,
            sku_code: goods.skuCode,
            supplier_name: goods.supplierId?.code,
            supplier_id: goods.supplierId?._id,
            maximum_quantity: goods.maximumQuantity,
            price: goods.price,
            unit: goods.unit,
            image: goods.imageUrl,
            specification: goods.specification,
            warehouse_name: goods.warehouseId?.code,
            warehouse_id: goods.warehouseId?._id,
          };
        })}
        pagination={{
          showQuickJumper: true,
          total: goodsList?.length,
        }}
        scroll={{
          x: 1800,
          y: "60vh",
        }}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        await getGoodsListByWarehouseId(dispatch, userWarehouseId);
        getAllSupplier(dispatch);
        getAllWarehouses(dispatch);
      } catch (e) {
        console.log(e);
      }

      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  return (
    // <div style={{ width: "100%" }}>
    //   <TabView tabs={[{ name: "Goods List", content: goodslist }]} />
    //   <Image
    //     width={200}
    //     style={{
    //       display: "none",
    //     }}
    //     src={imageUrl}
    //     preview={{
    //       visible,
    //       src: imageUrl,
    //       onVisibleChange: (value) => {
    //         setVisible(value);
    //       },
    //     }}
    //   />
    // </div>
    <div style={{ margin: "0px 16px" }}>
      <Tabs size="large" defaultActiveKey="1">
        <TabPane
          tab={
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={goodsListIcon}
                alt="goodslist"
                style={{ width: "30px", height: "30px" }}
              />
              GOODS LIST
            </span>
          }
          key="1"
        >
          {goodslist}
        </TabPane>
      </Tabs>
    </div>
  );
}
export default GoodsList;
