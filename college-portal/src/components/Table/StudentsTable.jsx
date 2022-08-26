import {Text, Table, Button} from '@mantine/core';
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getColleges, getStudents, getTotalClasses } from '../../api/profile.api';
import Load from '../Load/Load';
import { useStyle } from "../../pages/verify/unverified.styles";
import Navbar from '../Navbar/Navbar';
import { CSVLink } from 'react-csv';

const StudentsTable = () => {
  const { classes } = useStyle();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [colleges, setColleges] = useState(null);
  const [totalClasses, setTotalClasses] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    user && getStudents(setStudents)
    && getColleges(setColleges)
    && getTotalClasses(setTotalClasses);
    setLoading(false);
  }, [user])

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "College", key: "college" },
    { label: "Total Classes", key: "totalClass" },
    { label: "Attended Classes", key: "attendance" },
    { label: "Attendance %", key: "percentage" },
  ];
  
  const generateList = () => {
    setList(students.map((student) => (
      {
        name: student.student.sname,
        email: student.student.email,
        college: (colleges.find(college => college.domain === student.student.cdomain)).cname,
        totalClass: (totalClasses.find(tot => tot.cdomain === student.student.cdomain)).totalClasses,
        attendance: student.student.totalAtt,
        percentage: ((student.student.totalAtt / (totalClasses.find(tot => tot.cdomain === student.student.cdomain)).totalClasses) * 100).toFixed(3)
      }
      )));
      console.log(list);
  }

  if (loading || !students || !colleges || !totalClasses) return <Load />  

  return (
    <>
    <Navbar />
      <Text className={classes.text}>Students Table</Text>
      <div>
        <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px"
          }}  
        >
          <Button onClick={() => {generateList()}}>
            Generate CSV
          </Button>
          {list &&
              <CSVLink style={{paddingLeft: "50px"}} data={list} headers={headers}><Button>Download</Button></CSVLink>
          }
        </div>
        </div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>College</th>
            <th>Total Classes</th>
            <th>Classes Attended</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
            {students.map((student) => (
                <tr key={student.id}>
                <td>{student.student.sname}</td>
                <td>{student.student.email}</td>
                <td>
                    {(colleges.find(college => college.domain === student.student.cdomain)).cname}
                </td>
                <td>
                    {(totalClasses.find(tot => tot.cdomain === student.student.cdomain)).totalClasses}
                </td>
                <td>{student.student.totalAtt}</td>
                <td>
                    {((student.student.totalAtt / (totalClasses.find(tot => tot.cdomain === student.student.cdomain)).totalClasses) * 100).toFixed(3)} %
                </td>
                </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </>
  )
}

export default StudentsTable