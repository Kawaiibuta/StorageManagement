/* eslint-disable react-hooks/exhaustive-deps */
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
  Form,
  Input,
  DatePicker,
  message,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import { IoMdArrowDropdown } from "react-icons/io";

import dayjs from "dayjs";

import "./style.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { logoutUser, updateEmployee } from "../../redux/apiRequest";
import axios from "axios";
import ChangePasswordForm from "../Auth/ChangePasswordForm";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { useToken } = theme;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function AppHeader({ collapsed, setCollapsed }) {
  const [open, setOpen] = useState([false, false]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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

  const [isEditting, setIsEditting] = useState(false);
  const accessToken = user?.accessToken;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const id = user?._id;
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const getCurrentEmployeeInfo = async (id) => {
    return await axios.get(
      `https://warehousemanagement.onrender.com/api/employee/${id}`
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCurrentEmployeeInfo(user?.employeeId._id);
        setUserData(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [isButtonLoading]);

  console.log("data", userData);

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
              {"Hello " + user?.employeeId.name}
            </h4>
            <a style={{ padding: 0 }}>
              <Avatar
                size="large"
                icon={<img src={user?.employeeId.imageUrl} alt="" />}
              />
            </a>
            <ChangePasswordForm
              handleCancelButton={handleCancel}
              handleOkButton={handleOk}
              isModalOpen={isModalOpen}
            />
            <Dropdown
              dropdownRender={(_) => (
                <div style={contentStyle}>
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
                        onClick={showModal}
                      >
                        Change password
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={async (values) => {
                          try {
                            navigate("/auth/login");
                            await logoutUser(
                              id,
                              accessToken,
                              dispatch,
                              axiosJWT
                            );
                          } catch (e) {
                            console.log(e);
                            message.error(
                              typeof e.response.data === "string"
                                ? e.response.data
                                : "Something went wrong!"
                            );
                          }
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
        <Form form={form}>
          <Drawer
            title="User Profile"
            placement="right"
            width={640}
            onClose={() => toggleDrawer(0, false)}
            open={open[0]}
            styles={drawerStyles}
            extra={
              <Form.Item>
                <Button
                  loading={isButtonLoading}
                  htmlType="submit"
                  onClick={() => {
                    setIsEditting(!isEditting);

                    if (isEditting) {
                      form
                        .validateFields()
                        .then(async (values) => {
                          console.log("values", values);
                          // form.resetFields();
                          const formDt = new FormData();
                          setButtonLoading(true);
                          formDt.append("name", values.name);

                          formDt.append(
                            "birthday",
                            values.birthday.format("DD/MM/YYYY")
                          );
                          formDt.append("email", values.email);
                          formDt.append("phone_num", values.phoneNum);
                          formDt.append("address", values.address);

                          // Append the file to form data
                          if (values.avatar) {
                            formDt.append(
                              "image",
                              values.avatar?.file.originFileObj
                            );
                          }
                          console.log(formDt);

                          // Make the POST request with axios
                          await updateEmployee(user?.employeeId._id, formDt);
                          // console.log(data);

                          message.success("Update employee success");

                          setButtonLoading(false);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }
                    setButtonLoading(false);
                  }}
                  type="primary"
                >
                  {isEditting ? "Save Changes" : "Edit profile"}
                </Button>
              </Form.Item>
            }
          >
            <p className="site-description-item-profile-p">Personal</p>
            <Row>
              <Col span={12} style={{ marginRight: "16px" }}>
                {!isEditting ? (
                  <DescriptionItem
                    title="Avatar"
                    content={
                      <Avatar size={50} src={user?.employeeId.imageUrl} />
                    }
                  />
                ) : (
                  <Form.Item name="avatar" label="Avatar">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{
                            width: "100%",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                )}
              </Col>
              {/* <Col span={12}>
                <DescriptionItem title="Username" content={user.username} />
                <Form>
                <Form.Item name="Username" label={<p>Select Employee</p>}>
                  <Input />
                </Form.Item>
              </Form>
              </Col> */}
            </Row>
            <Row>
              <Col span={11} style={{ marginRight: "16px" }}>
                {!isEditting ? (
                  <DescriptionItem
                    title="Full Name"
                    content={userData && userData?.name}
                  />
                ) : (
                  <Form.Item
                    initialValue={userData && userData?.name}
                    name="name"
                    label={<p>Full Name</p>}
                  >
                    <Input />
                  </Form.Item>
                )}
              </Col>
              <Col span={11} style={{ marginRight: "16px" }}>
                <DescriptionItem title="Username" content={user?.username} />
              </Col>
            </Row>
            <Row>
              <Col span={11} style={{ marginRight: "16px" }}>
                {!isEditting ? (
                  <DescriptionItem
                    title="Address"
                    content={userData && userData?.contactId.address}
                  />
                ) : (
                  <Form.Item
                    initialValue={userData && userData?.contactId.address}
                    name="address"
                    label={<p>Address</p>}
                  >
                    <Input />
                  </Form.Item>
                )}
              </Col>
              <Col span={11} style={{ marginRight: "16px" }}>
                {!isEditting ? (
                  <DescriptionItem
                    title="Birthday"
                    content={dayjs(userData && userData?.birthday).format(
                      "MMMM DD, YYYY"
                    )}
                  />
                ) : (
                  <Form.Item
                    initialValue={dayjs(userData && userData?.birthday)}
                    name="birthday"
                    label={<p>Birthday</p>}
                  >
                    <DatePicker />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Divider />
            <p className="site-description-item-profile-p">Warehouse</p>
            <Row>
              <Col span={11} style={{ marginRight: "16px" }}>
                <DescriptionItem
                  title="Position"
                  content={user?.isEmployee ? userData?.position : "Admin"}
                />
              </Col>
              <Col span={11} style={{ marginRight: "16px" }}>
                <DescriptionItem
                  title="Start Date"
                  content={dayjs(userData?.startDate).format("MMMM DD, YYYY")}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} style={{ marginRight: "16px" }}>
                <DescriptionItem
                  title="Working at"
                  content={
                    user?.isEmployee &&
                    userData?.warehouseId?.code +
                      " - " +
                      userData?.warehouseId?.name
                  }
                />
              </Col>
              {/* <Col span={11} style={{ marginRight: "16px" }}>
                <DescriptionItem
                  title="Start Date"
                  content={dayjs(userData?.startDate).format("MMMM DD, YYYY")}
                />
              </Col> */}
            </Row>

            <Divider />
            <p className="site-description-item-profile-p">Contacts</p>
            <Row>
              <Col span={11} style={{ marginRight: "5px" }}>
                {!isEditting ? (
                  <DescriptionItem
                    title="Email"
                    content={userData?.contactId.email}
                  />
                ) : (
                  <Form.Item
                    initialValue={userData?.contactId.email}
                    name="email"
                    label={<p>Email</p>}
                  >
                    <Input type="email" />
                  </Form.Item>
                )}
              </Col>
              <Col span={12}>
                {!isEditting ? (
                  <DescriptionItem
                    title="Phone"
                    content={userData?.contactId.phone_num}
                  />
                ) : (
                  <Form.Item
                    initialValue={userData?.contactId.phone_num}
                    name="phoneNum"
                    label={<p>Phone Number</p>}
                  >
                    <Input />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Drawer>
        </Form>
      </div>
    </Header>
  );
}

export default AppHeader;
