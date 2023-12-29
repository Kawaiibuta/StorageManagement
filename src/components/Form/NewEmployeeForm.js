import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Select,
  Form,
  Input,
  Modal,
  DatePicker,
  Space,
  Button,
  Upload,
  message,
} from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
const { Option } = Select;

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

function NewEmployeeForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
  position,
}) {
  const [isLoading, setIsLoading] = useState(false);
  //antd
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Add Staff Success",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Add Staff Failed",
    });
  };

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
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", values.employeeName);
      formData.append("position", position);
      formData.append(
        "startDate",
        values.employeeStartDate.format("DD/MM/YYYY")
      );
      formData.append("gender", values.employeeGender.toString().toLowerCase());
      formData.append("idCard", values.employeeIdCard);
      formData.append("birthday", values.employeeBirthday.format("DD/MM/YYYY"));
      formData.append("email", values.employeeEmail);
      formData.append("phone_num", values.employeePhoneNumber);
      formData.append("address", values.employeeAddress);
      if (values.employeeWarehouse) {
        formData.append("warehouseId", values.employeeWarehouse);
      }

      // Append the file to form data
      formData.append("image", values.employeeAvatar.file.originFileObj);

      // Make the POST request with axios
      await axios.post(
        "https://warehousemanagement.onrender.com/api/employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(data);
      setIsLoading(true);

      success();
      onUpdateData();
      form.resetFields();
      setFileList([]);
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

  const warehouses = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const [form] = Form.useForm();

  return (
    <>
      {contextHolder}
      <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
      >
        <>
          <div>
            <h1>New {position}</h1>
            <Form
              onFinish={handleFinish}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              form={form}
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
              {/* <Form.Item
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
              </Form.Item> */}
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
                <DatePicker format="DD/MM/YYYY" />
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
                  options={warehouses?.map((warehouse) => {
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
      </Modal>
    </>
  );
}

export default NewEmployeeForm;
