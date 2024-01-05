import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";

import { updateSupplier } from "../../redux/apiRequest";
import SubmitButton from "../SubmitButton";
import "./style.css";

const { TextArea } = Input;

function UpdateCustomerForm({
  onUpdateData,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  console.log("formdata", formData);
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const handleFinish = async (values) => {
    console.log("values", values);
    setIsLoading(true);
    try {
      await updateSupplier(formData.key, {
        name: values.customerName,
        email: values.customerEmail,
        phone_num: values.customerPhoneNumber,
        address: values.customerAddress,
      });
      onUpdateData();
      handleOkButton();
      form.resetFields();
      message.success("Update customer success");
    } catch (e) {
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      customerAddress: formData.address,
      customerEmail: formData.email,
      customerName: formData.name,
      customerPhoneNumber: formData.phone_num,
    });
  }, [formData, form]);

  return (
    <>
      <div>
        <Form
          className="formLabel"
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          onFinish={handleFinish}
        >
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label={<p>Customer Name</p>}
            name="customerName"
          >
            <Input placeholder="customer Name" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label={<p>Address</p>}
            name="customerAddress"
          >
            <TextArea placeholder="customer Address" rows={4} />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label={<p>Phone Number</p>}
            name="customerPhoneNumber"
          >
            <Input placeholder="customer Phone Number" type="phone" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label={<p>Email</p>}
            name="customerEmail"
          >
            <Input placeholder="customer Email" type="email" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                Ok
              </SubmitButton>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateCustomerForm;
