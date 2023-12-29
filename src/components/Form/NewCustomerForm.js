import React, { useState } from "react";
import { Form, Input, Button, Modal, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useSelector } from "react-redux";

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

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function NewCustomerForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      await axios.post("https://warehousemanagement.onrender.com/api/partner", {
        name: values.customerName,
        type: "Customer",
        email: values.customerEmail,
        phone_num: values.customerPhoneNumber,
        address: values.customerAddress,
        warehouseId: userWarehouseId,
      });
      onUpdateData();
      handleOkButton();
      form.resetFields();
      message.success("Add Customer Success");
    } catch (e) {
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
      <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onOk={handleOkButton}
        onCancel={handleCancelButton}
        footer={null}
      >
        {" "}
        <div>
          <h1>New Customer</h1>
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
                  message: "Please input your customer name!",
                },
              ]}
              label="Customer Name:"
              name="customerName"
            >
              <Input placeholder="Customer Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your customer name!",
                },
              ]}
              label="Address: "
              name="customerAddress"
            >
              <TextArea placeholder="Customer Address" rows={4} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your customer name!",
                },
              ]}
              label="PhoneNumber:"
              name="customerPhoneNumber"
            >
              <Input placeholder="Customer Phone Number" type="phone" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your customer name!",
                },
              ]}
              label="Email:"
              name="customerEmail"
            >
              <Input placeholder="Customer Email" type="email" />
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

export default NewCustomerForm;
