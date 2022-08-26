import {Text, Table} from '@mantine/core';
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getColleges, getStudents, getTotalClasses } from '../../api/profile.api';
import Load from '../Load/Load';
import { useStyle } from "../../pages/verify/unverified.styles";
import Navbar from '../Navbar/Navbar';

const StudentsTable = () => {
  const { classes } = useStyle();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [colleges, setColleges] = useState(null);
  const [totalClasses, setTotalClasses] = useState(null);

  useEffect(() => {
    user && getStudents(setStudents)
    && getColleges(setColleges)
    && getTotalClasses(setTotalClasses);
    setLoading(false);
    // console.log(totalClasses);
  }, [user])

  if (loading || !students || !colleges || !totalClasses) return <Load />  

  return (
    <>
    <Navbar />
      <Text className={classes.text}>Students Table</Text>
      <div>
        <div>

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