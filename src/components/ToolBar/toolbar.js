import React from "react";
import CustomButton from "../../components/CustomButton/custombutton.js";
import SearchBar from "../../components/SearchBar/searchbar.js";
import "./toolbar.css";

const ToolBar = ({
  managersList,
  onUpdateData,
  onLoadingChange,
  type,
  page,
  position,
  employeeSelectionList,
  productSelectionList,
  allInventoryReportData,
}) => {
  const toolbar = [];
  switch (type) {
    case 0:
      break;
    case 1:
      toolbar.push(
        <div>
          <CustomButton
            onUpdateData={onUpdateData}
            className="left"
            numButtons={1}
            page={page}
          />
        </div>
      );
      break;
    case 2:
      toolbar.push(
        <div>
          <CustomButton
            position={position}
            managersList={managersList}
            onUpdateData={onUpdateData}
            onLoadingChange={onLoadingChange}
            className="left"
            numButtons={2}
            page={page}
          />
        </div>
      );
      break;
    case 3:
      toolbar.push(
        <div>
          <CustomButton
            position={position}
            managersList={managersList}
            onUpdateData={onUpdateData}
            onLoadingChange={onLoadingChange}
            className="left"
            numButtons={3}
            page={page}
            employeeSelectionList={employeeSelectionList}
            productSelectionList={productSelectionList}
          />
        </div>
      );
      break;
    case 4:
      toolbar.push(
        <div>
          <CustomButton
            onUpdateData={onUpdateData}
            className="left"
            numButtons={4}
            page={page}
            allInventoryReportData={allInventoryReportData}
          />
        </div>
      );
      break;
    default:
      toolbar.push(
        <div>
          <CustomButton className="left" numButtons={1} page={page} />
        </div>
      );
      break;
  }
  return toolbar;
};
export default ToolBar;
