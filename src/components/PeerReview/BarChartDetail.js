import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const BarChart = ({ title, data }) => {
  return (
    <HorizontalBar
      data={{
        labels: data.map((v) => v.label),
        datasets: [
          {
            label: "자가 인식",
            data: data.map((v) => v.self),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            barThickness: 10,
          },
          {
            label: "부하 인식",
            data: data.map((v) => v.peer),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            barThickness: 10,
          },
        ],
      }}
      width={100}
      height={100}
      options={{
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: title,
        },
        scales: { xAxes: [{ ticks: { beginAtZero: true, max: 4 } }] },
      }}
    />
  );
};

export default BarChart;
