import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";

export default Chart;
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Africa", "Asia", "North America", "Australia", "Germany", "France"],
  datasets: [
    {
      label: " Records",
      data: [7870, 1692, 1187, 1894, 1234, 218],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
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
