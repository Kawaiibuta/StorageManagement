import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Space,
  Card,
  Select,
  DatePicker,
  InputNumber,
  Modal,
} from "antd";
import FormItem from "antd/es/form/FormItem";

const { TextArea } = Input;

function InventoryReport({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  return (
    <>
      <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
      >
        <div>
          <h1> InventoryReport</h1>
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
          >
            <Form.Item label="Staff Name">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
                <Select.Option value="demo1">Demo1</Select.Option>
                <Select.Option value="demo2">Demo2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Inventory Date">
              <DatePicker />
            </Form.Item>
            <Form.List name="products" display="flex">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map(({ key, name, ...restField }) => (
                    <Space>
                      <Card
                        style={{ width: "450px" }}
                        title={`Item ${name + 1}`}
                        key={key}
                        extra={
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(name);
                            }}
                          />
                        }
                      >
                        <Form.Item
                          {...restField}
                          label="Product Name"
                          align="start"
                        >
                          <Select>
                            <Select.Option value="Product1">
                              Product1
                            </Select.Option>
                            <Select.Option value="Product2">
                              Product2
                            </Select.Option>
                            <Select.Option value="Product3">
                              Product3
                            </Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item {...restField} label="Quantity">
                          <InputNumber />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Decription:"
                          align="start"
                        >
                          <TextArea rows={3} />
                        </Form.Item>
                      </Card>
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add product
                  </Button>
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default InventoryReport;
