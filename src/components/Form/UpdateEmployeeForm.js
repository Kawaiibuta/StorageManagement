import React from 'react';
import {Select,Form,Input, Button, DatePicker} from 'antd';

function NewEmployeeForm() {
  return (
    <>
    <div >
      <h3>New Employee</h3>
     <Form 
     labelCol={{ span: 15 }}
     wrapperCol={{ span: 30 }}
     layout="horizontal"
     style={{ Width: 1800 }}>
        <Form.Item label="Employee Name:">
            <Input />
        </Form.Item>
        <Form.Item label="Employee Type">
          <Select>
            <Select.Option value="Type">Manager</Select.Option>
            <Select.Option value="Type">Employee</Select.Option>
          </Select>
        </Form.Item>    
        <Form.Item label="Address:">
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number:">
          <Input type='phone'/>
        </Form.Item>
        <Form.Item label="Email:">
          <Input type='email'/>
        </Form.Item>
        <Form.Item label="Warehouse">
          <Select>
            <Select.Option value="Warehouse">Warehouse1</Select.Option>
            <Select.Option value="Warehouse">Warehouse2</Select.Option>
          </Select>
        </Form.Item>  
        <Form.Item label="Start Time">
          <DatePicker />
        </Form.Item>
        <Form.Item style={{ paddingLeft: 100}}>
          <Button >Submit</Button>
        </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default NewEmployeeForm