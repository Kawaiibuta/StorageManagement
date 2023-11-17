import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Select, Form, Input, InputNumber, Button, Upload } from "antd";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function NewProductForm() {
  return (
    <>
      <div>
        <h1>New Product</h1>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item label="Product Name:">
            <Input />
          </Form.Item>
          <Form.Item label="SKU:">
            <Input />
          </Form.Item>
          <Form.Item label="Supplier Name">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo1">Demo1</Select.Option>
              <Select.Option value="demo2">Demo2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price:">
            <Input />
          </Form.Item>
          <Form.Item label="Unit:">
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Specification">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Warehouse">
            <Select>
              <Select.Option value="Warehouse1">Warehouse1</Select.Option>
              <Select.Option value="Warehouse2">Warehouse2</Select.Option>
              <Select.Option value="Warehouse3">Warehouse3</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default NewProductForm;
