import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Select, Form, Input, InputNumber, Upload, Space, message } from "antd";

import { useSelector } from "react-redux";
import { addProduct } from "../../redux/apiRequest";
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
  const suppliersList = useSelector(
    (state) => state.partner.supplier?.allSuppliers
  );

  const userWarehouseId = useSelector(
    (state) => state.auth.login?.currentUser.employeeId.warehouseId
  );
  const [fileList, setFileList] = useState([]);

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
      console.log("whid", userWarehouseId);
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", values.productName);
      formData.append("maximumQuantity", values.productMaxQuantity);
      formData.append("price", values.productPrice);
      formData.append("unit", values.productUnit);
      formData.append("specification", values.productSpecification);
      formData.append("warehouseId", userWarehouseId);
      formData.append("supplierId", values.supplierCode);
      // Append the file to form data
      formData.append("image", values.productImage.file.originFileObj);

      // Make the POST request with axios
      await addProduct(formData);
      // console.log(data);

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
    // await addStaff(dispatch, data);
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
                  message: "Please input your product Maximum Quantity!",
                },
              ]}
              label={<p>Maximun Quantity</p>}
              name="productMaxQuantity"
            >
              <InputNumber min={1} placeholder="Product Maximum Quantity" />
            </Form.Item>
            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your supplier !",
                },
              ]}
              label={<p>Supplier</p>}
              name="supplierCode"
            >
              <Select
                placeholder="Select Supplier"
                options={suppliersList?.map((supplier) => {
                  return {
                    value: supplier._id,
                    label: supplier.code + " - " + supplier.name,
                  };
                })}
              ></Select>
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
              <InputNumber min={0} placeholder="Product Price" />
            </Form.Item>
            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product unit!",
                },
              ]}
              label={<p>Unit</p>}
              name="productUnit"
            >
              <Input placeholder="Product Unit" />
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
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-circle"
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
              >
                {uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your product specification!",
                },
              ]}
              label={<p>Specification</p>}
              name="productSpecification"
            >
              <TextArea placeholder="Product Specification" rows={4} />
            </Form.Item>
            {/* <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input warehouse!",
                },
              ]}
              label="Warehouse"
              name="warehouseCode"
            >
              <Select
                placeholder="Select warehouse code"
                options={warehouseList?.map((wh) => {
                  return {
                    value: wh._id,
                    label: wh.code,
                  };
                })}
              ></Select>
            </Form.Item> */}
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
