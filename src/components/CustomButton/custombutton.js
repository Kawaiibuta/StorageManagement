import React, { useState } from "react";
import { Button } from "antd";
import { GrAdd, GrRefresh } from "react-icons/gr";
import "./custombutton.css";

const CustomButton = (props) => {
  const { numButtons } = props;
  const buttons = [];
  switch (numButtons) {
    case 0:
      break;
    case 1:
      buttons.push(
        <Button className="one">
          <GrAdd className="icon" />
          NEW
        </Button>
      );
      break;
    case 2:
      buttons.push(
        <Button className="two-one">
          <GrAdd className="icon" />
          NEW
        </Button>
      );
      buttons.push(
        <Button className="two-two">
          <GrRefresh className="icon" />
          REFRESH
        </Button>
      );
      break;

    default:
      buttons.push(<Button>New</Button>);
      break;
  }
  return <div style={{ display: "inline" }}>{buttons}</div>;
};
export default CustomButton;
