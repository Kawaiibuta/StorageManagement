import React, { useEffect, useState } from "react";
import axios from "axios";
import { getWarehouseById } from "../../redux/apiRequest";

import "./dashboard.css";
// import { Gauge } from "@ant-design/charts";
// import { Column } from "@ant-design/plots";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Button, DatePicker, Table, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { TabPane } = Tabs;
function Dashboard() {
  const [selectedType, setSelectedType] = useState("day");
  const [items, setItems] = useState([]);
  const [inbound, setInbound] = useState(0);
  const [outbound, setOutbound] = useState(0);
  const [inbound_done, setInboundDone] = useState(0);
  const [inbound_order, setInboundOrder] = useState(0);
  const [inbound_ship, setInboundShip] = useState(0);
  const [inbound_return, setInboundReturn] = useState(0);
  const [outbound_done, setOutboundDone] = useState(0);
  const [outbound_order, setOutboundOrder] = useState(0);
  const [outbound_ship, setOutboundShip] = useState(0);
  const [outbound_return, setOutboundReturn] = useState(0);
  const [warehouse, setWarehouse] = useState([]);
  const [manager, setManager] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  //Thuộc tinh của WarehouseCapacity
  const data5 = {
    labels: ["Warehouse in Used", "Free"],
    datasets: [
      {
        data: [2000, 1000], //chỗ này là số đầu thể hiện phần cap đã sử dụng, số sau thể hiện phần cap trống còn lại => x và 100%-x
        borderWidth: 1,
        borderColor: "black",
        circumference: 230,
        rotation: 245,
        cutout: "75%",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex == 0) {
            return getGradient(chart);
          } else {
            return "#f5f5f5";
          }
        },
      },
    ],
  };
  const options5 = {
    plugins: {
      legend: {
        display: false,
      },
      gaugeText: {
        text: "2000 in use", //Đây để truyền số cho phần cap đã sử dụng
      },
    },
  };
  //Chia cột cho 2 bảng thông tin
  const table_columns = [
    {
      title: "Tên thông tin",
      render: (data) => {
        return <a href="#">{data.name}</a>;
      },
      width: "20px",
      textAlign: "right",
    },
    {
      title: "Thông tin",
      width: "4vw",
      dataIndex: "info",
    },
  ];
  //Truyền dữ liệu cho Order Status Outbound
  const orderstatus_dataSource_Outbound = [
    {
      name: "Done",
      info: outbound_done,
    },
    {
      name: "Return",
      info: outbound_return,
    },
    {
      name: "Order",
      info: outbound_order,
    },
    {
      name: "Ship",
      info: outbound_ship,
    },
  ];
  //Truyền dữ liệu cho Order Status Inbound
  const orderstatus_dataSource_Inbound = [
    {
      name: "Done",
      info: inbound_done,
    },
    {
      name: "Return",
      info: inbound_return,
    },
    {
      name: "Order",
      info: inbound_order,
    },
    {
      name: "Ship",
      info: inbound_ship,
    },
  ];
  //Truyền dữ liệu cho Warehouse Status Today
  const warehousestatus_dataSource = [
    {
      name: "Warehouse Name:",
      info: warehouse.name,
    },
    {
      name: "Capacity: ",
      info: warehouse.capacity,
    },
    {
      name: "Stored",
      info: "724",
    },
    {
      name: "Free",
      info: "79",
    },
    {
      name: "Manager: ",
      info: manager,
    },
    {
      name: "Address",
      info: address,
    },
    {
      name: "Status",
      info: warehouse.isDeleted ? "Inactive" : "Active",
    },
  ];
  //Thuộc tính của WarehouseCapacity

  const gaugeText = {
    id: "gaugeText",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { width },
      } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;
      const text = pluginOptions.text || "Text";
      const fontSize = Math.min(width / 10);

      ctx.save();
      ctx.fillStyle = "gray";
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(text, xCenter, yCenter - width / 30);
      ctx.restore();
    },
  };
  function getGradient(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);
    gradientSegment.addColorStop(1, "red");
    gradientSegment.addColorStop(0.7, "orange");
    gradientSegment.addColorStop(0.3, "yellow");
    gradientSegment.addColorStop(0, "lime");
    return gradientSegment;
  }
  const data = {
    labels: ["Total Transaction", "Inbound", "Outbound"],
    datasets: [
      {
        label: "Num",
        // data: [items.length, inbound, outbound], // Giá trị của 3 cột lân lượt Tổng, In, Out
        data: [25, 12, 13],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Màu của cột Tổng Transaction
          "rgba(255, 99, 132, 0.6)", // Màu của cột Inbound
          "rgba(255, 205, 86, 0.6)", // Màu của cột Outbound
        ],
        borderWidth: 1,
        barPercentage: 0.4,
        categoryPercentage: 1,
      },
    ],
  };

  // Cấu hình của biểu đồ Transaction
  const options = {
    maintainAspectRatio: false, // Tắt tự động duy trì tỷ lệ khung hình

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: [
        {
          type: "linear",
          position: "bottom",
        },
      ],
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const handleTabChange = (key) => {
    // Thực hiện logic thay đổi dữ liệu theo ngày, tháng, năm
    setSelectedType(key);
  };

  const countstatus = (temp) => {
    let inbound_done_count = 0;
    let inbound_order_count = 0;
    let inbound_return_count = 0;
    let inbound_ship_count = 0;
    let outbound_done_count = 0;
    let outbound_order_count = 0;
    let outbound_return_count = 0;
    let outbound_ship_count = 0;
    temp.forEach((item) => {
      const key = `${item.type}_${item.status}`;

      switch (key) {
        case "Inbound_Done":
          inbound_done_count++;
          break;
        case "Inbound_Order":
          inbound_order_count++;
          break;
        case "Inbound_Return":
          inbound_return_count++;
          break;
        case "Inbound_Ship":
          inbound_ship_count++;
          break;
        case "Outbound_Done":
          outbound_done_count++;
          break;
        case "Outbound_Order":
          outbound_order_count++;
          break;
        case "Outbound_Return":
          outbound_return_count++;
          break;
        case "Outbound_Ship":
          outbound_ship_count++;
          break;
        default:
          break;
      }
    });
    setInboundDone(inbound_done_count);
    setInboundOrder(inbound_order_count);
    setInboundReturn(inbound_return_count);
    setInboundShip(inbound_ship_count);
    setOutboundDone(outbound_done_count);
    setOutboundOrder(outbound_order_count);
    setOutboundReturn(outbound_return_count);
    setOutboundShip(outbound_ship_count);
  };

  const counttrans = (temp) => {
    let inbound_count = 0;
    let outbound_count = 0;
    temp.forEach((item) => {
      if (item.type === "Inbound") {
        inbound_count++;
      } else if (item.type === "Outbound") {
        outbound_count++;
      }
    });
    setInbound(inbound_count);
    setOutbound(outbound_count);
  };
  const fetchtrans = async () => {
    try {
      const res = await axios.get(
        `https://warehousemanagement.onrender.com/api/transaction/byWarehouse/657f1395e25a1ba0b17e6689`
      );
      const temp = res.data;
      const gettransbyday = [];
      const gettransbymonth = [];
      const gettransbyyear = [];

      temp.forEach((item) => {
        const transactionDate = new Date(item.createdAt);
        const day = ("0" + transactionDate.getDate()).slice(-2);
        const month = ("0" + (transactionDate.getMonth() + 1)).slice(-2);
        const year = transactionDate.getFullYear().toString();
        const selectday = selectedDay ? selectedDay.format("DD") : null;
        const selectmonth = selectedMonth ? selectedMonth.format("MM") : null;
        const selectyear = selectedYear ? selectedYear.format("YYYY") : null;
        console.log(selectyear === year);

        if (selectday === day && selectmonth === month && selectyear === year) {
          gettransbyday.push(item);
        } else if (
          selectday === null &&
          selectmonth === month &&
          selectyear === year
        ) {
          gettransbymonth.push(item);
        } else if (
          selectday === null &&
          selectmonth === null &&
          selectyear === year
        ) {
          gettransbyyear.push(item);
        }
      });
      console.log(gettransbyday);
      console.log(gettransbymonth);
      console.log(gettransbyyear);

      if (gettransbyday && gettransbyday.length > 0) {
        setItems(gettransbyday);
        counttrans(gettransbyday);
      } else if (gettransbymonth && gettransbymonth.length > 0) {
        setItems(gettransbymonth);
        counttrans(gettransbymonth);
      } else if (gettransbyyear && gettransbyyear.length > 0) {
        setItems(gettransbyyear);
        counttrans(gettransbyyear);
      } else {
        setItems([]);
        counttrans([]);
      }
      console.log(items);

      countstatus(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWarehouseById(`657f1395e25a1ba0b17e6689`);
        const temp = res.data;
        setWarehouse(res.data);
        setManager(temp.managerId.name);
        setAddress(temp.contactId.address);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchtrans();
  }, [selectedDay, selectedMonth, selectedYear]);
  console.log(warehouse);

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="TransactionsToday">
          <span className="Title">Transaction Today</span>
          <div className="filter">
            <div className="filter_date">
              <DatePicker
                className="filter_picker"
                onChange={(date) => setSelectedDay(date || undefined)}
                format="DD"
                placeholder="Select Day"
              />

              <DatePicker
                className="filter_picker"
                onChange={(date) => setSelectedMonth(date)}
                picker="month"
                format="MM"
                placeholder="Select Month"
              />

              <DatePicker
                className="filter_picker"
                onChange={(date) => setSelectedYear(date)}
                picker="year"
                format="YYYY"
                placeholder="Select Year"
              />
            </div>
            <Button className="filter_button" onClick={fetchtrans}>
              Apply Filter
            </Button>
          </div>
          <div className="ChartBarWrapper">
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="OrderStatus">
          <div className="InboundStatus">
            <span className="Title">Inbound Today</span>
            <Table
              columns={table_columns}
              dataSource={orderstatus_dataSource_Inbound}
              pagination={false}
              showHeader={false}
              size={"large"}
            />
          </div>
          <div className="OutboundStatus">
            <span className="Title">Outbound Today</span>
            <Table
              columns={table_columns}
              dataSource={orderstatus_dataSource_Outbound}
              pagination={false}
              showHeader={false}
              size={"large"}
            />
          </div>
        </div>
        <div className="WarehouseStatus">
          <div className="WarehouseDetail">
            <span className="Title">Warehouse Status</span>
            <Table
              columns={table_columns}
              dataSource={warehousestatus_dataSource}
              pagination={false}
              showHeader={false}
              size={"small"}
            />
          </div>
          <div className="WarehouseCapacity">
            <span className="Title">Warehouse Capacity</span>
            <div className="DoughnutWrapper">
              <Doughnut
                data={data5}
                options={options5}
                plugins={[gaugeText]}
              ></Doughnut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
