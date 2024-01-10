/* eslint-disable jsx-a11y/anchor-is-valid */
import { Typography, message } from "antd";
import "./style.css";
import { Button, Form, Input, ConfigProvider } from "antd";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const onFinish = (values) => {
  console.log("Success:", values);
};

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userId = user._id;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setIsLoading(false);
  };
  return (
    <Form
      onSubmitCapture={handleLogin}
      layout="vertical"
      className="loginForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <img
        className="logo"
        src={require("../../../assets/images/WarehouseLogo.png")}
        alt=""
        width={150}
      ></img>
      <Typography
        style={{
          fontWeight: "bolder",
          fontSize: 30,
          color: "white",
          marginTop: 0,
          marginBottom: 10,
        }}
      >
        Reset password
      </Typography>
      <Form.Item
        label={<p className="label">New Password</p>}
        name="password"
        rules={[
          {
            required: true,
            message: " Please fill confirm password!",
          },
        ]}
      >
        <Input.Password placeholder="New password" />
      </Form.Item>

      {/* Field */}
      <Form.Item
        label={<p className="label">Confirm Password</p>}
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please fill confirm password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm New Password" />
      </Form.Item>
      <Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "rgba(0, 52, 101, 1)",
              colorBorder: "none",
            },
          }}
        >
          <Button
            loading={isLoading}
            style={{ fontWeight: "bold", color: "white" }}
            block
            size="large"
            type="default"
            htmlType="submit"
          >
            Confirm
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
}

export default ResetPassword;
