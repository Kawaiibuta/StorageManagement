import React, { useSelector, useState } from "react";

import axios from "axios";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  message,
  Select,
  ConfigProvider,
} from "antd";
import "./style.css";
import { CloseOutlined } from "@ant-design/icons";
import CustomForm from "../CustomForm";

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
    <ConfigProvider
      theme={{
        components: {
          Button: {
            textHoverBg: "white",
            defaultBg: "rgba(156, 188, 235, 1)",
            defaultColor: "white",
            fontWeight: "500",
          },
        },
      }}
    >
      <Button
        style={{ padding: "0px 50px", marginBottom: "24px" }}
        type="default"
        htmlType="submit"
        size="large"
        loading={isLoading}
      >
        SUBMIT
      </Button>
    </ConfigProvider>
  );
};

function NewWarehouseForm({
  managersList,
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    let data;
    console.log("values", values);
    if (values.warehouseManager) {
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
    console.log("data", data);

    try {
      await axios.post(
        "https://warehousemanagement.onrender.com/api/warehouse",
        data
      );

      handleOkButton();
      await onUpdateData();
      message.success("Your warehouse has been added successfully.");
      form.resetFields();
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

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <CustomForm
      marginTop={20}
      title="New Warehouse"
      handleCancelButton={handleCancelButton}
      isModalOpen={isModalOpen}
      form={
        <Form
          onFinish={handleFinish}
          form={form}
          autoComplete="off"
          name="newWarehouse"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          className="formLabel"
        >
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse name!",
              },
            ]}
            label={<p>Name</p>}
            name="warehouseName"
          >
            <Input placeholder="Warehouse Name" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse address!",
              },
            ]}
            label={<p>Address</p>}
            name="warehouseAddress"
          >
            <TextArea placeholder="Warehouse Addresss" rows={4} />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse capacity!",
              },
            ]}
            label={<p>Capacity</p>}
            name="warehouseCapacity"
          >
            <Input placeholder="Warehouse Capacity" type="number" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="warehouseManager"
            label={<p>&nbsp; Manager</p>}
            rules={[
              {
                // required: false,
                // message: "Please select warehoue manager!",
              },
            ]}
          >
            <Select
              options={managersList?.map((manager) => {
                return {
                  value: manager._id,
                  label: manager.code + " - " + manager.name,
                };
              })}
              allowClear
              placeholder="Select Manager for Warehouse"
            ></Select>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse contact email!",
              },
            ]}
            label={<p>Email</p>}
            name="warehouseContactEmail"
          >
            <Input placeholder="Warehouse Email" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse contact phone number!",
              },
            ]}
            label={<p>Phone Number</p>}
            name="warehouseContactPhoneNum"
          >
            <Input placeholder="Warehouse Phone Number" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please input your warehouse description!",
              },
            ]}
            label={<p>Description</p>}
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
              <SubmitButton form={form} isLoading={isLoading}>
                Ok
              </SubmitButton>
            </Space>
          </Form.Item>
        </Form>
      }
    />
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Modal: {
    //         titleFontSize: 24,
    //         headerBg: "rgba(156, 188, 235, 1)",
    //         paddingLG: 0,
    //         padding: 0,
    //       },
    //     },
    //   }}
    // >
    //   <Modal
    //     style={{
    //       top: 20,
    //     }}
    //     title={
    //       <p
    //         style={{
    //           marginLeft: "24px",
    //           fontWeight: 500,
    //           fontSize: 24,
    //           padding: "16px 0px",
    //         }}
    //       >
    //         New Warehouse
    //       </p>
    //     }
    //     closeIcon={
    //       <CloseOutlined
    //         style={{
    //           fontSize: "25px",
    //           paddingTop: "20px",
    //           paddingRight: "20px",
    //           color: "white",
    //         }}
    //       />
    //     }
    //     open={isModalOpen}
    //     width="500px"
    //     height="300px"
    //     onCancel={handleCancelButton}
    //     footer={null}
    //   >
    //     <>
    //       <div>
    //         <Form
    //           onFinish={handleFinish}
    //           form={form}
    //           autoComplete="off"
    //           name="newWarehouse"
    //           labelCol={{ span: 10 }}
    //           wrapperCol={{ span: 12 }}
    //           layout="horizontal"
    //           className="formLabel"
    //         >
    //           <Form.Item
    //             labelAlign="left"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input your warehouse name!",
    //               },
    //             ]}
    //             label={<p>Name</p>}
    //             name="warehouseName"
    //           >
    //             <Input placeholder="Warehouse Name" />
    //           </Form.Item>
    //           <Form.Item
    //             labelAlign="left"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input your warehouse address!",
    //               },
    //             ]}
    //             label={<p>Address</p>}
    //             name="warehouseAddress"
    //           >
    //             <TextArea placeholder="Warehouse Addresss" rows={4} />
    //           </Form.Item>
    //           <Form.Item
    //             labelAlign="left"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input your warehouse capacity!",
    //               },
    //             ]}
    //             label={<p>Capacity</p>}
    //             name="warehouseCapacity"
    //           >
    //             <Input placeholder="Warehouse Capacity" type="number" />
    //           </Form.Item>
    //           <Form.Item
    //             labelAlign="left"
    //             name="warehouseManager"
    //             label={<p>&nbsp; Manager</p>}
    //             rules={[
    //               {
    //                 // required: false,
    //                 // message: "Please select warehoue manager!",
    //               },
    //             ]}
    //           >
    //             <Select
    //               options={managersList?.map((manager) => {
    //                 return {
    //                   value: manager._id,
    //                   label: manager.code + " - " + manager.name,
    //                 };
    //               })}
    //               allowClear
    //               placeholder="Select Manager for Warehouse"
    //             ></Select>
    //           </Form.Item>
    //           <Form.Item
    //             labelAlign="left"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input your warehouse contact email!",
    //               },
    //             ]}
    //             label={<p>Email</p>}
    //             name="warehouseContactEmail"
    //           >
    //             <Input placeholder="Warehouse Email" />
    //           </Form.Item>
    //           <Form.Item
    //             labelAlign="left"
    //             rules={[
    //               {
    //                 required: true,
    //                 message:
    //                   "Please input your warehouse contact phone number!",
    //               },
    //             ]}
    //             label={<p>Phone Number</p>}
    //             name="warehouseContactPhoneNum"
    //           >
    //             <Input placeholder="Warehouse Phone Number" />
    //           </Form.Item>
    //           <Form.Item
    //             labelAlign="left"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input your warehouse description!",
    //               },
    //             ]}
    //             label={<p>Description</p>}
    //             name="warehouseDescription"
    //           >
    //             <TextArea
    //               placeholder="Warehouse Description"
    //               rows={4}
    //               onChange={(e) => {
    //                 // setWarehouseDescription(e.target.value);
    //               }}
    //             />
    //           </Form.Item>
    //           <Form.Item {...tailLayout}>
    //             <Space>
    //               <SubmitButton form={form} isLoading={isLoading}>
    //                 Ok
    //               </SubmitButton>
    //             </Space>
    //           </Form.Item>
    //         </Form>
    //       </div>
    //     </>
    //   </Modal>
    // </ConfigProvider>
  );
}

export default NewWarehouseForm;
