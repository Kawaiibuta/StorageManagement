import React, { useEffect, useState } from "react";
import { Form, Space, Input, message } from "antd";

import { useSelector } from "react-redux";

import CustomForm from "../../CustomForm";
import SubmitButton from "../../SubmitButton";
import { changePassword } from "../../../redux/apiRequest";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function ChangePasswordForm({
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      const data = {
        newPassword: values.password,
        oldPassword: values.oldPassword,
        // id: user._id,
      };
      console.log("data", user.accessToken);
      await changePassword(data, user.accessToken, user._id);
      handleOkButton();
      form.resetFields();
      message.success("Change password success");
    } catch (e) {
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomForm
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        marginTop={20}
        title="Change Password"
        form={
          <Form
            className="formLabel"
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            labelAlign="left"
            onFinish={handleFinish}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
              ]}
              label={<p>Old Password</p>}
              name="oldPassword"
            >
              <Input.Password placeholder="Old Password" />
            </Form.Item>
            <Form.Item
              label={<p>New Password</p>}
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>

            {/* Field */}
            <Form.Item
              label={<p>Confirm Password</p>}
              name="password2"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            {/* <Form.Item
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Please input your supplier name!",
            },
          ]}
          label={<p>Address</p>}
          name="supplierAddress"
        >
          <TextArea placeholder="Supplier Address" rows={4} />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Please input your supplier name!",
            },
          ]}
          label={<p>Phone Number</p>}
          name="supplierPhoneNumber"
        >
          <Input placeholder="Supplier Phone Number" type="phone" />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Please input your supplier name!",
            },
          ]}
          label={<p>Email</p>}
          name="supplierEmail"
        >
          <Input placeholder="Supplier Email" type="email" />
        </Form.Item> */}
            <Form.Item {...tailLayout}>
              <Space>
                <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                  Ok
                </SubmitButton>
              </Space>
            </Form.Item>
          </Form>
        }
      />
    </>
  );
}

export default ChangePasswordForm;
