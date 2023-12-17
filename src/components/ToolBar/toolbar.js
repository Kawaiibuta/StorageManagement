import React from "react";
import CustomButton from "../../components/CustomButton/custombutton.js";
import SearchBar from "../../components/SearchBar/searchbar.js";
import "./toolbar.css";

const ToolBar = (props) => {
  const { type } = props;
  const toolbar = [];
  switch (type) {
    case 0:
      break;
    case 1:
      toolbar.push(
        <div>
          <CustomButton className="left" numButtons={1} />
          <SearchBar className="right"></SearchBar>
        </div>
      );
      break;
    case 2:
      toolbar.push(
        <div>
          <CustomButton className="left" numButtons={2} />
          <SearchBar className="right"></SearchBar>
        </div>
      );
      break;
    case 3:
      toolbar.push(
        <div>
          <SearchBar className="right"></SearchBar>
        </div>
      );
      break;
    default:
      toolbar.push(
        <div>
          <CustomButton className="left" numButtons={1} />
          <SearchBar className="right"></SearchBar>
        </div>
      );
      break;
  }
  return toolbar;
};
export default ToolBar;
