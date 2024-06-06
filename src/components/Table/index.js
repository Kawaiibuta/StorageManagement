import { ConfigProvider, Modal, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./style.css";

function CustomTable({
  form,
  onUpdateData,
  isFetching,
  columns,
  dataSource,
  handleOk,
  handleCancel,
  title,
  scrollX,
  marginTop,
  rowSelection,
  button,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
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
            {"Product " + selectedProduct + "'s detail: " }
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
        open={selectedProduct}
        onOk={handleOk}
        onCancel={() => {
          if(handleCancel && handleCancel instanceof Function) handleCancel();
          setSelectedProduct(null);
        }}
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
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {setSelectedProduct(dataSource[rowIndex].sku_code)}, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      />
    </ConfigProvider>
  );
}

export default CustomTable;
