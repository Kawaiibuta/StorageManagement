import React from "react";
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
import { Table } from "antd";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Dashboard() {
  //Thuộc tinh của TransactionToday
  const data1 = {
    labels: ["Nums of Transactions"],
    datasets: [
      {
        label: "Poll",
        data: [270, 20], //chỗ này là số đầu thể hiện số lượng, số sau thể hiện phần còn lại để đạt tối đa quy định => x và 100%-x
        borderWidth: 1,
        borderColor: "black",
        circumference: 180,
        rotation: 270,
        cutout: "70%",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex == 0) {
            return getGradient(chart);
          } else {
            return "black";
          }
        },
      },
    ],
  };
  const options1 = {
    plugins: {
      legend: {
        display: false,
        width: 200,
        height: 170,
      },
      gaugeText: {
        text: "270", //Đây để truyền số Transactions
      },
    },
  };
  //Thuộc tinh của Inbound
  const data2 = {
    labels: ["Nums of Inbound"],
    datasets: [
      {
        data: [150, 10], //chỗ này là số đầu thể hiện số lượng, số sau thể hiện phần còn lại để đạt tối đa quy định => x và 100%-x
        borderWidth: 1,
        borderColor: "black",
        circumference: 180,
        rotation: 270,
        cutout: "70%",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex == 0) {
            return getGradient(chart);
          } else {
            return "black";
          }
        },
      },
    ],
  };
  const options2 = {
    plugins: {
      legend: {
        display: false,
        width: 200,
        height: 170,
      },
      gaugeText: {
        text: "150", //Đây để truyền số Transactions
      },
    },
  };
  //Thuộc tinh của Outbound
  const data3 = {
    labels: ["Nums of Outbound"],
    datasets: [
      {
        label: "Poll",
        data: [120, 10], //chỗ này là số đầu thể hiện số lượng, số sau thể hiện phần còn lại để đạt tối đa quy định => x và 100%-x
        borderWidth: 1,
        borderColor: "black",
        circumference: 180,
        rotation: 270,
        cutout: "70%",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex == 0) {
            return getGradient(chart);
          } else {
            return "black";
          }
        },
      },
    ],
  };
  const options3 = {
    plugins: {
      legend: {
        display: false,
        width: 200,
        height: 170,
      },
      gaugeText: {
        text: "120", //Đây để truyền số Transactions
      },
    },
  };
  //Thuộc tinh của ActivPartners
  const data4 = {
    labels: ["Warehouse Capacity"],
    datasets: [
      {
        data: [50, 40], //chỗ này là số đầu thể hiện số lượng, số sau thể hiện phần còn lại để đạt tối đa quy định x và 100%-x
        borderWidth: 1,
        borderColor: "black",
        circumference: 180,
        rotation: 270,
        cutout: "70%",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex == 0) {
            return getGradient2(chart);
          } else {
            return "black";
          }
        },
      },
    ],
  };
  const options4 = {
    plugins: {
      legend: {
        display: false,
        width: 200,
        height: 170,
      },
      gaugeText: {
        text: "50", //Đây để truyền số Transactions
      },
    },
  };
  //Thuộc tinh của WarehouseCapacity
  const data5 = {
    labels: ["Warehouse Capacity"],
    datasets: [
      {
        data: [1900, 100], //chỗ này là số đầu thể hiện phần cap đã sử dụng, số sau thể hiện phần cap trống còn lại => x và 100%-x
        borderWidth: 1,
        borderColor: "black",
        circumference: 180,
        rotation: 270,
        cutout: "70%",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          if (context.dataIndex == 0) {
            return getGradient2(chart);
          } else {
            return "black";
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
        text: "1900 in use", //Đây để truyền số cho phần cap đã sử dụng
      },
    },
  };
  //Thuộc tinh của OrderStatus Graph
  const data6 = {
    labels: ["Total", "Released", "Picked", "Packed", "Shipped"],
    datasets: [
      {
        data: [500, 300, 100, 60, 40],
        backgroundColor: ["yellowgreen", "cyan"],
        borderColor: "black",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  const options6 = {
    plugins: {
      legend: {
        display: false,
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
      width: "17vw",
      fontSize: "3px",
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      width: "3vw",
    },
  ];
  //Truyền dữ liệu cho Order Status Today
  const orderstatus_dataSource = [
    {
      name: "Total Order",
      info: "500",
    },
    {
      name: "Released for Picked",
      info: "300",
    },
    {
      name: "Picked",
      info: "100",
    },
    {
      name: "Packed",
      info: "60",
    },
    {
      name: "Shipped",
      info: "40",
    },
  ];
  //Truyền dữ liệu cho Warehouse Status Today
  const warehousestatus_dataSource = [
    {
      name: "Warehouse Usage",
      info: "3524",
    },
    {
      name: "Total Pallet Spaces",
      info: "3200",
    },
    {
      name: "Empty Pallet Spaces",
      info: "724",
    },
    {
      name: "Capacity%",
      info: "79",
    },
    {
      name: "Replen Tasks",
      info: "12",
    },
  ];
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
      ctx.fillText(text, xCenter, yCenter - width / 15);
      ctx.restore();
    },
  };
  function getGradient(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;
    const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);
    gradientSegment.addColorStop(0, "red");
    gradientSegment.addColorStop(0.3, "orange");
    gradientSegment.addColorStop(0.7, "yellow");
    gradientSegment.addColorStop(1, "lime");
    return gradientSegment;
  }
  function getGradient2(chart) {
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
  return (
    <div className="wrapper">
      <div className="inner">
        <div className="TransactionsToday">
          <div className="Transactions">
            <span className="Title">Transactions Today</span>
            <div className="DoughnutWrapper">
              <Doughnut
                data={data1}
                options={options1}
                plugins={[gaugeText]}
              ></Doughnut>
            </div>
          </div>
          <div className="Inbound">
            <span className="Title">Inbound</span>
            <div className="DoughnutWrapper">
              <Doughnut
                data={data2}
                options={options2}
                plugins={[gaugeText]}
              ></Doughnut>
            </div>
          </div>
          <div className="Outbound">
            <span className="Title">Outbound</span>
            <div className="DoughnutWrapper">
              <Doughnut
                data={data3}
                options={options3}
                plugins={[gaugeText]}
              ></Doughnut>
            </div>
          </div>
        </div>
        <div className="OrderStatus">
          <div className="top">
            <span className="Title" style={{ height: "12%" }}>
              Order Status Today
            </span>
            <Table
              style={{
                height: "85%",
                width: "90%",
                border: "solid 1px black",
                overflowY: "scroll",
              }}
              columns={table_columns}
              dataSource={orderstatus_dataSource}
              pagination={false}
              showHeader={false}
              size={"small"}
            />
          </div>
          <div className="bottom padtop">
            <span className="Title">Order Status Graph</span>
            <Bar
              style={{ marginTop: "5vh" }}
              data={data6}
              options={options6}
            ></Bar>
          </div>
        </div>
        <div className="WarehouseStatus">
          <div className="top">
            <span className="Title" style={{ height: "12%" }}>
              Warehouse status
            </span>
            <Table
              style={{
                height: "85%",
                width: "90%",
                border: "solid 1px black",
                overflowY: "scroll",
              }}
              columns={table_columns}
              dataSource={warehousestatus_dataSource}
              pagination={false}
              showHeader={false}
              size={"small"}
            />
          </div>
          <div className="bottom divide">
            <div className="ActivePartners">
              <span className="Title">Active Partners</span>
              <div className="DoughnutWrapper">
                <Doughnut
                  data={data3}
                  options={options3}
                  plugins={[gaugeText]}
                ></Doughnut>
              </div>
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
    </div>
  );
}

export default Dashboard;
