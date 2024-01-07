import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

function inbound_detail_item(num, name, quantity, price) {
  this.num = num;
  this.name = name;
  this.quantity = quantity;
  this.price = price;
}
const inbound_detail_dataSource = [
  new inbound_detail_item(1, "Product1", 2, "600.000"),
  new inbound_detail_item(2, "Product2", 3, "900.000"),
  new inbound_detail_item(3, "Product3", 1, "300.000"),
  new inbound_detail_item(4, "Product4", 5, "1.500.000"),
  new inbound_detail_item(5, "Product5", 4, "1.200.000"),
];
const inbound_detail_columns = [
  {
    title: "No.",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
  {
    title: "Product Name",
    width: 250,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 100,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
];

const InBoundBill = React.forwardRef(({ formData }, ref) => {
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
            INBOUND
          </span>
          <span className=" italic fs-14">{formData?.status}</span>
        </div>
        <div className="Info">
          <div className="TransactionInfo">
            <span className="fs-16 bold">Order at: </span>
            <span className="fs-14 italic">{formData?.create_time}</span>
            <br></br>
            <span className="fs-16 bold">Finish at:</span>
            <span className="fs-14 italic"> {formData?.update_time}</span>
            <br></br>
            <span className="fs-16 bold italic">
              Prepared by {formData?.creatorName}
            </span>
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
          <div className="PartnerInfo">
            <span className="fs-20 bold">
              Supplier: {formData?.supplierName}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {supplierContactId ? supplierContactId.address : ""}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {supplierContactId
                ? supplierContactId.phone_num + " - " + supplierContactId.email
                : ""}
              {}
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
                columns={inbound_detail_columns}
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
        <div className="ConfirmationInformation">
          <div className="Signature">
            <div className="flex-grow ASign">
              <span className="fs-20 bold">Employee</span>
              <span className="fs-14 italic">{"(Sign, full name)"}</span>
            </div>
            <div className="flex-grow ASign">
              <span className="fs-20 bold">Supplier</span>
              <span className="fs-14 italic">{"(Sign, full name)"}</span>
            </div>
          </div>
          <div className="TotalPrice">
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <span className="fs-20 bold" style={{ marginRight: "10px" }}>
                Total:
              </span>
              <div
                style={{
                  width: "200px",
                  height: "40px",
                  fontSize: "32px",
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  display: "inline",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textAlign: "right",
                  paddingRight: "10px",
                  paddingBottom: "5px",
                }}
              >
                {formData?.total_value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InBoundBill;
