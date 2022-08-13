import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { auth, db } from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, getDocs } from "firebase/firestore"
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';

const useStyle = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const Students = () => {
  const [students, setStudents] = useState([]);
  let { verified } = useParams();
  const { classes } = useStyle();
//   const [user, loading] = useAuthState(auth);
  console.log(verified);
  
  useEffect(() => {
    async function getStudents(status) {
        const querySnapshot = await getDocs(collection(db, "students"));
        // console.log(querySnapshot)
        setStudents(
            querySnapshot.docs.map((doc) => ({
                id: doc.id,
                student: doc.data(),
            }))
        )
    };
    getStudents();
  }, []);

  return (
    <div>
        {verified} Students
        <div>
            {students.map((student) => {
              return(
                
                // <div style={{padding: '20px'}}>
                //     <img src={student.student.imgURL} />
                //     {student.student.sname}
                //     <li>{student.student.email}</li>
                //     <li>{student.student.mobile}</li>
                //     <li>{student.student.cdomain}</li>
                // </div>

                <div style={{padding: '20px'}}>
                <Group noWrap>
                    <Avatar src={student.student.imgURL} size={94} radius="md" />
                    <div>
                    <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                        College Domain: {student.student.cdomain}
                    </Text>

                    <Text size="lg" weight={500} className={classes.name}>
                        {student.student.sname}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <IconAt stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                        {student.student.email}
                        </Text>
                    </Group>

                    <Group noWrap spacing={10} mt={5}>
                        <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                        {student.student.mobile}
                        </Text>
                    </Group>
                    </div>
                </Group>
                </div>
              )  
            })}
        </div>
    </div>
  )
}

export default Students