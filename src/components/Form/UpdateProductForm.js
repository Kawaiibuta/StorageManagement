import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Select,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Modal,
  Space,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/apiRequest";
import "./style.css";
import SubmitButton from "../SubmitButton";

const { TextArea } = Input;

function UpdateProductForm({
  onUpdateData,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [form] = Form.useForm();
  console.log("formdata", formData);
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
  const warehouseList = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: formData.image,
    },
  ]);

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
    try {
      setIsLoading(true);

      const formDt = new FormData();
      formDt.append("name", values.productName);
      formDt.append("maximumQuantity", values.productMaxQuantity);
      formDt.append("price", values.productPrice);
      formDt.append("unit", values.productUnit);

      formDt.append("specification", values.productSpecification);

      formDt.append(
        "supplierId",
        values.supplierCode.includes("-")
          ? formData.supplier_id
          : values.supplierCode
      );
      // Append the file to form data
      if (values.productImage) {
        formDt.append("image", values.productImage.file.originFileObj);
      }
      console.log(formDt);
      console.log("values", values);

      // Make the POST request with axios
      await updateProduct(formData.key, formDt);
      // console.log(data);
      setIsLoading(false);

      message.success("Update product success");
      onUpdateData();
      form.resetFields();

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

  useEffect(() => {
    form.setFieldsValue({
      productName: formData.name,
      productMaxQuantity: formData.maximum_quantity,
      productPrice: formData.price,
      productUnit: formData.unit,
      productSpecification: formData.specification,
      warehouseCode: formData.warehouseCodeAndName,
      supplierCode: formData.supplierCodeAndName,
    });
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: formData.image,
      },
    ]);
  }, [formData, form]);

  return (
    <>
      <div>
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
            label={<p>Maximum Quantity</p>}
            name="productMaxQuantity"
          >
            <InputNumber placeholder="Product Maximum Quantity" />
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
            <Input placeholder="Product Price" />
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
            label={<p>&nbsp;Product Image</p>}
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

          <Form.Item {...tailLayout}>
            <Space>
              <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                Ok
              </SubmitButton>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateProductForm;
