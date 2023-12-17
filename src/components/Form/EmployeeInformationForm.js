import React, { useState } from "react";
import { Form, Input, Modal, Space, Button, Image } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import "./EmployeeInformationForm.css";

function EmployeeInformationForm({ isModalOpen, handleOkButton }) {
  return (
    <>
      <Modal
        open={isModalOpen}
        width="1000px"
        height="300px"
        onOk={handleOkButton}
        footer={null}
      >
        <>
          <div>
            <Form
              onFinish={null}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              form={form}
            >
              <div className="full_form">
                <div className="first_col">
                  <Image
                    name="employeeAvatar"
                    width={180}
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  />
                </div>
                <div className="second_col">
                  <div className="second_col_title">
                    <h1>Employee Information</h1>
                  </div>
                  <div className="second_col_content">
                    <div className="second_child_col">
                      <Form.Item label="Name:" name="employeeName">
                        <Input disabled placeholder="Tên nhân viên" />
                      </Form.Item>
                      <Form.Item name="employeeBirthday" label="Birthday">
                        <Input disabled placeholder="Ngày sinh" />
                      </Form.Item>
                      <Form.Item name="employeeGender" label="Gender">
                        <Input disabled placeholder="Giới tính" />
                      </Form.Item>
                      <Form.Item
                        name="employeePhoneNumber"
                        label="Phone Number:"
                      >
                        <Input
                          disabled
                          placeholder="Số điện thoại"
                          type="phone"
                        />
                      </Form.Item>
                      <Form.Item name="employeeEmail" label="Email:">
                        <Input disabled placeholder="Email" type="email" />
                      </Form.Item>
                      <Form.Item name="employeeAddress" label="Address:">
                        <Input disabled placeholder="Địa chỉ nhà" />
                      </Form.Item>
                    </div>
                    <div className="second_child_col">
                      <Form.Item label="Id Card:" name="employeeIdCard">
                        <Input disabled placeholder="Id Card" />
                      </Form.Item>
                      <Form.Item label="Position" name="employeePosition">
                        <Input disabled placeholder="Chức vụ" />
                      </Form.Item>
                      <Form.Item label="Warehouse" name="employeeWarehouse">
                        <Input disabled placeholder="Warehouse" />
                      </Form.Item>
                      <Form.Item name="employeeStartDate" label="Start Date">
                        <Input disabled placeholder="Ngày vào làm" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <Space style={{ display: "flex", justifyContent: "right" }}>
                <Button htmlType="button" onClick={handleOkButton}>
                  OK
                </Button>
              </Space>
            </Form>
          </div>
        </>
      </Modal>
    </>
  );
}

export default EmployeeInformationForm;
