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
      text: "Attendancy By Month",
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

const StudentGraph = ({ color, attendance }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Presents",
        data: labels.map((label) => attendance[label.toLowerCase()].length),
        backgroundColor: color || "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar id="check" options={options} data={data} />;
};

export default StudentGraph;
