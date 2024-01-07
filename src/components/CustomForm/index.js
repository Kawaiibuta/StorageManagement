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
          <div>{form}</div>
        </>
      </Modal>
    </ConfigProvider>
  );
}

export default CustomForm;
