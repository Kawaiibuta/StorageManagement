import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space,Select,DatePicker, InputNumber} from 'antd';

const { TextArea } = Input;


function InventoryReport() {

  return (
    
    <>
    <div >
      <h3> InventoryReport</h3>
     <Form 
      name="dynamic_form_nest_item"
      labelCol={10}
      wrapperCol={12}
      layout="horizontal"
>
        <Form.Item label="Staff Name">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo1</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Inventory Date">
          <DatePicker />
        </Form.Item>
        <Form.List 
        name="products">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8, flexDirection: 'column'}} align = "start"  >
              <Form.Item
                {...restField}
                label="Product Name"
              >
                <Select>
            <Select.Option value="ProductName1">ProductName1</Select.Option>
            <Select.Option value="ProductName2">ProductName2</Select.Option>
            <Select.Option value="ProductName3">ProductName3</Select.Option>
          </Select>
              </Form.Item>

              <Form.Item
                {...restField}
                label="Product Quantity"
              >
          <InputNumber />
              </Form.Item>
              <Form.Item label="Decription:">
                <br></br>
                
          <TextArea rows={4} />
          
        </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add product
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  
        </Form>
    </div>
    </>
  )
}

export default InventoryReport