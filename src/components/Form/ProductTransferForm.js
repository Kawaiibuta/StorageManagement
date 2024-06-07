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

function ProductTransferForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
  productList,
  transferId,
  type,
  isTransferSendScreen,
}) {
  console.log("productList", productList);
  console.log("transferId", transferId);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      const data = {
        type: "Product",
        fromWarehouse: 0,
        toWarehouse: values.warehouse,
        list: productList.map((product) => product.key),
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
                dataSource={productList // Filter out undefined values
                  ?.map((product, i) => ({
                    name: product.name,
                    code: type === "view" ? product.skuCode : product.sku_code,
                    imageUrl:
                      type === "view" ? product.imageUrl : product.image,
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
        title="Transfer Products"
      />
    </>
  );
}

export default ProductTransferForm;
