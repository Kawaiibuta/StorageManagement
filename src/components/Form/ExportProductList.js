import React, { useEffect, useState } from "react";
import "./style.css";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";
import { getWarehouseById } from "../../redux/apiRequest";

const export_goods_columns = [
  {
    title: "SKU",
    width: 110,
    dataIndex: "sku_code",
    key: "sku_code",
    render: (text) => <p style={{ color: "#1677ff" }}>{text}</p>,
  },
  {
    title: "Full Name",
    width: 200,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Supplier",
    dataIndex: "supplierCodeAndName",
    key: "supplierCodeAndName",
    width: 230,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 170,
    render: (text, _) => (
      <img src={text} style={{ width: "70px" }} alt="product"></img>
    ),
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    width: 100,
  },
  {
    title: "Specification",
    dataIndex: "specification",
    key: "specification",
    width: 200,
  },
  {
    title: "Maximum Quantity",
    dataIndex: "maximum_quantity_format",
    key: "maximum_quantity_format",
    width: 150,
  },
  {
    title: "Price",
    dataIndex: "price_format",
    key: "price_format",
    width: 150,
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    width: 230,
  },
];

const ExportProductList = React.forwardRef(({ formData }, ref) => {
  const [warehouse, setWarehouse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  // console.log("formData?bill", formData);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userWarehouseId = user.employeeId.warehouseId;

  const partners = useSelector(
    (state) => state.partner.supplier?.allPartnersIncludeDelete
  );

  const goodsList = useSelector(
    (state) => state.product.goodsList?.allProducts
  );
  console.log("userwh", userWarehouseId);

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
            PRODUCT LIST
          </span>
        </div>
        <div className="Info">
          <div className="TransactionInfo">
            <span className="fs-16 bold">
              {" "}
              {"Export at:" + new Date().toLocaleString() + ""}
            </span>
            {/* <span className="fs-14 italic">{formData?.create_time}</span> */}
            <br></br>
            <span className="fs-16 bold">Export by: </span>
            <span className="fs-14 italic">{user.employeeId?.name}</span>
            <br></br>
            <span className="fs-16 bold">Product Count:</span>
            <span className="fs-14 italic">{goodsList?.length}</span>
            <br></br>
            <span className="fs-16 bold">Total Value:</span>
            <span className="fs-14 italic">
              {/* total of value of at the time */}
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
                columns={export_goods_columns}
                dataSource={goodsList?.map((goods) => {
                  return {
                    key: goods?._id,
                    name: goods.name,
                    sku_code: goods.skuCode,
                    supplier_name: goods.supplierId?.code,
                    supplier_id: goods.supplierId?._id,
                    supplierCodeAndName:
                      goods.supplierId?.code + " - " + goods.supplierId?.name,
                    maximum_quantity: goods.maximumQuantity,
                    maximum_quantity_format:
                      goods.maximumQuantity.toLocaleString(),
                    price: goods.price,
                    price_format: Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(goods.price),
                    unit: goods.unit,
                    image: goods.imageUrl,
                    specification: goods.specification,
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

export default ExportProductList;
