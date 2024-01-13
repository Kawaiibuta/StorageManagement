import React, { useState } from "react";
import { Form, Input, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import "./style.css";

const { TextArea } = Input;

function NewSupplierForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [form] = useForm();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;
  const [isLoading, setIsLoading] = useState(false);
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const handleFinish = async (values) => {
    console.log(values);
    console.log("warehouseid", userWarehouseId);
    setIsLoading(true);
    try {
      await axios.post("https://warehousemanagement.onrender.com/api/partner", {
        name: values.supplierName,
        type: "Supplier",
        email: values.supplierEmail,
        phone_num: values.supplierPhoneNumber,
        address: values.supplierAddress,
        warehouseId: userWarehouseId,
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
  return (
    <>
      <CustomForm
        form={
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
        }
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        marginTop={100}
        title="New Supplier"
      />
      {/* <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
      >
        <div>
          <h1>New Supplier</h1>
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
                  message: "Please input your supplier name!",
                },
              ]}
              label="Supplier Name:"
              name="supplierName"
            >
              <Input placeholder="Supplier Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="Address: "
              name="supplierAddress"
            >
              <TextArea placeholder="Supplier Address" rows={4} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="PhoneNumber:"
              name="supplierPhoneNumber"
            >
              <Input placeholder="Supplier Phone Number" type="phone" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="Email:"
              name="supplierEmail"
            >
              <Input placeholder="Supplier Email" type="email" />
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

export default NewSupplierForm;
