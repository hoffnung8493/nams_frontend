import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const BarChart = ({ onClick, title, myScore, averageScore, maxScore }) => {
  return (
    <HorizontalBar
      onElementsClick={() => onClick()}
      data={{
        labels: ["자가평가", "부하평가"],
        datasets: [
          {
            label: false,
            data: [myScore, averageScore],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
            barThickness: 10,
          },
        ],
      }}
      width={100}
      height={30}
      options={{
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
        },
        scales: { xAxes: [{ ticks: { beginAtZero: true, max: maxScore } }] },
      }}
    />
  );
};

export default BarChart;
