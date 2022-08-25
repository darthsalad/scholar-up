import React, { useState, useEffect, forwardRef } from "react";
import { useStyles } from "../../pages/Student/Student.styles";
import { Text, Button } from "@mantine/core";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Error from "../../components/Error/Error";
import Load from "../../components/Load/Load";
import { Select, UnstyledButton, Group } from "@mantine/core";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const AwardScholarship = ({ id, data }) => {
  const { classes } = useStyles();
  const [user] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState(null);
  const [scholarshipName, setScholarshipName] = useState("");

  useEffect(() => {
    async function getCollegeScholarships() {
      try {
        const q = query(
          collection(db, "colleges"),
          where("domain", "==", data.student.cdomain)
        );
        onSnapshot(q, (snap) => {
          setScholarships(
            snap.docs[0].data().scholarships.map((doc) => ({
              value: doc.name,
              label: doc.name,
            }))
          );
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }

    user && getCollegeScholarships();
  }, [user, scholarships, data]);

  const handleAwardScholarship = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "students", id), {
        scholarships: arrayUnion(scholarshipName),
      });
      console.log(scholarshipName + " added to student array of id: " + id);
    } catch (err) {
      console.log(err);
    }
  };

  const SelectItem = forwardRef(({ value, ...others }, ref) => (
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

  if (loading || !scholarships) return <Load />;
  if (error) return <Error />;

  return (
    <div className={classes.studentContainer}>
      <Text className={classes.text} style={{ marginTop: "50px" }}>
        Award Scholarship
      </Text>
      <div
        className={classes.form}
        style={{ height: "auto", marginBottom: "50px" }}
      >
        <form>
          <div className={classes.content}>
            <Select
              label="Choose scholarship to award"
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
                    setScholarshipName(scholarship.value);
                  }
                });
              }}
            />

            <Button
              type="submit"
              // disabled={!newScholarship}
              onClick={(e) => handleAwardScholarship(e)}
              fullWidth
            >
              Award Scholarship
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
