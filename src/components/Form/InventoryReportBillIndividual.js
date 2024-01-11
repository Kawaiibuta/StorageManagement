import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";
import dayjs from "dayjs";

const report_columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    width: 150,
    key: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 200,
  },
  {
    title: "Actual Quantity",
    dataIndex: "actualQuantity",
    key: "actualQuantity",
    width: 200,
  },
  {
    title: "Difference Quantity",
    dataIndex: "differenceQuantity",
    key: "differenceQuantity",
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 200,
  },
];

const InventoryReportBillIndividual = React.forwardRef(
  ({ formData, type }, ref) => {
    const [warehouse, setWarehouse] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    console.log("formDatabill", formData);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userWarehouseId = user.employeeId.warehouseId;

    const goodsList = useSelector(
      (state) => state.product.goodsList?.allProductsIncludeDelete
    );

    const partners = useSelector(
      (state) => state.partner.supplier?.allPartnersIncludeDelete
    );
    console.log("userwh", userWarehouseId);

    // let supplier;
    // let supplierContactId;

    console.log("suppliers", partners);

    useEffect(() => {
      async function fetchData() {
        setIsFetching(true);
        try {
          const res = await getWarehouseById(userWarehouseId);
          console.log("res", res);
          setWarehouse(res.data);
        } catch (e) {
          console.log(e);
        }

        setIsFetching(false);
      }
      fetchData();
    }, [userWarehouseId]);

    console.log("warehouse", warehouse);
    if (isFetching) {
      return null;
    }

    return (
      <div ref={ref}>
        <div style={{ margin: "16px" }}>
          <div>
            <span style={{ fontSize: "28px" }} className="fs-32 bold">
              INVENTORY REPORT
            </span>
            <span className=" italic fs-14">{formData?.status}</span>
          </div>
          <div className="Info">
            <div className="TransactionInfo">
              <span className="fs-16 bold">Time of inventory: </span>
              {/* Thời gian thực hiện kiểm kê - chỗ này để ghi? */}
              <br />
              <span className="fs-16 bold">Created at: </span>
              <span className="fs-14 italic">{formData?.createdAt}</span>
              {/* Thời gian người tạo kiểm kê lên hệ thống? */}
              <br></br>
              <span className="fs-16 bold italic">
                Prepared by:{" "}
                {formData?.managerId?.code + " - " + formData?.managerId?.name}
              </span>
              {/* Người tạo kiểm kê lên hệ thống? */}
            </div>
            <div className="WarehouseInfo">
              <span className="fs-20 bold">
                Warehouse: {warehouse ? warehouse.name : ""}
              </span>
              <br></br>
              <span className="fs-12 italic">
                {warehouse ? warehouse.id : ""}
              </span>
              <br></br>
              <span className="fs-12 italic">
                {warehouse ? warehouse.contactId.address : ""}
              </span>
              <br></br>
              <span className="fs-12 italic">
                {warehouse
                  ? warehouse.contactId.phone_num +
                    " - " +
                    warehouse.contactId.email
                  : ""}
              </span>
            </div>
            {/* <div className="EmployeeInfo">
            <span className="fs-20 bold">
              Inventory Employee:
              Nhân viên kiểm kê
            </span>
            <br></br>
            <span className="fs-12 italic">
              employee id - Mã nhân viên
            </span>
          
          </div> */}
          </div>

          <div style={{ textAlign: "center" }} className="TransactionDetail">
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: "black",
                    },
                  },
                }}
              >
                <Table
                  bordered
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                  columns={report_columns}
                  dataSource={formData?.reportDetails?.map((detail, i) => {
                    const product = goodsList.find(
                      (goods) => goods._id === detail.productId
                    );
                    return {
                      key: detail.reportId,
                      name: product.name,
                      quantity: product.quantity,
                      actualQuantity: detail.actualQuantity,
                      differenceQuantity: detail.differenceQuantity,
                      description: detail.description,
                    };
                  })}
                  pagination={false}
                />
              </ConfigProvider>
            </div>
          </div>
          {type === "view" || (
            <div className="ConfirmationInformation">
              <div className="Signature">
                <div className="flex-grow ASign">
                  <span className="fs-16 bold">General Director</span>
                  <span className="fs-14">
                    {"(Opinions to  resolve the difference)"}
                  </span>
                  <span className="fs-14 italic">{"(Sign, full name)"}</span>
                </div>
                <div className="flex-grow ASign">
                  <span className="fs-16 bold">
                    Head of the inventory department
                  </span>
                  <span className="fs-14 italic">{"(Sign, full name)"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default InventoryReportBillIndividual;
