/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";

import { Button, Popconfirm, Tabs, Tooltip, message } from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";

import {
  deleteProduct,
  getAllProduct,
  getCategory,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane.js";
import inventoryIcon from "../../assets/images/inventory_icon.png";
import inventoryIconActive from "../../assets/images/inventory_icon_active.png";
import CustomTable from "../../components/Table/index.js";
import {
  RiCheckboxLine,
  RiDeleteBin6Line,
  RiEditBoxLine,
} from "react-icons/ri";
import NewProductForm from "../../components/Form/NewProductForm.js";
import UpdateProductForm from "../../components/Form/UpdateProductForm.js";

function Inventory() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [formData, setFormData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

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
      await deleteProduct(key);

      onUpdateData();
      message.success("Delete product success");
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

  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );

  const dispatch = useDispatch();
  function onUpdateData() {
    setIsUpdateData(!isUpdateData);
  }

  const inventory_columns = [
    {
      title: "SKU",
      dataIndex: "sku_code",
      key: "sku_code",
      render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "priceFormat",
      key: "priceFormat",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.maximum_quantity - b.maximum_quantity,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, _) => (
        <img src={text} style={{ width: "70px" }} alt="product"></img>
      ),
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <Tooltip title="Edit" key="edit">
              <a style={{marginRight: 10}} onClick={() => edit(record)}>
                {<RiEditBoxLine size={24} color="purple" />}
              </a>
            </Tooltip>

            <Tooltip title="Delete" key="delete">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={
                  record.status === "Delivered"
                    ? null
                    : () => handleDelete(record.key)
                }
              >
                <a>
                  {
                    <RiDeleteBin6Line
                      size={24}
                      color={record.status === "Delivered" ? "gray" : "red"}
                    />
                  }
                </a>
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const inventory_product = (
    <div className="InventoryTable" style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"product"}></ToolBar>

      <CustomTable
        title={"Update Product"}
        form={
          <UpdateProductForm
            isModalOpen={isModalOpen}
            handleCancelButton={handleCancel}
            handleOkButton={handleOk}
            onUpdateData={onUpdateData}
            formData={formData}
          />
        }
        isFetching={isFetching}
        onUpdateData={onUpdateData}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        columns={inventory_columns}
        dataSource={goodsList
          ?.filter((goods) => !goods.is_deleted)
          .map((goods) => {
            return {
              key: goods?.id,
              name: goods.name,
              created_by: goods.created_by,
              sku_code: goods.sku_code,
              quantity: goods.quantity,
              price: goods.price,
              priceFormat: Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(goods.price),
              description: goods.description,
              variants: goods.variants,
              images: goods.images,
              image:
                goods.images.length === 0 ? undefined : goods.images[0].url,
            };
          })}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        await getAllProduct(dispatch);
        await getCategory(dispatch);
      } catch (e) {
        console.log(e);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [dispatch, isUpdateData]);

  const onTabsChange = (key) => {
    console.log(key);
    setCurrentTab(key);
  };

  console.log("goodslist" + goodsList);

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
                    ? inventoryIconActive
                    : inventoryIcon
                }
                alt="goodslist"
                style={{ width: "30px", height: "30px" }}
              />
              INVENTORY
            </span>
          }
          key="1"
        >
          {inventory_product}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Inventory;
