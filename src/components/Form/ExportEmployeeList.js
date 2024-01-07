import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

const export_employees_columns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 110,
    render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
  },
  {
    title: "Full Name",
    width: 180,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "6",
    width: 150,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "6",
    width: 120,
  },
  {
    title: "ID Card",
    dataIndex: "id_card",
    key: "6",
    width: 150,
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "6",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "6",
    width: 200,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_num",
    key: "6",
    width: 180,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "6",
    width: 200,
  },
  {
    title: "Warehouse",
    dataIndex: "warehouseCodeAndName",
    key: "6",
    width: 150,
  },
  {
    title: "Start Time",
    dataIndex: "start_time_format",
    key: "6",
    width: 200,
  },
];

const ExportEmployeeList = React.forwardRef(({ formData }, ref) => {
  const [warehouse, setWarehouse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  console.log("formData?bill", formData);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProductsIncludeDelete
  );

  const partners = useSelector(
    (state) => state.partner.supplier?.allPartnersIncludeDelete
  );
  console.log("userwh", userWarehouseId);

  let supplier;
  let supplierContactId;

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

  if (partners && formData && warehouse) {
    supplier = partners?.find((sup) => sup._id === formData.supplierId);
    supplierContactId = supplier.contactId;
  }
  console.log("warehouse", warehouse);
  if (isFetching) {
    return null;
  }

  return (
    <div ref={ref}>
      <div style={{ margin: "16px" }}>
        <div>
          <span style={{ fontSize: "28px" }} className="fs-32 bold">
            EMPLOYEE LIST
          </span>
          <span className=" italic fs-14">{formData?.status}</span>
        </div>
        <div className="Info">
          <div className="TransactionInfo">
            <span className="fs-16 bold">Export at: </span>
            <span className="fs-14 italic">{formData?.create_time}</span>
            <br></br>
            <span className="fs-16 bold">Export by: </span>
            <span className="fs-14 italic">{formData?.currentUser}</span>
            <br></br>
            <span className="fs-16 bold">Employee Count:</span>
            <span className="fs-14 italic">
              {/* number of employee (có bao nhiêu nhân viên ... */}
            </span>
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
                bordered
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                }}
                columns={export_employees_columns}
                dataSource={formData?.trans_details.map((detail, i) => {
                  const product = goodsList.find(
                    (goods) => goods._id === detail.productId
                  );
                  return {
                    id: i + 1,
                    name: product.name,
                    quantity: detail.quantity,
                    price: Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(detail.total),
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

export default ExportEmployeeList;
