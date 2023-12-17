import React from "react";
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
import { ConfigProvider, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const dividerItem = {
  type: "divider",
};

const items = [
  {
    key: "/dashboard",
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
    label: <span>Warehouse interconnection</span>,
  },
];

export default function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              iconSize: 18,
              fontSize: 18,
              itemHeight: 50,
              iconMarginInlineEnd: 20,
            },
          },
        }}
      >
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
      </ConfigProvider>
    </div>
  );
}
