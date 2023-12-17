import React, { useState } from "react";
import {
  Select,
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Space,
  message,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { addTransaction } from "../../redux/apiRequest";

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

function InBoundForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const suppliersList = useSelector(
    (state) => state.partner.supplier?.allSuppliers
  );
  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );

  let totalProducts = 0;

  const totalForEachProduct = (products) => {
    return products.map((product) => {
      let total = 0;
      let goods = goodsList?.find((good) => good._id === product.productId);
      total = goods.price * product.quantity;
      totalProducts += total;
      return {
        ...product,
        total: total,
      };
    });
  };

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);

    try {
      const details = totalForEachProduct(values.products);
      const data = {
        type: "Inbound",
        employeeId: user.employeeId,
        partnerId: values.supplier,
        warehouseId: "657c678f72304d206a0fd13f",
        details: details,
        total: totalProducts,
      };
      console.log("data", data);

      await addTransaction(data);
      message.success("Add Inbound success");
      totalProducts = 0;
      onUpdateData();
      handleOkButton();
    } catch (e) {
      // message.error(e.response.data);
      console.log(e);
    }
    setIsLoading(false);
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
      >
        <div>
          <h1>InBound</h1>
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
              label="Supplier Code"
              name="supplier"
            >
              <Select
                options={suppliersList?.map((sup) => {
                  return {
                    value: sup._id,
                    label: sup.code,
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
                            options={goodsList?.map((goods) => {
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

export default InBoundForm;
