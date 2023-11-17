import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MdAdd, MdAutorenew } from "react-icons/md";
import "./custombutton.css";
import InboundForm from "../Form/InBoundForm.js";
import OutboundForm from "../Form/OutBoundForm.js";
import NewCustomerForm from "../Form/NewCustomerForm.js";
import NewEmployeeForm from "../Form/NewEmployeeForm.js";
import NewProductForm from "../Form/NewProductForm.js";
import NewSupplierForm from "../Form/NewSupplierForm.js";
import NewUserForm from "../Form/NewUserForm.js";
const CustomButton = (props) => {
  const { numButtons, page } = props;
  const buttons = [];
  const form = [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (buttonType) => {
    if (buttonType === "NEW") {
      showModal();
    } else if (buttonType === "REFRESH") {
      // Chức năng refresh lại trang
    }
  };
  switch (page) {
    case "inbound":
      {
        form.push(<InboundForm />);
      }
      break;
    case "outbound":
      {
        form.push(<OutboundForm />);
      }
      break;
    case "report":
      {
        form.push(<p>Này là form thêm Report</p>);
      }
      break;
    case "product":
      {
        form.push(<NewProductForm />);
      }
      break;
    case "supplier":
      {
        form.push(<NewSupplierForm />);
      }
      break;
    case "customer":
      {
        form.push(<NewCustomerForm />);
      }
      break;
    case "employee":
      {
        form.push(<NewEmployeeForm />);
      }
      break;
    case "user":
      {
        form.push(<NewUserForm />);
      }
      break;
    default:
      console.log("Nope");
      break;
  }
  switch (numButtons) {
    case 0:
      break;
    case 1:
      buttons.push(
        <Button className="one" onClick={() => handleButtonClick("REFRESH")}>
          <MdAutorenew className="icon" />
          REFRESH
        </Button>
      );
      break;
    case 2:
      buttons.push(
        <Button className="two-one" onClick={() => handleButtonClick("NEW")}>
          <MdAdd className="icon" />
          NEW
        </Button>
      );
      buttons.push(
        <Button
          className="two-two"
          onClick={() => handleButtonClick("REFRESH")}
        >
          <MdAutorenew className="icon" />
          REFRESH
        </Button>
      );
      break;
    default:
      buttons.push(
        <Button className="one" onClick={() => handleButtonClick("REFRESH")}>
          <MdAutorenew className="icon" />
          REFRESH
        </Button>
      );
      break;
  }
  return (
    <div style={{ display: "inline" }}>
      {buttons}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="500px"
        height="300px"
      >
        {form}
      </Modal>
    </div>
  );
};
export default CustomButton;
