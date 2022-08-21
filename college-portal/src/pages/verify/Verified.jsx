import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Autocomplete,
  Menu
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Load from "../../components/Load/Load";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
import { useStyle } from "./verified.styles";
import StudentList from "./StudentList";

const sortOptions = [{label: "Alphabetically"}, {label: "Scholarship"}]

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
  const [scholarships, setScholarships] = useState([])

  useEffect(() => {
    async function getStudents() {
      try {
        const q = query(
          collection(db, "students"),
          where("cdomain", "==", user.email.split("@")[1]),
          where("verified", "==", true)
        );
        const querySnapshot = await getDocs(q);
        setStudents(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            student: doc.data(),
          }))
        );
        setAuto(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            value: doc.data().sname, 
            image: doc.data().imgURL, 
            email: doc.data().email
          }))
        );
        setLoadingStudents(false);
      } catch (err) {
        setError(err);
      }
    }

    async function getScholarships() {
      try{
        const q = query(
          collection(db, "colleges"),
          where("domain", "==", user.email.split("@")[1])
        );
        const querySnapshot = await getDocs(q);
        setScholarships(
          querySnapshot.docs[0].data().scholarships.map((scholarship) => (
            // console.log(scholarship);
            {
              name: scholarship.name,
              provider: scholarship.provider,
              description: scholarship.description
            }  
          ))
        );
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

  const AutoCompleteItem = ({value, id, image, email}) => (
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
        item.label === "Scholarship" 
        ? setSort(true)
        : setSort(false);
      }}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

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
          sx={{maxWidth: "600px", minWidth: "300px"}}
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
              <IconChevronDown size={16} className={classes.iconDropdown} stroke={1.5} />
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
              {students.map((student) => {
                return(
                  student.student.scholarships.includes(scholarship.name)?
                  <StudentList 
                    id={student.id}
                    image={student.student.imgURL} 
                    cdomain={student.student.cdomain}
                    sname={student.student.sname}
                    email={student.student.email}
                      mobile={student.student.mobile}
                      totalAtt={students.student.totalAtt}
                      verifiedOn = {students.student.verifiedOn}
                  />
                  :<></>
                )
              })}
            </div>
            )
            // if(student.scholarships.includes )
          })
          : students.map((student) => {
            return (
              <StudentList 
                id={student.id}
                image={student.student.imgURL} 
                cdomain={student.student.cdomain}
                sname={student.student.sname}
                email={student.student.email}
                mobile={student.student.mobile}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Verified;
