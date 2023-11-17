import React from "react";
import { Select, Form, Input, Button, DatePicker } from "antd";

function NewEmployeeForm() {
  return (
    <>
      <div>
        <h1>New Employee</h1>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item label="Employee Name:">
            <Input />
          </Form.Item>
          <Form.Item label="Employee Type">
            <Select>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Employee">Employee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Address:">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number:">
            <Input type="phone" />
          </Form.Item>
          <Form.Item label="Email:">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Warehouse">
            <Select>
              <Select.Option value="Warehouse1">Warehouse1</Select.Option>
              <Select.Option value="Warehouse2">Warehouse2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Start Time">
            <DatePicker />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default NewEmployeeForm;
