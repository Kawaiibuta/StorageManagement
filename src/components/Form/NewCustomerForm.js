import React, { useState } from "react";
import { Form, Input, Button, Modal, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";

const { TextArea } = Input;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function NewCustomerForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      await axios.post("https://warehousemanagement.onrender.com/api/partner", {
        name: values.customerName,
        type: "Customer",
        email: values.customerEmail,
        phone_num: values.customerPhoneNumber,
        address: values.customerAddress,
        warehouseId: userWarehouseId,
      });
      onUpdateData();
      handleOkButton();
      form.resetFields();
      message.success("Add Customer Success");
    } catch (e) {
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomForm
        form={
          <Form
            className="formLabel"
            onFinish={handleFinish}
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
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
              <Input placeholder="Customer Name" />
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
              <TextArea placeholder="Customer Address" rows={4} />
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
              <Input placeholder="Customer Phone Number" type="phone" />
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
              <Input placeholder="Customer Email" type="email" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                  Ok
                </SubmitButton>
              </Space>
            </Form.Item>
          </Form>
        }
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        marginTop={100}
        title="New Customer"
      />
      {/* <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
      >
        {" "}
        <div>
          <h1>New Customer</h1>
          <Form
            onFinish={handleFinish}
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your customer name!",
                },
              ]}
              label="Customer Name:"
              name="customerName"
            >
              <Input placeholder="Customer Name" />
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
              <TextArea placeholder="Customer Address" rows={4} />
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
              <Input placeholder="Customer Phone Number" type="phone" />
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
              <Input placeholder="Customer Email" type="email" />
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
      </Modal> */}
    </>
  );
}

export default NewCustomerForm;
