import React from "react";
import { Action } from "antd";
import {
  RiDeleteBin6Line,
  RiCheckboxLine,
  RiEditBoxLine,
  RiTruckLine,
  RiPrinterLine,
} from "react-icons/ri";
import { GrFormView } from "react-icons/gr";
import "./actionbar.css";

const CustomAction = (props) => {
  const { numActions } = props;
  const actions = [];
  switch (numActions) {
    case 2:
      actions.push(
        <div>
          <a>{<RiEditBoxLine />}</a>
          <a>{<RiDeleteBin6Line />}</a>
        </div>
      );
      break;
    case 4:
      actions.push(
        <div>
          <a>{<RiTruckLine />}</a>
          <a>{<RiCheckboxLine />}</a>
          <a>{<RiEditBoxLine />}</a>
          <a>{<RiDeleteBin6Line />}</a>
        </div>
      );
      break;
    case 5:
      actions.push(
        <div>
          <a>{<GrFormView />}</a>
          <a>{<RiCheckboxLine />}</a>
          <a>{<RiPrinterLine />}</a>
          <a>{<RiCheckboxLine />}</a>
          <a>{<RiTruckLine />}</a>
        </div>
      );
      break;
    default:
      actions.push(<div></div>);
      break;
  }
  return actions;
};
export default CustomAction;
