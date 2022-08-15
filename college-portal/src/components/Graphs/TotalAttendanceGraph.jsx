import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Attendance record till date",
    },
  },
  maintainAspectRatio: false,
};

export const data = {
  labels: ["<75% Attendance", ">=75%Attendance"],
  datasets: [
    {
      label: "# of Votes",
      data: [2400, 1234],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 4,
    },
  ],
};

export default function TotalAttendanceGraph() {
  return (
    <Pie
      data={data}
      options={options}
      style={{ height: "30rem", width: "30rem" }}
    />
  );
}
