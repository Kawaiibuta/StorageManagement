import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Select, Form, Input, InputNumber, Upload, Space, message } from "antd";

import { useSelector } from "react-redux";
import { addProduct, setQuantityForVariant } from "../../redux/apiRequest";
import CustomForm from "../CustomForm";
import "./style.css";
import SubmitButton from "../SubmitButton";

const { TextArea } = Input;

function NewProductForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const [fileList, setFileList] = useState([]);

  const categoryList = useSelector(
    (state) => state.product.category?.allCategory
  );

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleFinish = async (values) => {
    console.log(values);
    try {
      setIsLoading(true);

      const options = [];

      if (values.productColor) {
        options.push({
          name: "Color",
          values: values.productColor.map((color) => ({ value: color })),
        });
      }

      if (values.productStoneColor) {
        options.push({
          name: "Color_Stone",
          values: values.productStoneColor.map((stoneColor) => ({
            value: stoneColor,
          })),
        });
      }

      if (values.productMetalColor) {
        options.push({
          name: "Metal_Color",
          values: values.productMetalColor.map((metalColor) => ({
            value: metalColor,
          })),
        });
      }

      const jewelry = {
        name: values.productName,
        description: values.productDescription,
        category_id: values.productCategory,
        price: values.productPrice,
        options: options,
      };

      const formData = new FormData();
      formData.append("jewelryItem", JSON.stringify(jewelry));
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      const result = await addProduct(formData);
      console.log("result add product " + result);

      if (Array.isArray(result)) {
        for (const id of result) {
          try {
            const product = await setQuantityForVariant(
              id,
              values.productQuantity / result.length
            );
            console.log(`Product details for ID ${id}:`, product);
          } catch (getErr) {
            console.error(`Error fetching product with ID ${id}:`, getErr);
          }
        }
      } else {
        console.error("Unexpected response format:", result);
      }

      onUpdateData();
      form.resetFields();
      setFileList([]);
      message.success("Add product success");

      handleOkButton();
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
  return (
    <>
      <CustomForm
        form={
          <Form
            className="formLabel"
            onFinish={handleFinish}
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
          >
            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
              label={<p>Product Name</p>}
              name="productName"
            >
              <Input placeholder="Product Name" />
            </Form.Item>
            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product quantity!",
                },
              ]}
              label={<p>Quantity</p>}
              name="productQuantity"
            >
              <InputNumber min={1} placeholder="Product Quantity" />
            </Form.Item>
            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product description!",
                },
              ]}
              label={<p>Product Description</p>}
              name="productDescription"
            >
              <Input.TextArea
                showCount
                maxLength={100}
                placeholder="Product Description"
              />
            </Form.Item>

            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product price!",
                },
              ]}
              label={<p>Price</p>}
              name="productPrice"
            >
              <InputNumber min={1000} placeholder="Product Price" />
            </Form.Item>
            <Form.Item
              labelAlign="left"
              label={<p>&nbsp;Product Category</p>}
              name="productCategory"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                allowClear
                options={categoryList?.map((category) => {
                  return {
                    label: category.code + " - " + category.name,
                    value: category.id,
                  };
                })}
                placeholder="Select product category"
              ></Select>
            </Form.Item>
            <Form.Item
              labelAlign="left"
              name="productImage"
              label={<p>Product Image</p>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture-circle"
                fileList={fileList}
                onChange={handleChange}
                multiple
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product colors!",
                },
              ]}
              label={<p>Color</p>}
              name="productColor"
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Select product colors"
              >
                <Select.Option value="Red">Red</Select.Option>
                <Select.Option value="Blue">Blue</Select.Option>
                <Select.Option value="Green">Green</Select.Option>
                <Select.Option value="Yellow">Yellow</Select.Option>
                <Select.Option value="Black">Black</Select.Option>
                <Select.Option value="White">White</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              labelAlign="left"
              label={<p>Metal Color</p>}
              name="productMetalColor"
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Select product colors"
              >
                <Select.Option value="Red">Red</Select.Option>
                <Select.Option value="Blue">Blue</Select.Option>
                <Select.Option value="Green">Green</Select.Option>
                <Select.Option value="Yellow">Yellow</Select.Option>
                <Select.Option value="Black">Black</Select.Option>
                <Select.Option value="White">White</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              labelAlign="left"
              label={<p>Stone Color</p>}
              name="productStoneColor"
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Select product stone colors"
              >
                <Select.Option value="Red">Red</Select.Option>
                <Select.Option value="Blue">Blue</Select.Option>
                <Select.Option value="Green">Green</Select.Option>
                <Select.Option value="Yellow">Yellow</Select.Option>
                <Select.Option value="Black">Black</Select.Option>
                <Select.Option value="White">White</Select.Option>
              </Select>
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
        title="New Product"
      />
    </>
  );
}

export default NewProductForm;
