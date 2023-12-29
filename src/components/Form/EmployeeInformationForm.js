import React, { useState } from "react";
import { Form, Input, Modal, Space, Button, Image } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import "./EmployeeInformationForm.css";

const abc = "ádasd";

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
                        <Input readOnly defaultValue="Khoa Pham" />
                      </Form.Item>
                      <Form.Item name="employeeBirthday" label="Birthday">
                        <Input readOnly defaultValue="01/01/2003" />
                      </Form.Item>
                      <Form.Item name="employeeGender" label="Gender">
                        <Input readOnly defaultValue="Male" />
                      </Form.Item>
                      <Form.Item
                        name="employeePhoneNumber"
                        label="Phone Number:"
                      >
                        <Input
                          readOnly
                          defaultValue="0912345678"
                          type="phone"
                        />
                      </Form.Item>
                      <Form.Item name="employeeEmail" label="Email:">
                        <Input readOnly defaultValue="email@email.com" />
                      </Form.Item>
                      <Form.Item name="employeeAddress" label="Address:">
                        <Input
                          readOnly
                          defaultValue="123, ABC Street, DEF City, VietNam"
                        />
                      </Form.Item>
                    </div>
                    <div className="second_child_col">
                      <Form.Item label="Id Card:" name="employeeIdCard">
                        <Input readOnly defaultValue="091234567890" />
                      </Form.Item>
                      <Form.Item label="Position" name="employeePosition">
                        <Input readOnly defaultValue="Employee" />
                      </Form.Item>
                      <Form.Item label="Warehouse" name="employeeWarehouse">
                        <Input readOnly defaultValue="WH00" />
                      </Form.Item>
                      <Form.Item name="employeeStartDate" label="Start Date">
                        <Input readOnly defaultValue="17/12/2023" />
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
