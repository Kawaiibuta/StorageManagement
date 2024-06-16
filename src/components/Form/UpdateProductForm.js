import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Select, Form, Input, InputNumber, Upload, Space, message } from "antd";
import { useSelector } from "react-redux";
import { updateProduct } from "../../redux/apiRequest";
import "./style.css";
import SubmitButton from "../SubmitButton";

const { TextArea } = Input;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function UpdateProductForm({
  onUpdateData,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const categoryList = useSelector(
    (state) => state.product.category?.allCategory
  );
  console.log("formdat " + formData);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFinish = async (values) => {
    try {
      setIsLoading(true);

      const jewelry = {
        name: values.productName,
        description: values.productDescription,
        category_id: values.productCategory,
        price: values.productPrice,
        images: await Promise.all(
          fileList.map(async (file) => {
            if (file.originFileObj) {
              return await getBase64(file.originFileObj);
            }
            return file.url; // Already uploaded image
          })
        ),
      };

      await updateProduct(formData.key, jewelry);

      onUpdateData();
      form.resetFields();
      setFileList([]);
      message.success("Update product success");

      handleOkButton();
    } catch (e) {
      console.log(e);
      message.error(
        typeof e.response?.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      productName: formData.name,
      productDescription: formData.description,
      productCategory: formData.category_id,
      productPrice: formData.price,
      productQuantity: formData.quantity,
    });
    setFileList(
      formData.images.map((image) => ({
        uid: image.id,
        name: image.id,
        status: "done",
        url: image.url,
      }))
    );
  }, [formData, form]);

  return (
    <>
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
              message: "Please input your product description!",
            },
          ]}
          label={<p>Description</p>}
          name="productDescription"
        >
          <TextArea placeholder="Product Description" />
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
          rules={[
            {
              required: true,
              message: "Please input your product quantity!",
            },
          ]}
          label={<p>Quantity</p>}
          name="productQuantity"
        >
          <InputNumber min={0} placeholder="Product Quantity" />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={<p>&nbsp;Product Category</p>}
          name="productCategory"
          rules={[
            {
              required: true,
              message: "Please select your product category!",
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
          label={<p>&nbsp;Product Image</p>}
        >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-circle"
            fileList={fileList}
            onChange={handleChange}
            multiple
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <SubmitButton Form={Form} form={form} isLoading={isLoading}>
              Ok
            </SubmitButton>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateProductForm;
