import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Room Availbility Probability",
      //figure out how to change the size
    },
  },
};

const labels = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]; //have a label for every hour

export const data = {
  labels,
  datasets: [
    {
      label: "Probability",
      //data: labels.map(() => 1),
      data: [0.5, 0.35, 0.6, 0.8, 0.12, 0.55, 0.26], //data should be extracted from database
      backgroundColor: "rgba(191, 85, 236, 0.5)",
    },
  ],
};

export function BarChartV2() {
  return <Bar options={options} data={data} />;
}
