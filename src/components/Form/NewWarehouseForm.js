import React from "react";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;

function NewWarehouseForm() {
  return (
    <>
      <div>
        <h1>New Warehouse</h1>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item label="Warehouse Name:">
            <Input />
          </Form.Item>
          <Form.Item label="Address: ">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Capacity:">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Contact:">
            <Input />
          </Form.Item>
          <Form.Item label="Description:">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default NewWarehouseForm;
