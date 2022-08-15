import { useState } from "react";
import { DateRangePicker } from "@mantine/dates";
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
      text: "Attendance record for the range",
    },
  },
  maintainAspectRatio: false,
};

export const data = {
  labels: ["Number of presents", "Number of absents"],
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

export default function AttnedanceInRange() {
  const [value, setValue] = useState([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  return (
    <>
      <DateRangePicker
        label="Show attendance records"
        placeholder="Pick dates range"
        value={value}
        onChange={setValue}
        required
        style={{ marginTop: "2rem", width: "80%" }}
      />
      <br></br>
      <Pie
        data={data}
        options={options}
        style={{ maxHeight: "30rem", maxWidth: "30rem" }}
      />
    </>
  );
}
