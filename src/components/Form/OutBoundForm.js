import React from 'react';
import {Select,Form,Input, InputNumber, Button} from 'antd';
import { MdOutlineMargin } from 'react-icons/md';

function OutBoundForm() {
  return (
    <>
    <div >
        <h3>OutBound</h3>
     <Form 
     labelCol={{ span: 15 }}
     wrapperCol={{ span: 30 }}
     layout="horizontal"
     style={{ Width: 1800 }}>
        <Form.Item label="OutBound ID:">
            <Input />
        </Form.Item>
        <Form.Item label="Supplier Name">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo1</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Product Name:">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity:">
          <InputNumber />
        </Form.Item>
        <Form.Item style={{ paddingLeft: 100}}>
          <Button >Submit</Button>
        </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default OutBoundForm