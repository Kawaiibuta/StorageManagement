import { Button, ConfigProvider } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import OutBoundBill from "../Form/OutBoundBill";
import InBoundBill from "../Form/InBoundBill";

export const ExportButton = ({ formData, type }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <OutBoundBill formData={formData} ref={componentRef} />

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
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handlePrint}
            style={{
              padding: "0px 50px",
              marginBottom: "24px",
              marginTop: "16px",
              textAlign: "center",
            }}
            type="default"
            size="large"
          >
            EXPORT
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
};

export const ExportButtonForInBound = ({ formData }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <InBoundBill formData={formData} ref={componentRef} />
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
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handlePrint}
            style={{
              padding: "0px 50px",
              marginBottom: "24px",
              marginTop: "16px",
              textAlign: "center",
            }}
            type="default"
            size="large"
          >
            EXPORT
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
};
