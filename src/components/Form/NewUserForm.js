import React, { useState } from "react";
import { Select, Form, Modal, Button, Space, message } from "antd";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const allStaffsList = useSelector((state) => state.employee.staff?.allStaffs);

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
      await registerEmployeeUser({ employeeId: staff._id }, dispatch);
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
      </Modal>
    </>
  );
}

export default NewUserForm;
