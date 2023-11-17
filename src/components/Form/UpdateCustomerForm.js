import React from 'react';
import {Form,Input, Button} from 'antd';

const { TextArea } = Input;

function UpdateCustomerForm() {
  return (
    <>
    <div>
      <h3>Update Customer</h3>
     <Form 
     labelCol={{ span: 15 }}
     wrapperCol={{ span: 30 }}
     layout="horizontal"
     style={{ Width: 1800 }}>
        <Form.Item label="Customer Name:">
            <Input />
        </Form.Item>
        <Form.Item label="Address: ">
            <TextArea rows={4}/>
        </Form.Item>
        <Form.Item label="PhoneNumber:">
          <Input type='phone'/>
        </Form.Item>
        <Form.Item label="Email:">
          <Input type='email'/>
        </Form.Item>
        <Form.Item style={{ paddingLeft: 100}}>
          <Button >Submit</Button>
        </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default UpdateCustomerForm  