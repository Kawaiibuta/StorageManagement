import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Select,Form,Input, InputNumber, Button,  Upload,} from 'antd';

const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

function UpdateProductForm() {
  return (
    <>
    <div >
        <h3>UpdateProduct</h3>
     <Form 
     labelCol={{ span: 15 }}
     wrapperCol={{ span: 30 }}
     layout="horizontal"
     style={{ Width: 1800 }}>
        <Form.Item label="Product Name:">
            <Input />
        </Form.Item>
        <Form.Item label="SKU:">
          <Input />
        </Form.Item>
        <Form.Item label="Supplier Name">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo1</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price:">
          <Input />
        </Form.Item>
        <Form.Item label="Unit:">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Image" valuePropName="fileList" getValueFromEvent={normFile}>
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
            <Select.Option value="Warehouse">Warehouse1</Select.Option>
            <Select.Option value="Warehouse">DWarehouse2</Select.Option>
            <Select.Option value="Warehouse">Warehouse3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ paddingLeft: 100}}>
          <Button >Submit</Button>
        </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default UpdateProductForm