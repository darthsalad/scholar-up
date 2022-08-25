import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
import Load from "../../components/Load/Load";
import { auth, db } from "../../firebase.config";
import {
  IconPhoneCall,
  IconCheckbox,
  IconAt,
  IconChevronRight,
} from "@tabler/icons";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Alert,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStyle } from "./unverified.styles";

const Unverified = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();

  const [user, wait] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    user && getList();
    //eslint-disable-next-line
  }, [user, wait]);

  async function getList() {
    try {
      const q =
        user.email === "gov@govindia.in"
          ? query(collection(db, "students"), where("verified", "==", false))
          : query(
              collection(db, "students"),
              where("cdomain", "==", user.email.split("@")[1]),
              where("verified", "==", false)
            );
      onSnapshot(q, (querySnapshot) => {
        const list = [];
        // setStudent(
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // );
        setStudent(list);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
    }
  }

  async function verifyOnClick(docId) {
    await updateDoc(doc(db, "students", docId), {
      verified: true,
      verifiedOn: new Date(),
      totalAtt: 0,
    }).then(() => {
      console.log("Verified", docId);
    });
  }

  if (loading || !student) return <Load></Load>;
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
                      <Avatar src={student.data.imgURL} size={94} radius="md" />
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
                      <Group spacing="md" position="right">
                        <ActionIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            // setDocId(student.id);
                            verifyOnClick(student.id);
                          }}
                        >
                          <IconCheckbox size={16} stroke={1.5} />
                        </ActionIcon>
                        <IconChevronRight size={14} stroke={1.5} />
                      </Group>
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
