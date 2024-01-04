import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Modal, Table } from "antd";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

import "./style.css";
import { getWarehouseById } from "../../redux/apiRequest";

const OutBoundBill = React.forwardRef(({ formData }, ref) => {
  console.log("formData?bill", formData);
  const [warehouse, setWarehouse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProductsIncludeDelete
  );
  const partners = useSelector(
    (state) => state.partner.supplier?.allPartnersIncludeDelete
  );

  let customer;
  let customerContactId;

  console.log("userwh", userWarehouseId);

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
    customer = partners?.find((cus) => cus._id === formData.customerId);
    customerContactId = customer.contactId;
  }
  console.log("warehouse", warehouse);
  if (isFetching) {
    return null;
  }

  const outbound_detail_columns = [
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
      width: 100,
    },
  ];

  return (
    <div ref={ref}>
      <div style={{ margin: "16px" }}>
        <div>
          <span style={{ fontSize: "28px" }} className="fs-32 bold">
            OUTBOUND
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
              Customer: {formData?.customerName}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {customerContactId ? customerContactId.address : ""}
            </span>
            <br></br>
            <span className="fs-12 italic">
              {customerContactId
                ? customerContactId.phone_num + " - " + customerContactId.email
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
                  maxWidth: "80vw",
                  textAlign: "center",
                }}
                columns={outbound_detail_columns}
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
        <div className="TotalPrice">
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "flex-end",
            }}
          >
            <span className="fs-24 bold" style={{ marginRight: "10px" }}>
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
    //   </Modal>
    // </ConfigProvider>
  );
});

export default OutBoundBill;
