import React, { useRef, useState } from "react";
import { Button, Tooltip } from "antd";
import { MdAdd, MdAutorenew } from "react-icons/md";
import "./custombutton.css";
import InboundForm from "../Form/InBoundForm.js";
import OutboundForm from "../Form/OutBoundForm.js";
import InventoryReport from "../Form/InventoryReport.js";
import NewCustomerForm from "../Form/NewCustomerForm.js";
import NewEmployeeForm from "../Form/NewEmployeeForm.js";
import NewProductForm from "../Form/NewProductForm.js";
import NewSupplierForm from "../Form/NewSupplierForm.js";
import NewUserForm from "../Form/NewUserForm.js";
import NewWarehouseForm from "../Form/NewWarehouseForm.js";
import { BiTransfer } from "react-icons/bi";
import EmployeeTransferForm from "../Form/EmployeeTransferForm.js";
import ProductTransferForm from "../Form/ProductTransferForm.js";
import { useReactToPrint } from "react-to-print";
import { RiPrinterLine } from "react-icons/ri";
import InventoryReportBill from "../Form/InventoryReportBill.js";
import { useSelector } from "react-redux";
import ExportCustomerList from "../Form/ExportCustomerList.js";
import ExportProductList from "../Form/ExportProductList.js";

const PrintButton = ({
  allInventoryReportData,
  customersList,
  suppliersList,
  productsList,
  page,
}) => {
  console.log("page", page);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ display: "none" }}>
        {page === "report" && (
          <InventoryReportBill
            formData={allInventoryReportData}
            ref={componentRef}
          />
        )}
        {page === "customer" && (
          <ExportCustomerList formData={customersList} ref={componentRef} />
        )}
        {page === "supplier" && (
          <ExportCustomerList
            type="supplier"
            formData={suppliersList}
            ref={componentRef}
          />
        )}
        {page === "product" && (
          <ExportProductList formData={productsList} ref={componentRef} />
        )}
      </div>
      <Button className="two-three" onClick={handlePrint}>
        <BiTransfer className="icon" />
        PRINT
      </Button>
    </>
  );
};

const CustomButton = ({
  managersList,
  onUpdateData,
  numButtons,
  page,
  position,
  employeeSelectionList,
  productSelectionList,
  allInventoryReportData,
}) => {
  const buttons = [];
  const form = [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTransferOpen, setIsModalTransferOpen] = useState(false);
  const customersList = useSelector(
    (state) => state.partner.customer?.allCustomers
  );
  const suppliersList = useSelector(
    (state) => state.partner.supplier?.allSuppliers
  );
  const productsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );

  console.log("productlist", productsList);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalTransfer = () => {
    setIsModalTransferOpen(true);
  };
  const handleOkTransfer = () => {
    setIsModalTransferOpen(false);
    onUpdateData();
  };
  const handleCancelTransfer = () => {
    setIsModalTransferOpen(false);
  };

  const handleButtonClick = (buttonType) => {
    if (buttonType === "NEW") {
      showModal();
    } else if (buttonType === "REFRESH") {
      onUpdateData();
    } else {
      console.log("trans", employeeSelectionList);
      showModalTransfer();
    }
  };
  switch (page) {
    case "inbound":
      form.push(
        <InboundForm
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
        />
      );

      break;
    case "outbound":
      form.push(
        <OutboundForm
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
        />
      );

      break;
    case "report":
      form.push(
        <InventoryReport
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
        />
      );

      break;
    case "product":
      form.push(
        <>
          <NewProductForm
            onUpdateData={onUpdateData}
            isModalOpen={isModalOpen}
            handleOkButton={handleOk}
            handleCancelButton={handleCancel}
          />
          <ProductTransferForm
            productList={productSelectionList}
            handleCancelButton={handleCancelTransfer}
            handleOkButton={handleOkTransfer}
            isModalOpen={isModalTransferOpen}
          />
        </>
      );

      break;
    case "supplier":
      form.push(
        <NewSupplierForm
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
        />
      );

      break;
    case "customer":
      form.push(
        <NewCustomerForm
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
        />
      );

      break;
    case "employee":
      form.push(
        <>
          <NewEmployeeForm
            onUpdateData={onUpdateData}
            isModalOpen={isModalOpen}
            handleOkButton={handleOk}
            handleCancelButton={handleCancel}
            position={position}
          />
          <EmployeeTransferForm
            employeeList={employeeSelectionList}
            handleCancelButton={handleCancelTransfer}
            handleOkButton={handleOkTransfer}
            isModalOpen={isModalTransferOpen}
          />
        </>
      );

      break;
    case "user":
      form.push(
        <NewUserForm
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
        />
      );

      break;
    case "warehouseinter":
      form.push(
        <NewWarehouseForm
          onUpdateData={onUpdateData}
          isModalOpen={isModalOpen}
          handleOkButton={handleOk}
          handleCancelButton={handleCancel}
          managersList={managersList}
        />
      );

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
    case 3:
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
      buttons.push(
        <Button
          className="two-three"
          onClick={() => handleButtonClick("TRANSFER")}
        >
          <BiTransfer className="icon" />
          TRANSFER
        </Button>
      );
      page === "product" &&
        buttons.push(
          <PrintButton
            allInventoryReportData={allInventoryReportData}
            productList={productsList}
            page={page}
          />
        );
      break;

    case 4:
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
      buttons.push(
        <PrintButton
          allInventoryReportData={allInventoryReportData}
          customersList={customersList}
          suppliersList={suppliersList}
          page={page}
        />
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

      {form}

      {/* Test */}
      {/* <Modal
        open={isModal2Open}
        onOk={handleOk2}
        onCancel={handleCancel2}
        width="21cm"
        height="29.7cm"
      >
        {<OutBoundBill />}
      </Modal> */}
      {/* End Test */}
    </div>
  );
};
export default CustomButton;
