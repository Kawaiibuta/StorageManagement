import React, { useEffect, useState } from "react";
import { Select, Form, InputNumber, Button, Space, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../../redux/apiRequest";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import "./style.css";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function OutBoundForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [form] = Form.useForm();
  console.log("formdata", formData);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId?.warehouseId;
  const customersList = useSelector(
    (state) => state.partner.customer?.allCustomers
  );
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );

  let totalProducts = 0;

  const calculateTotal = (products) => {
    totalProducts = 0;
    return products.map((product) => {
      let total = 0;
      let goods = goodsList?.find((good) => good._id === product.productId);
      total = goods.price * product.quantity;
      totalProducts += total;
      return {
        ...product,
        total: total,
        action: product.id ? "update" : "new",
      };
    });
  };

  const handleFinish = async (values) => {
    console.log("values", values);
    setIsLoading(true);

    try {
      if (!formData) {
        console.log("add");
        const data = {
          type: "Outbound",
          employeeId: user.employeeId,
          partnerId: values.customer,
          warehouseId: userWarehouseId,
          details: calculateTotal(values.products),
          total: totalProducts,
        };
        console.log("data", data);

        await addTransaction(data);
        form.resetFields();

        message.success("Add Outbound success");
      } else {
        const partner_id = values.customer.includes("-")
          ? formData.customerId
          : values.customer;
        console.log("update");

        const data = {
          partnerId: partner_id,
          details: calculateTotal(values.products),
          total: totalProducts,
        };
        console.log("total", totalProducts);

        console.log("data", data);
        console.log("key", formData.key);
        await updateTransaction(formData.key, data);
        message.success("Update Outbound success");
      }
      handleOkButton();
      onUpdateData();
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        customer: formData.customerCodeAndName,
        products: formData.trans_details.map((e) => ({
          id: e._id,
          action: "update",
          productId: e.productId,
          quantity: e.quantity,
        })),
      });
    }
  }, [formData, form]);

  return (
    <>
      <CustomForm
        form={
          <Form
            style={{ marginRight: "16px" }}
            labelAlign="left"
            className="formLabel"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={handleFinish}
            layout="horizontal"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
              label={<p>Customer</p>}
              name="customer"
            >
              <Select
                placeholder="Select Customer"
                block
                options={customersList?.map((cus) => {
                  return {
                    value: cus._id,
                    label: cus.code + " - " + cus.name,
                  };
                })}
              ></Select>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your products",
                },
              ]}
              label={<p>&nbsp;&nbsp;Products</p>}
            >
              <Form.List name={["products"]}>
                {(subFields, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 16,
                    }}
                  >
                    {subFields.map((subField) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                        key={subField.key}
                      >
                        <Form.Item
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Missing SKU Code",
                            },
                          ]}
                          name={[subField.name, "productId"]}
                        >
                          <Select
                            placeholder="SKU Code"
                            options={goodsList.map((goods) => {
                              return {
                                value: goods._id,
                                label: goods.skuCode + " - " + goods.name,
                              };
                            })}
                          />
                        </Form.Item>
                        <div style={{ width: "10px" }} />
                        <Form.Item
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Missing quantity",
                            },
                          ]}
                          name={[subField.name, "quantity"]}
                        >
                          <InputNumber min={1} placeholder="Quantity" />
                        </Form.Item>
                        <CloseOutlined
                          style={{ marginLeft: 8 }}
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => subOpt.add()} block>
                      + Add Sub Item
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                  Ok
                </SubmitButton>
              </Space>
            </Form.Item>
          </Form>
        }
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        marginTop={20}
        title={formData ? "Update Outbound" : "New Outbound"}
      />
    </>
  );
}

export default OutBoundForm;
