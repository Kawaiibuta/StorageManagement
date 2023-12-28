import React from "react";
import { Select, Form, Input, InputNumber, Button } from "antd";

function UpdateUserForm() {
  return (
    <>
      <div>
        <h1>Update User</h1>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item label="Employee Name:">
            <Input />
          </Form.Item>
          <Form.Item label="Employee Role">
            <Select>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Employee">Employee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Username:">
            <Input />
          </Form.Item>
          <Form.Item label="Password:">
            <Input type="password" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateUserForm;
