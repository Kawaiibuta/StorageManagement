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

const { TextArea } = Input;

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

function UpdateProductForm({
  onUpdateData,
  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [form] = useForm();

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
      formDt.append("warehouseId", values.warehouseCode);
      formDt.append("supplierId", values.supplierCode);
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
      message.error(e.message);
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
      warehouseCode: formData.warehouse_name,
      supplierCode: formData.supplier_name,
    });
  }, [formData, form]);

  return (
    <>
      <div>
        <h1>Update Product</h1>
        <Form
          onFinish={handleFinish}
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
            label="Product Name:"
            name="productName"
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your product Maximum Quantity!",
              },
            ]}
            label="Maximum Quantity:"
            name="productMaxQuantity"
          >
            <InputNumber placeholder="Product Maximum Quantity" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your supplier !",
              },
            ]}
            label="Supplier Code"
            name="supplierCode"
          >
            <Select
              placeholder="Select Supplier Code"
              options={suppliersList?.map((supplier) => {
                return {
                  value: supplier._id,
                  label: supplier.code,
                };
              })}
            ></Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
            label="Price:"
            name="productPrice"
          >
            <Input placeholder="Product Price" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your product unit!",
              },
            ]}
            label="Unit:"
            name="productUnit"
          >
            <Input placeholder="Product Unit" />
          </Form.Item>
          <Form.Item name="productImage" label="Product Image">
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
            rules={[
              {
                required: true,
                message: "Please input your product specification!",
              },
            ]}
            label="Specification"
            name="productSpecification"
          >
            <TextArea placeholder="Product Specification" rows={4} />
          </Form.Item>
          <Form.Item
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
    </>
  );
}

export default UpdateProductForm;
