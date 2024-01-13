import React, { useState } from "react";

import {
  Button,
  Form,
  Input,
  Space,
  Card,
  Select,
  InputNumber,
  message,
} from "antd";

import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { addInventoryReport } from "../../redux/apiRequest";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import "./style.css";

const { TextArea } = Input;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function InventoryReport({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  console.log("formdata", formData);
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    console.log("values", values);
    let totalDiffQuantity = 0;
    let increaseQuantity = 0;
    let decreaseQuantity = 0;
    let totalActualQuantity = 0;
    values.items.forEach((reportItem) => {
      if (reportItem.differenceQuantity >= 0) {
        increaseQuantity += reportItem.differenceQuantity;
      } else {
        decreaseQuantity += reportItem.differenceQuantity;
      }
      totalDiffQuantity += reportItem.differenceQuantity;
      totalActualQuantity += reportItem.actualQuantity;
    });
    const data = {
      totalActualQuantity: totalActualQuantity,
      totalDiffQuantity: totalDiffQuantity,
      increaseQuantity: increaseQuantity,
      decreaseQuantity: decreaseQuantity,
      warehouseId: userWarehouseId,
      managerId: user.employeeId._id,
      details: values.items,
    };
    setLoading(true);
    try {
      console.log("data", data);
      await addInventoryReport(data);
      form.resetFields();
      onUpdateData();
      handleOkButton();
      message.success("Add inventory report success");
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setLoading(false);
    console.log("values", values);
  };

  return (
    <>
      <CustomForm
        marginTop={10}
        form={
          <Form
            className="formLabel"
            style={{ marginRight: "16px" }}
            form={form}
            onFinish={handleFinish}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
          >
            <Form.List disabled={formData ? true : false} name="items">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`Product ${field.name + 1}`}
                      key={field.key}
                      extra={
                        formData ? null : (
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        )
                      }
                    >
                      <Form.Item
                        style={{ marginTop: "10px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your sku code!",
                          },
                        ]}
                        labelAlign="left"
                        label={<p>Product</p>}
                        name={[field.name, "productId"]}
                      >
                        <Select
                          onChange={() => {
                            const formValues = form.getFieldValue([["items"]]);
                            console.log("fvalue", formValues);
                            form.setFieldsValue({
                              items: formValues.map((item, i) => {
                                if (i === field.name) {
                                  const product = goodsList.find(
                                    (goods) => goods._id === item.productId
                                  );
                                  return {
                                    ...item,
                                    quantity: product.quantity,
                                  };
                                }
                                return item;
                              }),
                            }); // Corrected
                            console.log("field", field);
                          }}
                          options={goodsList?.map((goods) => {
                            return {
                              value: goods._id,
                              label: goods.skuCode + " - " + goods.name,
                            };
                          })}
                        ></Select>
                      </Form.Item>
                      <Form.Item
                        label={<p>&nbsp;Quantity</p>}
                        labelAlign="left"
                        name={[field.name, "quantity"]}
                      >
                        <InputNumber disabled></InputNumber>
                      </Form.Item>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your actual quantity!",
                          },
                        ]}
                        onChange={() => {
                          const formValues = form.getFieldValue([["items"]]);
                          console.log("fvalue", formValues);
                          form.setFieldsValue({
                            items: formValues.map((item, i) => {
                              if (i === field.name) {
                                return {
                                  ...item,
                                  differenceQuantity:
                                    item.actualQuantity - item.quantity,
                                };
                              }
                              return item;
                            }),
                          }); // Corrected
                          console.log("field", field);
                        }}
                        label={<p>Actual Quantity</p>}
                        labelAlign="left"
                        name={[field.name, "actualQuantity"]}
                      >
                        <InputNumber min={0}></InputNumber>
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your difference quantity!",
                          },
                        ]}
                        label={<p>Difference Quantity</p>}
                        labelAlign="left"
                        name={[field.name, "differenceQuantity"]}
                      >
                        <InputNumber disabled></InputNumber>
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your description!",
                          },
                        ]}
                        label={<p>Description</p>}
                        labelAlign="left"
                        name={[field.name, "description"]}
                      >
                        <TextArea></TextArea>
                      </Form.Item>
                    </Card>
                  ))}

                  {formData ? null : (
                    <Button
                      style={{ marginBottom: 15 }}
                      type="dashed"
                      onClick={() => add()}
                      block
                    >
                      {<p style={{ padding: 0, margin: 0 }}>+ Add Product</p>}
                    </Button>
                  )}
                </div>
              )}
            </Form.List>

            <Form.Item {...tailLayout}>
              <Space>
                {formData ? null : (
                  <SubmitButton Form={Form} form={form} isLoading={loading}>
                    Ok
                  </SubmitButton>
                )}
              </Space>
            </Form.Item>
          </Form>
        }
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        title="Inventory Report"
      />
    </>
  );
}

export default InventoryReport;
