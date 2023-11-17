import { Typography } from "antd";
import "./style.css";
import { Button, Form, Input, ConfigProvider } from "antd";
const { Title } = Typography;
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  return (
    <div className="background">
      <Form
        layout="vertical"
        className="loginForm"
        // name="basic"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        // style={{
        //   maxWidth: 600,
        //   textAlign: "center",
        // }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <img
          className="logo"
          src={require("../../assets/images/WarehouseLogo.png")}
          alt=""
          width={200}
          // width={150}
          // height={100}
          // style={{ margin: 0, padding: 0, textAlign: "center" }}
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
          label={<p className="label">Username</p>}
          name="username"

          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your username!",
          //   },
          // ]}
        >
          <Input size="large" placeholder="Enter Username" />
        </Form.Item>

        <Form.Item
          label={<p className="label">Password</p>}
          name="password"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your password!",
          //   },
          // ]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

        <Form.Item
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "rgba(0, 52, 101, 1)",
                colorBorder: "none",
              },
            }}
          >
            <Button
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
    </div>
  );
}

export default Login;
