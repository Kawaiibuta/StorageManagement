import React, { useState } from "react";
import { Form, Input, Button, Modal, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

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

function NewSupplierForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      await axios.post("https://warehousemanagement.onrender.com/api/partner", {
        name: values.supplierName,
        type: "Supplier",
        email: values.supplierEmail,
        phone_num: values.supplierPhoneNumber,
        address: values.supplierAddress,
      });
      onUpdateData();
      handleOkButton();
      form.resetFields();
      message.success("Add Supplier Success");
    } catch (e) {
      message.error(e.response.data);
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
        <div>
          <h1>New Supplier</h1>
          <Form
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            onFinish={handleFinish}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="Supplier Name:"
              name="supplierName"
            >
              <Input placeholder="Supplier Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="Address: "
              name="supplierAddress"
            >
              <TextArea placeholder="Supplier Address" rows={4} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="PhoneNumber:"
              name="supplierPhoneNumber"
            >
              <Input placeholder="Supplier Phone Number" type="phone" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your supplier name!",
                },
              ]}
              label="Email:"
              name="supplierEmail"
            >
              <Input placeholder="Supplier Email" type="email" />
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

export default NewSupplierForm;
