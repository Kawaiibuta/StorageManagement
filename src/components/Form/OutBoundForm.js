import React from "react";
import { Select, Form, Input, InputNumber, Button } from "antd";
import { MdOutlineMargin } from "react-icons/md";

function OutBoundForm() {
  return (
    <>
      <div>
        <h1>OutBound</h1>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item label="OutBound ID:">
            <Input />
          </Form.Item>
          <Form.Item label="Supplier Name">
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
    </>
  );
}

export default OutBoundForm;