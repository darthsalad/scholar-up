import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Autocomplete,
  Menu,
  ScrollArea,
  Alert,
} from "@mantine/core";
import { IconChevronDown, IconAlertCircle } from "@tabler/icons";
import Load from "../../components/Load/Load";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
import { useStyle } from "./verified.styles";
import StudentList from "./StudentList";

const sortOptions = [{ label: "Alphabetically" }, { label: "Scholarship" }];

const Verified = () => {
  const [students, setStudents] = useState([]);
  const [auto, setAuto] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const { classes } = useStyle({ opened });
  const [user, loading] = useAuthState(auth);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(false);
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const q = user.email === "gov@govindia.in"
        ? query(
            collection(db, "students"),
            where("verified", "==", true)
          )
        : query(
            collection(db, "students"),
            where("cdomain", "==", user.email.split("@")[1]),
            where("verified", "==", true)
          )
        onSnapshot(q, (querySnapshot) => {
          const list = []
          querySnapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              student: doc.data(),
            });
          });
          setStudents(list);
          const autolist = [];
          querySnapshot.forEach((doc) => {
            autolist.push({
              id: doc.id,
              value: doc.data().sname,
              image: doc.data().imgURL,
              email: doc.data().email,
            });
          });
          setAuto(autolist);
        });
        setLoadingStudents(false);
      } catch (err) {
        setError(err);
      }
    }

    async function getScholarships() {

      try{
        const q = user.email === "gov@govindia.in"
        ? query(collection(db, "scholarships"))
        : query(
            collection(db, "colleges"),
            where("domain", "==", user.email.split("@")[1])
          );
          const querySnapshot = await getDocs(q);

          user.email === "gov@govindia.in" 
          ? setScholarships(
              querySnapshot.docs.map((scholarship) => (
                {
                  name: scholarship.data().scholarshipName,
                  provider: scholarship.data().scholarshipProvider,
                  description: scholarship.data().scholarshipDescription
                }
              ))  
            )
          : setScholarships(
            querySnapshot.docs[0].data().scholarships.map((scholarship) => (
              // console.log(scholarship);
              {
                name: scholarship.name,
                provider: scholarship.provider,
                description: scholarship.description
              }  
            ))
          );
          // console.log(scholarships);
      }catch(err){
        console.log(err)

      }
    }

    user && getStudents();
    user && getScholarships();
    // console.log(scholarships);
  }, [user, scholarships]);

  if (error)
    return (
      <>
        <Error></Error>
      </>
    );
  if (loading || loadingStudents) return <Load></Load>;

  const AutoCompleteItem = ({ value, id, image, email }) => (
    <UnstyledButton
      className={classes.userDropdown}
      onClick={() => {
        window.location = `/student/${id}`;
      }}
    >
      <Group noWrap>
        <Avatar radius="xl" src={image} />
        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );

  const items = sortOptions.map((item) => (
    <Menu.Item
      onClick={() => {
        setSelected(item);
        item.label === "Scholarship" ? setSort(true) : setSort(false);
      }}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  const noStudent = (scholarshipName, students) => {
    const s = students.filter((student) =>
      student.student.scholarships.includes(scholarshipName)
    );
    return s.length === 0;
  };

  return (
    <>
      <Navbar></Navbar>
      <Text className={classes.text}>Verified students</Text>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            // alignItems: "center"
          }}
        >
          <Autocomplete
            sx={{ maxWidth: "600px", minWidth: "300px" }}
            placeholder="Search students"
            itemComponent={AutoCompleteItem}
            data={auto}
          />
          <Menu
            className={classes.sortMenu}
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
          >
            <Menu.Target>
              <UnstyledButton className={classes.control}>
                <Group spacing="xs">
                  <span className={classes.label}>{selected.label}</span>
                </Group>
                <IconChevronDown
                  size={16}
                  className={classes.iconDropdown}
                  stroke={1.5}
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
          </Menu>
        </div>
        <div>
          {sort
            ? scholarships.map((scholarship) => {
                return (
                  <div className={classes.group}>
                    <Text
                      className={classes.text}
                      style={{
                        fontSize: "2rem",
                        textAlign: "left",
                        margin: "auto 30px",
                      }}
                    >
                      {scholarship.name}
                    </Text>

                    <ScrollArea style={{ height: 250 }}>
                      {students.map((item) => {
                        return item.student.scholarships.includes(
                          scholarship.name
                        ) ? (
                          <StudentList
                            id={item.id}
                            image={item.student.imgURL}
                            cdomain={item.student.cdomain}
                            sname={item.student.sname}
                            email={item.student.email}
                            mobile={item.student.mobile}
                            totalAtt={item.student.totalAtt}
                            verifiedOn={item.student.verifiedOn}
                          />
                        ) : (
                          <></>
                        );
                      })}

                      {noStudent(scholarship.name, students) && (
                        <Alert
                          className={classes.alert}
                          icon={<IconAlertCircle size={16} />}
                          title="Oops!!"
                          color="red"
                        >
                          No students in this category
                        </Alert>
                      )}
                    </ScrollArea>

                  </div>
                );
                // if(student.scholarships.includes )
              })
            : students.map((item) => {
                return (
                  <StudentList
                    id={item.id}
                    image={item.student.imgURL}
                    cdomain={item.student.cdomain}
                    sname={item.student.sname}
                    email={item.student.email}
                    mobile={item.student.mobile}
                    totalAtt={item.student.totalAtt}
                    verifiedOn={item.student.verifiedOn}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Verified;
