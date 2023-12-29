/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Layout,
  theme,
  Button,
  Avatar,
  Space,
  Dropdown,
  ConfigProvider,
  Drawer,
} from "antd";

import { logoutUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { useState } from "react";
const { Header } = Layout;

function AppHeader({ collapsed, setCollapsed }) {
  const [open, setOpen] = useState([false, false]);

  const toggleDrawer = (idx, target) => {
    setOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const drawerStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      boxShadow: "-10px 0 10px #666",
    },
  };
  const user = useSelector((state) => state.auth.login?.currentUser);

  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const id = user?._id;
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={async () => {
            try {
              await logoutUser(id, accessToken, dispatch, axiosJWT);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Logout
        </a>
      ),
      danger: true,
    },
  ];
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          // alignItems: "flex-start",
          display: "flex",
          justifyContent: "space-between",

          // verticalAlign: "middle",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={setCollapsed}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <a
          onClick={() => {
            toggleDrawer(0, true);
          }}
        >
          <Avatar
            style={{}}
            size="large"
            icon={<img src={user.employeeId.imageUrl} alt="" />}
          />
        </a>
        <Drawer
          title="Basic Drawer"
          placement="right"
          footer="Footer"
          onClose={() => toggleDrawer(0, false)}
          open={open[0]}
          styles={drawerStyles}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <ConfigProvider
          drawer={{
            styles: drawerStyles,
          }}
        >
          <Drawer
            title="Basic Drawer"
            placement="right"
            footer="Footer"
            onClose={() => toggleDrawer(1, false)}
            open={open[1]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </ConfigProvider>
        <Drawer
          title="Basic Drawer"
          placement="right"
          footer="Footer"
          onClose={() => toggleDrawer(0, false)}
          open={open[0]}
          styles={drawerStyles}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <ConfigProvider
          drawer={{
            styles: drawerStyles,
          }}
        >
          <Drawer
            title="Basic Drawer"
            placement="right"
            footer="Footer"
            onClose={() => toggleDrawer(1, false)}
            open={open[1]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </ConfigProvider>
      </div>
    </Header>
  );
}

export default AppHeader;
