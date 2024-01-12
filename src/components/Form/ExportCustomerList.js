import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

const export_customers_columns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 90,
    render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
  },
  {
    title: "Full Name",
    width: 200,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "6",
    width: 250,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_num",
    key: "phone_num",
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
];

const ExportCustomerList = React.forwardRef(({ formData, type }, ref) => {
  const [warehouse, setWarehouse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  console.log("formData?bill", formData);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId?.warehouseId;

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
            {type === "supplier" ? "SUPPLIER LIST" : "CUSTOMER LIST"}
          </span>
        </div>
        <div className="Info">
          <div className="TransactionInfo">
            <span className="fs-16 bold">
              {"Export at:" + new Date().toLocaleString() + ""}
            </span>
            <span className="fs-14 italic">{formData?.create_time}</span>
            <br></br>
            <span className="fs-16 bold">Export by: </span>
            <span className="fs-14 italic">{user.employeeId?.name}</span>
            <br></br>
            <span className="fs-16 bold">Customer Count:</span>
            <span className="fs-14 italic">{formData?.length}</span>
            <br></br>
          </div>
          <div className="WarehouseInfo">
            <span className="fs-20 bold">
              Warehouse: {warehouse ? warehouse.name : ""}
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
                size="small"
                bordered
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                }}
                columns={export_customers_columns}
                dataSource={formData?.map((cus, i) => {
                  return {
                    key: cus._id,
                    code: cus.code,
                    name: cus.name,
                    address: cus.contactId.address,
                    phone_num: cus.contactId.phone_num,
                    email: cus.contactId.email,
                  };
                })}
                pagination={false}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ExportCustomerList;
