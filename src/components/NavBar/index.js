import React, { useState } from "react";
import "./style.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Outbound from "../../routes/Outbound";
const { Header, Sider, Content } = Layout;

const dividerItem = {
  type: "divider",
};

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Dashboard",
    style: { padding: 30 },
  },
  dividerItem,
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Inbound",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Outbound",
  },
  dividerItem,
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "Inventory",
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: "Goods List",
  },
  {
    key: "6",
    icon: <UploadOutlined />,
    label: "Partner",
  },
  dividerItem,
  {
    key: "7",
    icon: <UploadOutlined />,
    label: "Staff",
  },
  {
    key: "8",
    icon: <UploadOutlined />,
    label: "Warehouse",
    title: "Interconnection",
  },
];

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        width={"15%"}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          backgroundColor: colorBgContainer,

          margin: "auto",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ fontSize: 20, fontWeight: 500 }}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outbound></Outbound>
        </Content>
      </Layout>
    </Layout>
  );
}
