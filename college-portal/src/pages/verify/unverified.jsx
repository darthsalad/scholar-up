import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
import Load from "../../components/Load/Load";
import { auth, db } from "../../firebase.config";
import { IconPhoneCall, IconCheckbox, IconAt, IconChevronRight } from "@tabler/icons";
import { UnstyledButton, Group, Avatar, Text, Alert, ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStyle } from "./unverified.styles";

const Unverified = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();

  const [user, wait] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([]);
  const [error, setError] = useState(null);
  const list = []

  // auth state takes some time
  useEffect(() => {
    async function getList() {
      try {
        const q = query(
          collection(db, "students"),
          where("cdomain", "==", user.email.split("@")[1]),
          where("verified", "==", false)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            data: doc.data()
          })
        });
        setStudent(list)
        setLoading(false);
        console.log(student);
        // throw new Error("Eww");
      } catch (err) {
        setError(err);
      }
    }

    console.log({ user, wait });
    user && getList();
  }, [user]);

  // get details of all unverified students in the specific in the institute

  // verify desired student on click, setDocId when clicked
  async function verifyOnClick(docId) {
    await updateDoc(doc(db, "students", docId), {
      verified: true,
    }).then(() => {
      console.log("Verified", docId);
    });
  }

  if (loading) return <Load></Load>;
  if (!loading && error) return <Error></Error>;

  return (
    <>
      <Navbar></Navbar>
      <Text className={classes.text}>Un-verified students</Text>
      <div>
        <div>
          {student.length === 0 && (
            <Alert
              title="Great!"
              color="green"
              style={{ width: "80%", margin: "auto" }}
            >
              All students are verified
            </Alert>
          )}
          {student.length !== 0 &&
            student.map((student) => {
              return (
                <div key={student.id} style={{ padding: "20px" }}>
                  <UnstyledButton
                    className={classes.user}
                    onClick={() => navigate(`/student/${student.id}`)}
                  >
                    <Group noWrap>
                      <Avatar
                        src={student.data.imgURL}
                        size={94}
                        radius="md"
                      />
                      <div>
                        <Text
                          size="xs"
                          sx={{ textTransform: "uppercase" }}
                          weight={700}
                          color="dimmed"
                        >
                          College Domain: {student.data.cdomain}
                        </Text>

                        <Text size="lg" weight={500} className={classes.name}>
                          {student.data.sname}
                        </Text>

                        <Group noWrap spacing={10} mt={3}>
                          <IconAt
                            stroke={1.5}
                            size={16}
                            className={classes.icon}
                          />
                          <Text size="xs" color="dimmed">
                            {student.data.email}
                          </Text>
                        </Group>

                        <Group noWrap spacing={10} mt={5}>
                          <IconPhoneCall
                            stroke={1.5}
                            size={16}
                            className={classes.icon}
                          />
                          <Text size="xs" color="dimmed">
                            {student.data.mobile}
                          </Text>
                        </Group>
                      </div>
                      <Group
                        spacing="xl" 
                        position="right"
                      >
                      <ActionIcon 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          // setDocId(student.id);
                          verifyOnClick(student.id);
                        }}>
                        <IconCheckbox size={16} stroke={1.5} />
                      </ActionIcon>
                      </Group>
                      <IconChevronRight sx={{paddingRight: 0}} size={14} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Unverified;
