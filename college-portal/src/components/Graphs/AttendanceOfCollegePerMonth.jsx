import { Select } from "@mantine/core";
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Attendancy By Month for college xyz",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
];

const data = {
  labels,
  datasets: [
    {
      label: ">=75% Attendance",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "<75% Attnedance",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const colleges = [
  { label: "IIIT BBSR", value: "IIIT BBSR" },
  { label: "IIT BBSR", value: "IIT BBSR" },
  { label: "NIT BBSR", value: "NIT BBSR" },
  { label: "KIT BBSR", value: "KIT BBSR" },
];

const AttendaceOfCollegePerMonth = () => {
  return (
    <>
      <Select
        label="Pick a college"
        data={colleges}
        searchable
        nothingFound="No colleges found"
        style={{ marginTop: "2rem", width: "80%", marginBottom: "2rem" }}
        clearable
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        required={true}
      ></Select>
      <Bar id="check" options={options} data={data} />
    </>
  );
};

export default AttendaceOfCollegePerMonth;
