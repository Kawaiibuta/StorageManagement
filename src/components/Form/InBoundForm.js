import React, { useState, useEffect } from "react";
import {
  Select,
  Form,
  InputNumber,
  Button,
  Space,
  message,
  Image,
  List,
  Avatar,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../../redux/apiRequest";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import "./style.css";

const { Title } = Typography;

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
    setIsLoading(true);

    try {
      if (!formData) {
        const details = calculateTotal(values.products);
        const data = {
          type: "Inbound",
          partnerId: values.supplier,
          details: details,
          total: totalProducts,
        };

        await addTransaction(data);

        message.success("Add Inbound success");
        form.resetFields();
      } else {
        const partner_id = values.supplier.includes("-")
          ? formData.supplierId
          : values.supplier;
        const data = {
          details: calculateTotal(values.products),
          total: totalProducts,
          partnerId: partner_id,
        };
        await updateTransaction(formData.key, data);
        message.success("Update Inbound success");
      }
      handleOkButton();
      onUpdateData();
    } catch (e) {
      message.error(
        typeof e.response?.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        products: formData.orderDetail.map((e) => ({
          key: e.id,
          id: e.id,
          action: "update",
          productId: e.variant.name,
          quantity: e.quantity,
          image: e.variant.images[0].url,
          total_price: e.total_price,
        })),
      });
    }
  }, [formData, form]);

  return (
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
          <Form.Item label={<p>&nbsp; Products</p>}>
            <Form.List name="products">
              {(subFields, subOpt) => (
                <div>
                  {subFields.map((subField, index) => (
                    <div style={{ marginBottom: 8 }} key={subField.key}>
                      <List
                        itemLayout="horizontal"
                        dataSource={[subField]}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  src={form.getFieldValue([
                                    "products",
                                    index,
                                    "image",
                                  ])}
                                />
                              }
                              title={
                                <span>
                                  {form.getFieldValue([
                                    "products",
                                    index,
                                    "productId",
                                  ])}
                                </span>
                              }
                              description={`Quantity: ${form.getFieldValue([
                                "products",
                                index,
                                "quantity",
                              ])} | Price: ${form.getFieldValue([
                                "products",
                                index,
                                "total_price",
                              ])}`}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      }
      handleCancelButton={handleCancelButton}
      isModalOpen={isModalOpen}
      marginTop={20}
      title="Order Detail"
    />
  );
}

export default InBoundForm;
