import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";

export default Chart;
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "SBB-PK",
    "THULB Jena",
    "Georg Eckhart Institute",
    "UB Frankfurt",
    "FID SKA",
    "UB Bremen",
    "ifa Bibliothek",
  ],
  datasets: [
    {
      label: " Records",
      data: [27691, 5329, 4747, 3046, 744, 558, 160],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(21, 123, 61, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Collections of the Historical Catalogue",
      position: "right",
    },
  },
};

function Chart() {
  return (
    <Box sx={{ width: "35rem", height: "35rem" }}>
      <Doughnut data={data} options={options} />
    </Box>
  );
}
