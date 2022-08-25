import { useEffect, useState } from "react";
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
import AddScholarship from "../../components/Scholarship/AddScholarship";
import Notifications from "../../components/Notifications/Notifications";
import { useStyles } from "./Profile.styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import {
  getDetails,
  getScholarship,
  scholarshipSubmit,
  submitCollegeDetails,
} from "../../api/profile.api";

const Profile = () => {
  const [user, wait] = useAuthState(auth);
  const { classes } = useStyles();

  const [cname, setCname] = useState("");
  const [newName, setNewName] = useState("");
  const [domain, setDomain] = useState("");
  const [docid, setDocId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const [scholarships, setScholarships] = useState(null);
  const [newScholarship, setNewScholarship] = useState(null);
  const [collegeScholarships, setCollegeScholarships] = useState(null);

  useEffect(() => {
    if (user) {
      getDetails(
        user,
        setDocId,
        setCname,
        setDomain,
        setCollegeScholarships,
        setLoading,
        setError
      );
    }
    if (user && collegeScholarships){
      getScholarship(collegeScholarships, setScholarships, setError);
    }
    // console.log(collegeScholarships, scholarships);
  }, [user, collegeScholarships, wait]);

  async function handleSubmit(e) {
    e.preventDefault();
    submitCollegeDetails(docid, cname, begin, end, setError);
  }

  async function handleSubmitScholarship(e) {
    e.preventDefault();
    scholarshipSubmit(docid, newScholarship, Notifications);
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

      {user.email === "gov@govindia.in" ? (
        <AddScholarship />
      ) : (
        <>
          <div className={classes.main}>
            <Text className={classes.text}>Edit Profile</Text>
            <div className={classes.form}>
              <form>
                <div className={classes.content}>
                  <TextInput
                    icon={<IconBuilding size={14}></IconBuilding>}
                    label="Institute name"
                    value={newName}
                    placeholder="Update name of the college"
                    className={classes.textInput}
                    onChange={(e) => setNewName(e.currentTarget.value)}
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

          <div className={classes.main}>
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
                      item.value
                        .toLowerCase()
                        .includes(value.toLowerCase().trim())
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
        </>
      )}
    </div>
  );
};

export default Profile;
