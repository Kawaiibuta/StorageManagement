import React, { useState } from "react";
import { Select, Form, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerEmployeeUser } from "../../redux/apiRequest";
import CustomForm from "../CustomForm";
import SubmitButton from "../SubmitButton";
import "./style.css";

function NewUserForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const usersList = useSelector((state) => state.employee.user?.allUsers);
  const allStaffsList = useSelector((state) => state.employee.staff?.allStaffs);

  console.log("allstaff", usersList);

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    setIsLoading(true);
    try {
      let staff = allStaffsList?.find((e) => e.code === values.employeeCode);

      console.log("emp", staff);
      await registerEmployeeUser(
        { employeeId: staff._id },
        dispatch,
        user.accessToken
      );
      form.resetFields();
      handleOkButton();
      onUpdateData();
      message.success("Add user success!");
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

  return (
    <>
      <CustomForm
        marginTop={200}
        handleCancelButton={handleCancelButton}
        isModalOpen={isModalOpen}
        title="New User"
        form={
          <Form
            className="formLabel"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            onFinish={handleFinish}
            form={form}
          >
            <Form.Item
              labelAlign="left"
              name="employeeCode"
              label={<p>Select Employee</p>}
            >
              <Select
                options={
                  allStaffsList && usersList
                    ? allStaffsList.map((employee) => {
                        return {
                          label: employee.code + " - " + employee.name,
                          value: employee.code,
                        };
                      })
                    : []
                }
              ></Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <SubmitButton Form={Form} form={form} isLoading={isLoading}>
                  Ok
                </SubmitButton>
              </Space>
            </Form.Item>
          </Form>
        }
      />
      {/* <Modal
        open={isModalOpen}
        width="500px"
        height="300px"
        onCancel={handleCancelButton}
        footer={null}
      >
        {" "}
        <div>
          <h1>New User</h1>
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            onFinish={handleFinish}
            form={form}
          >
            <Form.Item name="employeeCode" label="Select Employee Code: ">
              <Select>
                {allStaffsList?.map((employee) => {
                  const employeeHasAccount = usersList?.find(
                    (e) => e.employeeId._id === employee._id
                  );
                  if (!employeeHasAccount) {
                    return (
                      <Select.Option
                        key={employee._id}
                        value={employee.code}
                      ></Select.Option>
                    );
                  }

                  return null;
                })}
              </Select>
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
      </Modal> */}
    </>
  );
}

export default NewUserForm;
