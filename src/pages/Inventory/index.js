/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import {
  Button,
  Tabs,
} from "antd";
import ToolBar from "../../components/ToolBar/toolbar.js";

import {
  getAllProduct,
} from "../../redux/apiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane.js";
import inventoryIcon from "../../assets/images/inventory_icon.png";
import inventoryIconActive from "../../assets/images/inventory_icon_active.png";
import CustomTable from "../../components/Table/index.js";

function Inventory() {
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [hoveredTab, setHoveredTab] = useState(null);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProductsIncludeDelete
  );
  const userWarehouseId = user?.employeeId?.warehouseId;
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
      title: "Creator",
      dataIndex: "created_by",
      key: "created_by",
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
  ];

  const inventory_product = (
    <div className="InventoryTable" style={{ width: "100%" }}>
      <ToolBar onUpdateData={onUpdateData} type={2} page={"product"}></ToolBar>
      <CustomTable
        isFetching={isFetching}
        columns={inventory_columns}
        dataSource={goodsList?.map((goods) => {
          return {
            key: goods?.id,
            name: goods.name,
            created_by: goods.created_by,
            sku_code: goods.sku_code,
            quantity: goods.quantity,
            description: goods.description,
            image: goods.images.length === 0 ? undefined : goods.images[0].url,
          };
        })}
      />
    </div>
  );

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        getAllProduct(dispatch)
      } catch (e) {
        console.log(e);
      }
      setIsFetching(false);
    }
    fetchData();
  }, [isUpdateData, dispatch, userWarehouseId]);


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
