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
      text: "Attendancy Per College",
    },
  },
};

const labels = [
  "IIIT Bhubaneswar",
  "IIT Bhubaneswar",
  "KIIT Bhubaneswar",
  "NIT Raurkela",
  "IIT Delhi",
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

const AttendancePerCollege = () => {
  return <Bar id="check" options={options} data={data} />;
};

export default AttendancePerCollege;
