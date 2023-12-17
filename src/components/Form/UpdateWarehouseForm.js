import React, { useEffect, useSelector, useState } from "react";

import axios from "axios";
import { Form, Input, Button, Modal, Space, message, Select } from "antd";
import { editWarehouse } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

const SubmitButton = ({ form, isLoading }) => {
  const [submittable, setSubmittable] = React.useState(false);

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

function UpdateWarehouseForm({
  managersList,
  onUpdateData,

  handleOkButton,
  handleCancelButton,
  formData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  console.log("formdata", formData);

  const handleFinish = async (values) => {
    let data;
    if (values.warehouseManager !== formData.managerCode) {
      data = {
        managerId: values.warehouseManager,
        name: values.warehouseName,
        capacity: values.warehouseCapacity,
        description: values.warehouseDescription,
        email: values.warehouseContactEmail,
        phone_num: values.warehouseContactPhoneNum,
        address: values.warehouseAddress,
      };
    } else {
      data = {
        name: values.warehouseName,
        capacity: values.warehouseCapacity,
        description: values.warehouseDescription,
        email: values.warehouseContactEmail,
        phone_num: values.warehouseContactPhoneNum,
        address: values.warehouseAddress,
      };
    }
    setIsLoading(true);

    try {
      await editWarehouse(formData.key, data, dispatch);

      message.success("Your warehouse has been edit successfully.");
      onUpdateData();
      handleOkButton();
    } catch (e) {
      console.log(e);
      message.error(e.response.data);
    }
    setIsLoading(false);
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  useEffect(() => {
    form.setFieldsValue({
      warehouseManager: formData?.managerCode,
      warehouseName: formData.name,
      warehouseCapacity: formData.capacity,
      warehouseDescription: formData.description,
      warehouseContactEmail: formData.email,
      warehouseContactPhoneNum: formData.phone_num,
      warehouseAddress: formData.address,
    });
  }, [formData, form]);

  return (
    <>
      <div>
        <h1>Update Warehouse</h1>
        <Form
          onFinish={handleFinish}
          form={form}
          autoComplete="off"
          name="newWarehouse"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your warehouse name!",
              },
            ]}
            label="Name:"
            name="warehouseName"
          >
            <Input placeholder="Warehouse Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your warehouse address!",
              },
            ]}
            label="Address: "
            name="warehouseAddress"
          >
            <TextArea placeholder="Warehouse Addresss" rows={4} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your warehouse capacity!",
              },
            ]}
            label="Capacity:"
            name="warehouseCapacity"
          >
            <Input placeholder="Warehouse Capacity" type="number" />
          </Form.Item>
          <Form.Item
            name="warehouseManager"
            label="Manager"
            rules={[
              {
                // required: false,
                // message: "Please select warehoue manager!",
              },
            ]}
          >
            <Select
              allowClear
              placeholder="Select Manager for Warehouse"
              options={managersList?.map((manager) => {
                return {
                  value: manager._id,
                  label: manager.code,
                };
              })}
            ></Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your warehouse contact email!",
              },
            ]}
            label="Email:"
            name="warehouseContactEmail"
          >
            <Input placeholder="Warehouse Email" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your warehouse contact phone number!",
              },
            ]}
            label="Phone Number:"
            name="warehouseContactPhoneNum"
          >
            <Input placeholder="Warehouse Phone Number" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your warehouse description!",
              },
            ]}
            label="Description:"
            name="warehouseDescription"
          >
            <TextArea
              placeholder="Warehouse Description"
              rows={4}
              onChange={(e) => {
                // setWarehouseDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button
                htmlType="button"
                onClick={() => {
                  handleCancelButton();
                  form.resetFields();
                }}
              >
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

export default UpdateWarehouseForm;
