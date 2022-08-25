import React, {useState, useEffect} from "react";
import { useStyles } from "../../pages/Profile/Profile.styles";
import { Accordion, Text, TextInput, Button } from "@mantine/core";
import Notifications from "../../components/Notifications/Notifications";
import {
    collection,
    query,
    onSnapshot,
    addDoc,
  } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Error from "../../components/Error/Error";
import Load from "../../components/Load/Load";
import { DatePicker } from '@mantine/dates';

const AddScholarship = () => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState(null);
  const [scname, setScname] = useState("");
  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState(null);
  const { classes } = useStyles();

  useEffect(() => {
    async function getScholarships() {
        try {
          const q = query(
            collection(db, "scholarships")
          );
          onSnapshot(q, (querySnapshot) => {
            setScholarships(
              querySnapshot.docs.map((doc) => ({
                value: doc.data().scholarshipName,
                label: doc.data().scholarshipName,
                provider: doc.data().scholarshipProvider,
                description: doc.data().scholarshipDescription,
                amount: doc.data().scholarshipAmount,
                endDate: doc.data().scholarshipEndDate
              }))
            );
            // console.log(scholarships)
          });
          setLoading(false);
        } catch (err) {
          setError(err);
          console.log(err);
        }
      }

      user && getScholarships();
      // console.log({user, wait})
  }, [user])

  async function handleAddScholarship(e) {
    e.preventDefault();
    try {
      if(scholarships.map((doc) => doc.value).includes(scname)) {
        alert(`${scname} already present in database.`)
      }
      else{
            await addDoc(collection(db, "scholarships"), {
                scholarshipName: scname,
                scholarshipDescription: description,
                scholarshipProvider: provider,
                scholarshipEndDate: endDate.toLocaleDateString(),
                scholarshipAmount: amount
            });
        }
        console.log(scname + " added to database.");
        setScname("");
        setDescription("");
        setProvider("");
        setEndDate(null);
    } catch (err) {
      console.log(err, scname, description, provider);
      Notifications(
        `${scname} was not added to database. Please try again`
      );
    }
  }

  if (loading || !scholarships) return <Load></Load>;
  if (!loading && error) return <Error></Error>;

  return (
    <div className={classes.main}>
      <Text className={classes.text}>
        Manage Scholarships
      </Text>
      <div
        className={classes.form}
        style={{ height: "auto", marginBottom: "50px" }}
      >
        <form>
          <div className={classes.content}>
            <TextInput
                // icon={<IconBuilding size={14}></IconBuilding>}
                label="Scholarship name"
                value={scname}
                placeholder="Name of the scholarship"
                className={classes.textInput}
                onChange={(e) => setScname(e.currentTarget.value)}
                required
            />
            <TextInput
                // icon={<IconBuilding size={14}></IconBuilding>}
                label="Provider name"
                value={provider}
                placeholder="Provider of the scholarship"
                className={classes.textInput}
                onChange={(e) => setProvider(e.currentTarget.value)}
                required
            />
            <TextInput
                // icon={<IconBuilding size={14}></IconBuilding>}
                label="Scholarship description"
                value={description}
                placeholder="Description of the scholarship"
                className={classes.textInput}
                onChange={(e) => setDescription(e.currentTarget.value)}
                required
            />
            <TextInput
                // icon={<IconBuilding size={14}></IconBuilding>}
                label="Scholarship amount"
                value={amount}
                placeholder="Amount for the scholarship"
                className={classes.textInput}
                onChange={(e) => setAmount(e.currentTarget.value)}
                required
            />
            <DatePicker
              className={classes.textInput}
              label="Date of Birth"
              value={endDate}
              required
              onChange={(e) => {
                setEndDate(e);
              }}
            />

            <Button
              type="submit"
              onClick={(e) => handleAddScholarship(e)}
              fullWidth
            >
              Add Scholarship
            </Button>
          </div>
        </form>
      </div>
      
      <div className={classes.main}>
      <Text className={classes.text} style={{ marginTop: "30px" }}>
        Available Scholarships
      </Text>
        <div
            className={classes.form}
            style={{ height: "auto", marginBottom: "50px" }}
        >
            <Accordion>
                {scholarships.map((scholarship) => {
                    return(
                        <Accordion.Item key={scholarship.value} value={scholarship.value}>
                            <Accordion.Control>
                            {scholarship.value.length < 20
                                ? scholarship.value
                                : scholarship.value.substring(0, 18) + "..."}
                            </Accordion.Control>
                            <Accordion.Panel>
                            <p>
                                Provider- {scholarship.provider}
                                <br />
                                Details: {scholarship.description}
                                <br />
                                Amount: {scholarship.amount}
                                <br />
                                End Date: {scholarship.endDate}
                            </p>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </div>
        </div>
    </div>
  );
};

export default AddScholarship;
