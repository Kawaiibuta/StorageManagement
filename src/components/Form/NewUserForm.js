import React, { useState } from "react";
import { Select, Form, Input, Modal, Button, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerEmployeeUser } from "../../redux/apiRequest";

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

function NewUserForm({
  onUpdateData,
  isModalOpen,
  handleOkButton,
  handleCancelButton,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.employee.user?.allUsers);
  const allEmployeesList = useSelector(
    (state) => state.employee.employee?.allEmployees
  );

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
      let employee = allEmployeesList?.find(
        (e) => e.code === values.employeeCode
      );

      console.log("emp", employee);
      await registerEmployeeUser({ employeeId: employee._id }, dispatch);
    } catch (e) {
      console.log(e);
      message.error(e);
    }
    setIsLoading(false);
    form.resetFields();
    handleOkButton();
    onUpdateData();
  };

  return (
    <>
      <Modal
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
                {allEmployeesList.map((employee) => {
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
      </Modal>
    </>
  );
}

export default NewUserForm;
