import React, { useState } from "react";

import axios from "axios";
import { Form, Input, Button, Modal, Space, message } from "antd";

const { TextArea } = Input;

function NewWarehouseForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseCapacity, setWarehouseCapacity] = useState("");
  const [warehouseContactEmail, setWarehouseContactEmail] = useState("");
  const [warehouseContactPhoneNum, setWarehouseContactPhoneNum] = useState("");
  const [warehouseDescription, setWarehouseDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ghi");
    const data = {
      managerId: "655fc39d6ba709d3e7f0f6ab",
      name: warehouseName,
      capacity: warehouseCapacity,
      description: warehouseDescription,
      email: warehouseContactEmail,
      phone_num: warehouseContactPhoneNum,
      address: warehouseAddress,
    };

    setIsLoading(true);

    try {
      await axios.post(
        "https://warehousemanagement.onrender.com/api/warehouse",
        data
      );

      message.success("Your warehouse has been added successfully.");
    } catch (e) {
      message.error(e);
    }
    onUpdateData();
    setIsLoading(false);
    // onLoadingChange();
    handleOkButton();
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <Modal
      open={isModalOpen}
      width="500px"
      height="300px"
      // onOk={handleOkButton}
      onCancel={handleCancelButton}
      footer={null}
    >
      <>
        <div>
          <h1>New Warehouse</h1>
          <Form
            onSubmitCapture={handleSubmit}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your warehouse name!",
                },
              ]}
              label="Warehouse Name:"
            >
              <Input
                onChange={(e) => {
                  setWarehouseName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your warehouse address!",
                },
              ]}
              label="Address: "
            >
              <TextArea
                rows={4}
                onChange={(e) => {
                  setWarehouseAddress(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your warehouse capacity!",
                },
              ]}
              label="Capacity:"
            >
              <Input
                type="number"
                onChange={(e) => {
                  setWarehouseCapacity(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your warehouse contact email!",
                },
              ]}
              label="Email:"
            >
              <Input
                onChange={(e) => {
                  setWarehouseContactEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your warehouse contact phone number!",
                },
              ]}
              label="Phone Number:"
            >
              <Input
                onChange={(e) => {
                  setWarehouseContactPhoneNum(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your warehouse description!",
                },
              ]}
              label="Description:"
            >
              <TextArea
                rows={4}
                onChange={(e) => {
                  setWarehouseDescription(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button htmlType="button" onClick={handleCancelButton}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Ok
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </>
    </Modal>
  );
}

export default NewWarehouseForm;
