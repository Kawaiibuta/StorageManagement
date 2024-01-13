/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Select,
  Form,
  Space,
  List,
  Avatar,
  Card,
  message,
  Button,
  ConfigProvider,
} from "antd";

import { useSelector } from "react-redux";

import CustomForm from "../CustomForm";

import "./style.css";
import { addTransfer, updateTransfer } from "../../redux/apiRequest";
import SubmitButton from "../SubmitButton";

const tailLayoutTwoButton = {
  wrapperCol: {
    offset: 2,
    span: 22,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const ApprovedAndRejectButton = ({
  Form,
  form,
  title,
  id,
  onUpdateData,
  handleOkButton,
}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            textHoverBg: "white",
            defaultBg:
              title === "REJECT" ? "crimson" : "rgba(156, 188, 235, 1)",
            defaultColor: "white",
            fontWeight: "500",
          },
        },
      }}
    >
      <Button
        onClick={async () => {
          setLoading(true);
          try {
            await updateTransfer(id, {
              isAccepted: title === "REJECT" ? false : true,
            });
            handleOkButton();
            onUpdateData();
            message.success("Update transfer success");
          } catch (e) {
            console.log(e);
            message.error(
              typeof e.response.data === "string"
                ? e.response.data
                : "Something went wrong!"
            );
          }

          setLoading(false);
        }}
        style={{
          padding: "0px 50px",
          marginBottom: "24px",
          width: "200px",
        }}
        type="default"
        size="large"
        loading={loading}
      >
        {title}
      </Button>
    </ConfigProvider>
  );
};

function EmployeeTransferForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
  employeeList,
  transferId,
  type,
  isTransferSendScreen,
}) {
  console.log("employeeList", employeeList);
  console.log("transferId", transferId);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const allWarehouse = useSelector(
    (state) => state.warehouse.warehouse?.allWarehouses
  );

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      const data = {
        type: "Employee",
        fromWarehouse: userWarehouseId,
        toWarehouse: values.warehouse,
        list: employeeList.map((employee) => employee.key),
      };
      await addTransfer(data);
      handleOkButton();
      form.resetFields();
      message.success("Transfer Success");
    } catch (e) {
      message.error(
        typeof e.response.data === "string"
          ? e.response.data
          : "Something went wrong!"
      );
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomForm
        form={
          <>
            {" "}
            <Card style={{ margin: "10px 16px" }}>
              <List
                itemLayout="horizontal"
                dataSource={employeeList // Filter out undefined values
                  ?.map((employee, i) => ({
                    name: employee.name,
                    code: employee.code,

                    imageUrl:
                      type === "view" ? employee.imageUrl : employee.avatar,
                  }))}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.imageUrl} />}
                      title={<a>{item.name}</a>}
                      description={item.code}
                    />
                  </List.Item>
                )}
              />
            </Card>
            <div style={{ height: "10px" }}></div>
            {isTransferSendScreen ? null : (
              <Form
                style={{ marginRight: "16px" }}
                labelAlign="left"
                className="formLabel"
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleFinish}
                layout="horizontal"
              >
                {type === "view" ? null : (
                  <Form.Item
                    labelAlign="left"
                    name="warehouse"
                    label={<p> Destination Warehouse</p>}
                    rules={[
                      {
                        required: true,
                        message: "Please select destination Warehouse!",
                      },
                    ]}
                  >
                    <Select
                      options={
                        allWarehouse
                          ? allWarehouse
                              .filter((wh) => wh._id !== userWarehouseId)
                              .map((wh) => ({
                                value: wh._id,
                                label: wh.code + " - " + wh.name,
                              }))
                          : []
                      }
                      allowClear
                      placeholder="Select Destination Warehouse"
                    ></Select>
                  </Form.Item>
                )}
                <Form.Item
                  {...(type === "view" ? tailLayoutTwoButton : tailLayout)}
                >
                  {/* <Space> */}
                  {type === "view" ? (
                    <Space>
                      <ApprovedAndRejectButton
                        title="REJECT"
                        Form={Form}
                        form={form}
                        isLoading={isLoading}
                        id={transferId}
                        handleOkButton={handleOkButton}
                        onUpdateData={onUpdateData}
                      >
                        Ok
                      </ApprovedAndRejectButton>
                      <ApprovedAndRejectButton
                        title="APPROVED"
                        Form={Form}
                        form={form}
                        isLoading={isLoading}
                        id={transferId}
                        handleOkButton={handleOkButton}
                        onUpdateData={onUpdateData}
                      >
                        Ok
                      </ApprovedAndRejectButton>
                    </Space>
                  ) : (
                    <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                      Ok
                    </SubmitButton>
                  )}
                  {/* </Space> */}
                </Form.Item>
              </Form>
            )}
          </>
        }
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        marginTop={20}
        title="Transfer Employee"
      />
    </>
  );
}

export default EmployeeTransferForm;
