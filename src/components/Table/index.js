import { ConfigProvider, Modal, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import "./style.css";

function CustomTable({
  form,
  onUpdateData,
  isFetching,
  columns,
  dataSource,
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  scrollX,
  marginTop,
  rowSelection,
  button,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#6c7ae0",
            headerColor: "white",
            rowHoverBg: "#bae0ff",
            headerSortActiveBg: "#6c7ae0",
            headerFilterHoverBg: "#6c7ae0",
            headerSortHoverBg: "#6c7ae0",
          },
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
        className="Form"
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
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {form}
      </Modal>
      <Table
        rowSelection={rowSelection}
        bordered
        loading={isFetching}
        style={{
          marginTop: "10px",
          maxWidth: "85vw",
        }}
        rowClassName={(_, index) => (index % 2 === 1 ? "colorTable" : "")}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showQuickJumper: true,
          total: dataSource?.length,
        }}
        scroll={{
          x: scrollX,
          y: "55vh",
        }}
      />
    </ConfigProvider>
  );
}

export default CustomTable;
