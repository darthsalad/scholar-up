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
import {Table} from '@mantine/core';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Load from "../../components/Load/Load";

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
  "November",
  "December"
];

export default function StudentGraph ({ data, color, attendance }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState(5);

  useEffect(() => {
    const getClasses = async() => {
      try{
        const q = query(
          collection(db, "QRTokens"),
          where("cdomain", "==", data.student.cdomain)
        );
        onSnapshot(q, (snap) => {
          setClasses(snap.docs[0].data().totalClasses);
        })
        setLoading(false);
      } catch(err) {
        console.log(err);
      }
    }

    user && getClasses();
  }, [user])

  const barData = {
    labels,
    datasets: [
      {
        label: "Presents",
        data: labels.map((label) => attendance[label.toLowerCase()].length),
        backgroundColor: color || "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const student = [
    { name: data.student.sname, totalClasses: classes, classesAttended: data.student.totalAtt, percentage: (data.student.totalAtt / classes) * 100 },
  ];

  const rows = student.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.totalClasses}</td>
      <td>{element.classesAttended}</td>
      <td>{(element.percentage).toFixed(3)} %</td>
    </tr>
  ));

  if (loading) return(<Load />)

  return (
    <>
      <Bar id="check" options={options} data={barData} />
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Classes</th>
            <th>Classes Attended</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
