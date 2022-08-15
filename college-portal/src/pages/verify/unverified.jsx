import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
import Load from "../../components/Load/Load";
import { auth, db } from "../../firebase.config";
import { IconPhoneCall, IconAt, IconChevronRight } from "@tabler/icons";
import { UnstyledButton, Group, Avatar, Text, Alert } from "@mantine/core";
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
  const [docId, setDocId] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const list = [];

  // auth state takes some time
  useEffect(() => {
    console.log({ user, wait });
    user && getlist();
  }, [user]);

  // get details of all unverified students in the specific in the institute
  async function getlist() {
    try {
      const q = query(
        collection(db, "students"),
        where("cdomain", "==", user.email.split("@")[1]),
        where("verified", "==", false)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, data: doc.data() });
      });
      setLoading(false);
      setStudents(list);
      console.log(list);
      // throw new Error("Eww");
    } catch (err) {
      setError(err);
    }
  }

  // verify desired student on click, setDocId when clicked
  async function verifyOnClick() {
    await updateDoc(doc(db, "students", docId), {
      verified: true,
    }).then(() => {
      console.log("Verified");
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
          {students.length === 0 && (
            <Alert
              title="Great!"
              color="green"
              style={{ width: "80%", margin: "auto" }}
            >
              All students are verified
            </Alert>
          )}
          {students.length !== 0 &&
            students.map((student) => {
              return (
                <div style={{ padding: "20px" }}>
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

                      {<IconChevronRight size={14} stroke={1.5} />}
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
