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
  Row,
  Col,
  Divider,
  Flex,
  Upload,
  Badge,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import keyIcon from "../../assets/images/key.png";
import dayjs from "dayjs";

import "./style.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";
import { logoutUser } from "../../redux/apiRequest";

const { Header } = Layout;
const { useToken } = theme;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

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
  const menuStyle = {
    boxShadow: "none",
  };
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <div>
        <Flex justify="space-between" size="middle" align="center">
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
          <Space>
            <h4 style={{ fontWeight: "500" }}>
              {"Hello " + user.employeeId.name}
            </h4>
            <a style={{ padding: 0 }}>
              <Avatar
                size="large"
                icon={<img src={user.employeeId.imageUrl} alt="" />}
              />
            </a>
            <Dropdown
              dropdownRender={(_) => (
                <div style={contentStyle}>
                  {/* <div class="columnLeft">
                    <img src={keyIcon} width={80} alt=""></img>
                    <h3>{user.username}</h3>
                    <p style={{ fontWeight: "500" }}>
                      Role:{" "}
                      {user.isEmployee ? user.employeeId.position : "Admin"}
                    </p>
                  </div> */}
                  {/* <div class="vertical-divider"></div> */}
                  <div class="columnLeft">
                    <h2>User Center</h2>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            defaultBg: "rgba(156, 188, 235, 1)",
                          },
                        },
                      }}
                    >
                      <Button
                        onClick={() => {
                          toggleDrawer(0, true);
                        }}
                        style={{
                          width: "160px",
                          fontWeight: "500",
                          display: "block",
                          margin: "8px",
                        }}
                        icon={<InfoCircleOutlined />}
                      >
                        View User Profile
                      </Button>
                      <Button
                        style={{
                          width: "160px",
                          marginTop: "10px",
                          fontWeight: "500",
                          display: "block",
                          margin: "8px",
                        }}
                        icon={<KeyOutlined />}
                      >
                        Change password
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          logoutUser(
                            user.id,
                            user.accessToken,
                            dispatch,
                            axiosJWT
                          );
                        }}
                        style={{
                          width: "160px",
                          marginTop: "10px",
                          fontWeight: "500",
                          display: "block",
                          margin: "8px",
                        }}
                        icon={<LogoutOutlined />}
                      >
                        Logout
                      </Button>
                    </ConfigProvider>
                  </div>
                </div>
              )}
            >
              <a style={{ padding: 0 }} onClick={(e) => e.preventDefault()}>
                <IoMdArrowDropdown size={30} />
              </a>
            </Dropdown>
          </Space>
        </Flex>

        <Drawer
          title="User Profile"
          placement="right"
          footer="Footer"
          width={640}
          onClose={() => toggleDrawer(0, false)}
          open={open[0]}
          styles={drawerStyles}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button type="primary">Edit profile</Button>
            </Space>
          }
        >
          <p className="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <DescriptionItem title="Username" content={user.username} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Full Name"
                content={user.employeeId.name}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Username" content={user.username} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Address"
                content={user.employeeId.address}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Birthday"
                content={dayjs(user.employeeId.birthday).format(
                  "MMMM DD, YYYY"
                )}
              />
            </Col>
          </Row>

          <Divider />
          <p className="site-description-item-profile-p">Company</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Position"
                content={user.isEmployee ? user.employeeId.position : "Admin"}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="XTech" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content="+86 181 0000 0000"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
        </Drawer>
      </div>
    </Header>
  );
}

export default AppHeader;
