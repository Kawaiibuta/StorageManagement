import React from "react";
import { Select, Form, Input, InputNumber, Button } from "antd";

function InBoundForm() {
  return (
    <div>
      <h1>InBound</h1>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
      >
        <Form.Item label="InBound ID:">
          <Input />
        </Form.Item>
        <Form.Item label="Customer Name">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo1">Demo1</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Product Name:">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity:">
          <InputNumber />
        </Form.Item>
      </Form>
    </div>
  );
}

export default InBoundForm;
