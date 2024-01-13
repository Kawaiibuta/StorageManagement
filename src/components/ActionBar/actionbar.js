/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import {
  RiDeleteBin6Line,
  RiCheckboxLine,
  RiEditBoxLine,
  RiTruckLine,
  RiPrinterLine,
} from "react-icons/ri";
import { PiEyeBold } from "react-icons/pi";
import "./actionbar.css";

const CustomAction = (props) => {
  const { numActions } = props;
  const actions = [];
  switch (numActions) {
    case "bound":
      actions.push(
        <div>
          <a>{<PiEyeBold />}</a>
          <a>{<RiTruckLine />}</a>
          <a>{<RiCheckboxLine />}</a>
          <a>{<RiEditBoxLine />}</a>
          <a>{<RiDeleteBin6Line />}</a>
        </div>
      );
      break;
    case "report":
      actions.push(
        <div>
          <a>{<PiEyeBold />}</a>
          <a>{<RiCheckboxLine />}</a>
          <a>{<RiPrinterLine />}</a>
          <a>{<RiEditBoxLine />}</a>
          <a>{<RiDeleteBin6Line />}</a>
        </div>
      );
      break;
    case "edt_del":
      actions.push(
        <div>
          <a>{<RiEditBoxLine />}</a>
          <a>{<RiDeleteBin6Line />}</a>
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
