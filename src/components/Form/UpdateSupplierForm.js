import React from "react";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;

function UpdateSupplierForm() {
  return (
    <>
      <div>
        <h1>Update Supplier</h1>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item label="Supplier Name:">
            <Input />
          </Form.Item>
          <Form.Item label="Address: ">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="PhoneNumber:">
            <Input type="phone" />
          </Form.Item>
          <Form.Item label="Email:">
            <Input type="email" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateSupplierForm;
