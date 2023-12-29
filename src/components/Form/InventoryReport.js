import React, { useState } from "react";
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
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { addInventoryReport } from "../../redux/apiRequest";

const { TextArea } = Input;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SubmitButton = ({ form, isLoading }) => {
  const [submittable, setSubmittable] = React.useState(true);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      loading={isLoading}
    >
      Submit
    </Button>
  );
};

function InventoryReport({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
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
      <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 12 }}
      >
        <div>
          <h1> InventoryReport</h1>
          <Form
            form={form}
            onFinish={handleFinish}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
          >
            <Form.List name="items">
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
                      title={`Item ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input your sku code!",
                          },
                        ]}
                        label="Sku Code"
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
                              label: goods.skuCode,
                            };
                          })}
                        ></Select>
                      </Form.Item>
                      <Form.Item
                        label="Quantity"
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
                        label="Actual Quantity"
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
                        label="Difference Quantity"
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
                        label="Description"
                        name={[field.name, "description"]}
                      >
                        <TextArea></TextArea>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button
                    style={{ marginBottom: 15 }}
                    type="dashed"
                    onClick={() => add()}
                    block
                  >
                    + Add Item
                  </Button>
                </div>
              )}
            </Form.List>
            <Form.Item {...tailLayout}>
              <Space>
                <Button htmlType="button" onClick={handleCancelButton}>
                  Cancel
                </Button>
                <SubmitButton form={form} isLoading={loading}>
                  Ok
                </SubmitButton>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default InventoryReport;
