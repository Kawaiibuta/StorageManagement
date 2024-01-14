/* eslint-disable jsx-a11y/anchor-is-valid */
import { Typography, message } from "antd";
import "./style.css";
import { Button, Form, Input, ConfigProvider } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUser = {
      username: username,
      password: password,
    };
    try {
      await loginUser(newUser, dispatch);
      navigate("/");
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
      onFinishFailed={onFinishFailed}
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
        Login
      </Typography>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
        label={<p className="label">Username</p>}
        name="username"
      >
        <Input
          size="large"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        label={<p className="label">Password</p>}
        name="password"
      >
        <Input.Password
          size="large"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <a
          onClick={() => navigate("/auth/forgot")}
          style={{
            color: "white",
            fontSize: "15px",
            textDecoration: "underline",
          }}
          className="login-form-forgot"
        >
          Forgot password
        </a>
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
            Sign in
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
}

export default Login;
