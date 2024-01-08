import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

const export_warehouses_columns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 80,
    render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
  },
  {
    title: "Warehouse Name",
    width: 200,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Warehouse Address",
    dataIndex: "address",
    key: "address",
    width: 200,
  },
  {
    title: "Warehouse Contact",
    dataIndex: "phone_num",
    key: "phone_num",
    width: 150,
  },
  {
    title: "Warehouse Manager",
    dataIndex: "managerCodeAndName",
    key: "managerCodeAndName",
    width: 200,
  },
  {
    title: "Warehouse Capacity",
    dataIndex: "capacity",
    key: "capacity",
    width: 150,
  },

  {
    title: "Warehouse Description",
    dataIndex: "description",
    key: "description",
    width: 200,
  },
];

const ExportWarehouseList = React.forwardRef(({ formData }, ref) => {
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
            WAREHOUSE LIST
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
            <span className="fs-16 bold">Warehouse Count:</span>
            <span className="fs-14 italic">
              {/* number of supplier (có bao nhiêu nhân viên ... */}
            </span>
            <br></br>
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
                columns={export_warehouses_columns}
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

export default ExportWarehouseList;
