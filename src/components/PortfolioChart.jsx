import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../Context/crypto-context.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PortfolioChart() {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((item) => item.name),
    datasets: [
      {
        label: "$",
        data: assets.map((item) => item.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        height: 400,
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <Pie data={data} />
    </div>
  );
}

export default PortfolioChart;
