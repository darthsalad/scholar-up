import React, { useState, useEffect } from 'react'
import { auth, db } from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { IconPhoneCall, IconAt } from '@tabler/icons';

const useStyle = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

const Students = () => {
  const [students, setStudents] = useState([]);
  const { classes } = useStyle();
  const [user, loading] = useAuthState(auth);
  
  useEffect(() => {
    async function getStudents() {
        const q = query(collection(db, "students"), where("verified", "==", true));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        setStudents(
            querySnapshot.docs.map((doc) => ({
                id: doc.id,
                student: doc.data(),
            }))
        )
    };
    user && getStudents();
  }, [user]);

  return (
    <div>
        Students
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
                <UnstyledButton className={classes.user} onClick={()=>{
                  window.location=`/student/${student.id}`
                }}>

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

                    {<IconChevronRight size={14} stroke={1.5} />}
                </Group>
                </UnstyledButton>
                </div>
              )  
            })}
        </div>
    </div>
    )
  }

export default Students