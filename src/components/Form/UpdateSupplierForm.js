import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";

import { updateSupplier } from "../../redux/apiRequest";
import SubmitButton from "../SubmitButton";
import "./style.css";

const { TextArea } = Input;

function UpdateSupplierForm({
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
        name: values.supplierName,
        email: values.supplierEmail,
        phone_num: values.supplierPhoneNumber,
        address: values.supplierAddress,
      });
      onUpdateData();
      handleOkButton();
      form.resetFields();
      message.success("Add Supplier Success");
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
      supplierAddress: formData.address,
      supplierEmail: formData.email,
      supplierName: formData.name,
      supplierPhoneNumber: formData.phone_num,
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
                message: "Please input your supplier name!",
              },
            ]}
            label={<p>Supplier Name</p>}
            name="supplierName"
          >
            <Input placeholder="Supplier Name" />
          </Form.Item>
          <Form.Item
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

export default UpdateSupplierForm;
