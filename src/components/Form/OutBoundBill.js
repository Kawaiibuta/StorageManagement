import React from "react";
import "./style.css";
import { Table } from "antd";

function outbound_detail_item(num, name, quantity, price) {
  this.num = num;
  this.name = name;
  this.quantity = quantity;
  this.price = price;
}
const outbound_detail_dataSource = [
  new outbound_detail_item(1, "Product1", 2, "600.000"),
  new outbound_detail_item(2, "Product2", 3, "900.000"),
  new outbound_detail_item(3, "Product3", 1, "300.000"),
  new outbound_detail_item(4, "Product4", 5, "1.500.000"),
  new outbound_detail_item(5, "Product5", 4, "1.200.000"),
];
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

function OutBoundBill() {
  return (
    <>
      <div className="Header">
        <span style={{ fontSize: "28px" }} className="fs-32 bold">
          OUTBOUND1
        </span>
        <span className=" italic fs-14">Order/Delivery/Done</span>
      </div>
      <div className="Info">
        <div className="TransactionInfo">
          <span className="fs-16 bold">Order at: </span>
          <span className="fs-14 italic">{}</span>
          <br></br>
          <span className="fs-16 bold">Finish at:</span>
          <span className="fs-14 italic"> {}</span>
          <br></br>
          <span className="fs-16 bold italic">Prepared by {}</span>
        </div>
        <div className="WarehouseInfo">
          <span className="fs-20 bold">Warehouse: {}</span>
          <br></br>
          <span className="fs-12 italic">123 ABC Street, State 1{}</span>
          <br></br>
          <span className="fs-12 italic">
            0900109001-warehouse1@gmail.com{}
            {}
          </span>
        </div>
        <div className="PartnerInfo">
          <span className="fs-20 bold">Customer: {}</span>
          <br></br>
          <span className="fs-12 italic">123 ABC Street, State 1{}</span>
          <br></br>
          <span className="fs-12 italic">
            0900109001-customer1@gmail.com{}
            {}
          </span>
        </div>
      </div>

      <div className="TransactionDetail">
        <div>
          <Table
            style={{
              marginTop: "10px",
              maxWidth: "80vw",
            }}
            columns={outbound_detail_columns}
            dataSource={outbound_detail_dataSource}
            pagination={false}
          />
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
            4.500.000{}
          </div>
          <span className="fs-16 bold">VNĐ</span>
        </div>
      </div>
    </>
  );
}

export default OutBoundBill;
