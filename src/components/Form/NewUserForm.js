import React from 'react';
import {Select,Form,Input, InputNumber, Button} from 'antd';

function NewUserForm() {
  return (
    <>
    <div >
      <h3>New User</h3>
     <Form 
     labelCol={{ span: 15 }}
     wrapperCol={{ span: 30 }}
     layout="horizontal"
     style={{ Width: 1800 }}>
        <Form.Item label="Employee Name:">
            <Input />
        </Form.Item>
        <Form.Item label="Employee Role">
          <Select>
            <Select.Option value="Type">Manager</Select.Option>
            <Select.Option value="Type">Employee</Select.Option>
          </Select>
        </Form.Item>    
        <Form.Item label="Username:">
          <Input />
        </Form.Item>
        <Form.Item label="Password:">
          <Input type='password'/>
        </Form.Item>
        <Form.Item style={{ paddingLeft: 100}}>
          <Button >Submit</Button>
        </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default NewUserForm