import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";

import { updateSupplier } from "../../redux/apiRequest";

const { TextArea } = Input;

const SubmitButton = ({ form, isLoading }) => {
  const [submittable, setSubmittable] = React.useState(true);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      loading={isLoading}
    >
      Submit
    </Button>
  );
};

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
      message.success("Add customer Success");
    } catch (e) {
      message.error(e.response.data);
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
        <h1>Update customer</h1>
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          onFinish={handleFinish}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label="customer Name:"
            name="customerName"
          >
            <Input placeholder="customer Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label="Address: "
            name="customerAddress"
          >
            <TextArea placeholder="customer Address" rows={4} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label="PhoneNumber:"
            name="customerPhoneNumber"
          >
            <Input placeholder="customer Phone Number" type="phone" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your customer name!",
              },
            ]}
            label="Email:"
            name="customerEmail"
          >
            <Input placeholder="customer Email" type="email" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button htmlType="button" onClick={handleCancelButton}>
                Cancel
              </Button>
              <SubmitButton form={form} isLoading={isLoading}>
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
