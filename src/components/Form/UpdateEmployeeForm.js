import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

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
  DatePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import {
  addProduct,
  updateEmployee,
  updateProduct,
} from "../../redux/apiRequest";
import moment from "moment";
const { Option } = Select;
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
  const warehouseList = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: formData.avatar,
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
      const formDt = new FormData();
      console.log(values);
      if (values.employeeWarehouse?.length <= 6) {
        formDt.append("warehouseId", formData.warehouse_id);
      } else if (values.employeeWarehouse) {
        formDt.append("warehouseId", values.employeeWarehouse);
      }
      setIsLoading(true);

      formDt.append("name", values.employeeName);
      formDt.append("position", values.employeePosition);
      formDt.append("startDate", values.employeeStartDate.format("DD/MM/YYYY"));
      formDt.append("gender", values.employeeGender);
      formDt.append("idCard", values.employeeIdCard);

      formDt.append("birthday", values.employeeBirthday.format("DD/MM/YYYY"));
      formDt.append("email", values.employeeEmail);
      formDt.append("phone_num", values.employeePhoneNumber);
      formDt.append("address", values.employeeAddress);

      // Append the file to form data
      // if (values.employeeAvatar) {
      formDt.append("image", values.employeeAvatar?.file.originFileObj);
      // }
      console.log(formDt);
      console.log("values", values);

      // Make the POST request with axios
      await updateEmployee(formData.key, formDt);
      // console.log(data);
      setIsLoading(false);

      message.success("Update employee success");
      onUpdateData();
      form.resetFields();

      handleOkButton();
    } catch (e) {
      console.log(e);
      message.error(e.response?.data);
    }
    setIsLoading(false);
    // await addStaff(dispatch, data);
  };

  useEffect(() => {
    form.setFieldsValue({
      employeeName: formData.name,
      employeeAddress: formData.address,
      employeeBirthday: dayjs(formData.birthday),
      employeeEmail: formData.email,
      employeeGender: formData.gender,
      employeeIdCard: formData.idCard,
      employeePhoneNumber: formData.phone_num,
      employeePosition: formData.type,
      employeeStartDate: dayjs(formData.start_time),
      employeeWarehouse: formData.warehouse_code,
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
              },
            ]}
            label="Name:"
            name="employeeName"
          >
            <Input placeholder="Employee Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Position"
            name="employeePosition"
          >
            <Select placeholder="Select Employee Position">
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Employee">Employee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="employeeGender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Employee Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Id Card:"
            name="employeeIdCard"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Employe Id Card Number" />
          </Form.Item>
          <Form.Item
            name="employeeBirthday"
            label="Birthday"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              defaultValue={moment(formData.start_time)}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item
            name="employeeAddress"
            label="Address:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Employee Address" />
          </Form.Item>
          <Form.Item
            name="employeePhoneNumber"
            label="Phone Number:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Employee Phone Number" type="phone" />
          </Form.Item>
          <Form.Item
            name="employeeEmail"
            label="Email:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Employee Email" type="email" />
          </Form.Item>
          <Form.Item
            label="Warehouse"
            name="employeeWarehouse"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              allowClear
              options={warehouseList?.map((warehouse) => {
                return {
                  label: warehouse.code,
                  value: warehouse._id,
                };
              })}
              placeholder="Select Warehouse where Employee work"
            ></Select>
          </Form.Item>
          <Form.Item
            name="employeeStartDate"
            label="Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            name="employeeAvatar"
            label="Avatar"
            rules={[
              {
                required: false,
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
