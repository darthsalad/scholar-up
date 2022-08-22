import {
  TextInput,
  Button,
  Group,
  Text,
  Select,
  UnstyledButton,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconAt, IconBuilding } from "@tabler/icons";
import React, { forwardRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
import Load from "../../components/Load/Load";
import Notifications from "../../components/Notifications/Notifications";
import { useStyles } from "./Profile.styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.config";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

const Profile = () => {
  const [user, wait] = useAuthState(auth);
  const [cname, setCname] = useState("");
  const [domain, setDomain] = useState("");
  const [docid, setDocId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const { classes } = useStyles();
  const [scholarships, setScholarships] = useState(null);
  const [newScholarship, setNewScholarship] = useState(null);
  const [collegeScholarships, setCollegeScholarships] = useState(null);

  useEffect(() => {
    // console.log({ user, wait });
    user && getDetails();
    user && collegeScholarships && getScholarships();
  }, [user, collegeScholarships, wait]);

  async function getDetails() {
    try {
      const l = [];
      const q = query(
        collection(db, "colleges"),
        where("domain", "==", user.email.split("@")[1])
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDocId(doc.id);
          setCname(doc.data().cname);
          setDomain(doc.data().domain);
          doc.data().scholarships.forEach((item) => {
            l.push(item.name);
          });
          // console.log(l)
          setCollegeScholarships(l);
        });
        setLoading(false);
      });
    } catch (err) {
      setError(err);
    }
  }

  async function getScholarships() {
    try {
      const q = query(
        collection(db, "scholarships"),
        where("scholarshipName", "not-in", collegeScholarships)
      );
      onSnapshot(q, (querySnapshot) => {
        setScholarships(
          querySnapshot.docs.map((scholarship) => ({
            value: scholarship.data().scholarshipName,
            label: scholarship.data().scholarshipName,
            provider: scholarship.data().scholarshipProvider,
            description: scholarship.data().scholarshipDescription,
          }))
        );
        // console.log(scholarships)
      });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "colleges", docid), {
        cname: cname,
        class_begin: begin,
        class_end: end,
      });

      // throw new Error("Eww");
    } catch (err) {
      setError(err);
    }
  }

  async function handleSubmitScholarship(e) {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "colleges", docid), {
        scholarships: arrayUnion({
          name: newScholarship.name,
          description: newScholarship.description,
          provider: newScholarship.provider,
        }),
      });
      console.log(newScholarship.name + " added to database.");
    } catch (err) {
      Notifications(
        `${newScholarship.name} was not added to database. Please try again`
      );
    }
  }

  const SelectItem = forwardRef(({ value, cname, ...others }, ref) => (
    <UnstyledButton>
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{value}</Text>
          </div>
        </Group>
      </div>
    </UnstyledButton>
  ));

  if (loading || !collegeScholarships || !scholarships) return <Load></Load>;
  if (!loading && error) return <Error></Error>;

  return (
    <div>
      <Navbar></Navbar>

      <div className={classes.root}>
        <Text className={classes.text}>Edit Profile</Text>
        <div className={classes.form}>
          <form>
            <div className={classes.content}>
              <TextInput
                icon={<IconBuilding size={14}></IconBuilding>}
                label="Institute name"
                value={cname}
                placeholder="Update name of the college"
                className={classes.textInput}
                onChange={(e) => setCname(e.currentTarget.value)}
                required
              ></TextInput>
              <TextInput
                icon={<IconAt size={14}></IconAt>}
                label="Institute domain"
                placeholder="Update your institute's domain"
                value={domain}
                className={classes.textInput}
                disabled={true}
              ></TextInput>
              <div className={classes.timeInputs}>
                <TimeInput
                  label="Begin classes (24 hr format)"
                  clearable
                  required
                  className={classes.timeInput}
                  onChange={(e) => {
                    e && setBegin(e.toLocaleTimeString());
                  }}
                ></TimeInput>
                <TimeInput
                  label="End classes (24 hr format)"
                  clearable
                  required
                  className={classes.timeInput}
                  onChange={(e) => {
                    e && setEnd(e.toLocaleTimeString());
                  }}
                ></TimeInput>
              </div>

              <Button
                disabled={!cname || !begin || !end}
                type="submit"
                onClick={(e) => handleSubmit(e)}
                fullWidth
              >
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className={classes.root}>
        <Text className={classes.text} style={{ marginTop: "50px" }}>
          Manage Scholarships
        </Text>
        <div
          className={classes.form}
          style={{ height: "auto", marginBottom: "50px" }}
        >
          <form>
            <div className={classes.content}>
              <Select
                label="Choose scholarship to add"
                placeholder="Pick one"
                itemComponent={SelectItem}
                className={classes.textInput}
                data={scholarships}
                searchable
                required
                maxDropdownHeight={400}
                nothingFound="No Results"
                filter={(value, item) =>
                  item.value.toLowerCase().includes(value.toLowerCase().trim())
                }
                onChange={(e) => {
                  scholarships.forEach((scholarship) => {
                    if (scholarship.value === e) {
                      setNewScholarship({
                        name: scholarship.value,
                        description: scholarship.description,
                        provider: scholarship.provider,
                      });
                    }
                  });
                }}
              />

              <Button
                type="submit"
                disabled={!newScholarship}
                onClick={(e) => handleSubmitScholarship(e)}
                fullWidth
              >
                Add Scholarship
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
