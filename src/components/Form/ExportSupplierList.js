import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

const export_suppliers_columns = [
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

const ExportSupplierList = React.forwardRef(({ formData }, ref) => {
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
            SUPPLIER LIST
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
            <span className="fs-16 bold">Supplier Count:</span>
            <span className="fs-14 italic">
              {/* number of supplier (có bao nhiêu nhân viên ... */}
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
                columns={export_suppliers_columns}
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

export default ExportSupplierList;
