import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MdAdd, MdAutorenew } from "react-icons/md";
import "./custombutton.css";

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
        form.push(<p>Này là form thêm Inbound</p>);
      }
      break;
    case "outbound":
      {
        form.push(<p>Này là form thêm Outbound</p>);
      }
      break;
    case "report":
      {
        form.push(<p>Này là form thêm Report</p>);
      }
      break;
    case "product":
      {
        form.push(<p>Này là form thêm Product</p>);
      }
      break;
    case "partner":
      {
        form.push(<p>Này là form thêm Parner</p>);
      }
      break;
    case "employee":
      {
        form.push(<p>Này là form thêm Employee</p>);
      }
      break;
    case "user":
      {
        form.push(<p>Này là form thêm User</p>);
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
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {form}
      </Modal>
    </div>
  );
};
export default CustomButton;
