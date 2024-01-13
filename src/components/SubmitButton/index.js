import { Button, ConfigProvider } from "antd";
import React from "react";

const SubmitButton = ({ Form, form, isLoading }) => {
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

export default SubmitButton;
