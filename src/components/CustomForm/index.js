import React from "react";

import { Modal, ConfigProvider } from "antd";

import { CloseOutlined } from "@ant-design/icons";

function CustomForm({
  isModalOpen,
  handleCancelButton,
  form,
  title,
  marginTop,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            titleFontSize: 24,
            headerBg: "rgba(156, 188, 235, 1)",
            paddingLG: 0,
            padding: 0,
          },
        },
      }}
    >
      <Modal
        style={{
          top: marginTop,
        }}
        title={
          <p
            style={{
              marginLeft: "24px",
              fontWeight: 500,
              fontSize: 24,
              padding: "16px 0px",
            }}
          >
            {title}
          </p>
        }
        closeIcon={
          <CloseOutlined
            style={{
              fontSize: "25px",
              paddingTop: "20px",
              paddingRight: "20px",
              color: "white",
            }}
          />
        }
        open={isModalOpen}
        width="500px"
        height="300px"
        onCancel={handleCancelButton}
        footer={null}
      >
        <>
          <div>
            {form}
            {/* <Form
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
                    message:
                      "Please input your warehouse contact phone number!",
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
            </Form> */}
          </div>
        </>
      </Modal>
    </ConfigProvider>
  );
}

export default CustomForm;
