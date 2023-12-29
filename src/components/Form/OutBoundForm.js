import React, { useEffect, useState } from "react";
import { Select, Form, InputNumber, Button, Modal, Space, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../../redux/apiRequest";

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
        message.success("Add Outbound success");
      } else {
        const partner_id =
          values.customer.length < 10 ? formData.customerId : values.customer;
        console.log("update");
        const data = {
          partnerId: partner_id,
          details: calculateTotal(values.products),
          toal: totalProducts,
          // partnerId: values.customer,
        };
        console.log("data", data);
        console.log("key", formData.key);
        await updateTransaction(formData.key, data);
      }
      onUpdateData();
      handleOkButton();
    } catch (e) {
      console.log(e);
      // message.error("Something went wrong!");

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
        customer: formData.customer,
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
      <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
      >
        <div>
          <h1>OutBound</h1>
          <Form
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
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
              label="Customer Code"
              name="customer"
            >
              <Select
                options={customersList?.map((cus) => {
                  return {
                    value: cus._id,

                    label: cus.code,
                  };
                })}
              ></Select>
            </Form.Item>

            <Form.Item label="Products">
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
                      <Space key={subField.key}>
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
                                label: goods.skuCode,
                              };
                            })}
                          />
                        </Form.Item>
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
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </Space>
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
                <Button htmlType="button" onClick={handleCancelButton}>
                  Cancel
                </Button>
                <SubmitButton form={form} isLoading={isLoading}>
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

export default OutBoundForm;
