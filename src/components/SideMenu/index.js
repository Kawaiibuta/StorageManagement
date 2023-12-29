import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  MdSpeakerNotes,
  MdRvHookup,
  MdShopTwo,
  MdAssignmentInd,
  MdSettings,
  MdAutoGraph,
  MdOutlineMultilineChart,
} from "react-icons/md";
import { ConfigProvider, Menu, Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import WarehouseLogo from "../../assets/images/WarehouseLogo.png";
const { Sider } = Layout;

const dividerItem = {
  type: "divider",
};

const items = [
  dividerItem,
  {
    key: "/",
    icon: <MdAutoGraph />,
    label: "Dashboard",
  },
  dividerItem,
  {
    key: "/inbound",
    icon: <MdSpeakerNotes />,
    label: "Inbound",
  },
  {
    key: "/outbound",
    icon: <MdRvHookup />,
    label: "Outbound",
  },
  dividerItem,
  {
    key: "/inventory",
    icon: <MdOutlineMultilineChart />,
    label: "Inventory",
  },
  {
    key: "/goods-list",
    icon: <MdShopTwo />,

    label: "Goods List",
  },
  {
    key: "/partner",
    icon: <UploadOutlined />,
    label: "Partner",
  },
  dividerItem,
  {
    key: "/staff",
    icon: <MdAssignmentInd />,
    label: "Staff",
  },
  {
    key: "/warehouse-interconnection",
    icon: <MdSettings />,
    label: "Warehouse interconnection",
  },
];

export default function SideMenu({ collapsed }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <Sider
      style={{ backgroundColor: "white" }}
      trigger={null}
      collapsed={collapsed}
      collapsible
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              iconSize: 20,
              fontSize: 18,
              itemHeight: 50,
              iconMarginInlineEnd: 20,
              selectable: false,
              // collapsedIconSize: 20,
            },
          },
        }}
      >
        {collapsed ? null : (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <img
              src={WarehouseLogo}
              alt="Logo"
              style={{ height: "100px", width: "auto" }}
            />
          </div>
        )}
        <Menu
          // className="SideMenuVertical"
          theme="light"
          mode="inline"
          selectedKeys={[selectedKeys]}
          defaultSelectedKeys={["1"]}
          style={{ fontWeight: 500 }}
          items={items}
          onClick={(item) => {
            navigate(item.key);
          }}
        ></Menu>
      </ConfigProvider>
    </Sider>
  );
}
