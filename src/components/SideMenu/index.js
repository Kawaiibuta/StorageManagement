import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const dividerItem = {
  type: "divider",
};

const items = [
  {
    key: "/dashboard",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  dividerItem,
  {
    key: "/inbound",
    icon: <VideoCameraOutlined />,
    label: "Inbound",
  },
  {
    key: "/outbound",
    icon: <UploadOutlined />,
    label: "Outbound",
  },
  dividerItem,
  {
    key: "/inventory",
    icon: <UploadOutlined />,
    label: "Inventory",
  },
  {
    key: "/goods-list",
    icon: <UploadOutlined />,
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
    icon: <UploadOutlined />,
    label: "Staff",
  },
  {
    key: "/warehouse-interconnection",
    icon: <UploadOutlined />,
    label: <span>Warehouse {"\n"}interconnection</span>,
    style: {},
  },
];

export default function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        theme="light"
        defaultSelectedKeys={["1"]}
        style={{ fontWeight: 500, width: 200 }}
        items={items}
        onClick={(item) => {
          navigate(item.key);
        }}
      ></Menu>
    </div>
  );
}
