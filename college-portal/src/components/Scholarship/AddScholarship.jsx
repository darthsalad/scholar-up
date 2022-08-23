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


const AddScholarship = () => {
  const [user, wait] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState(null);
  const [scname, setScname] = useState("");
  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
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
      console.log({user, wait})
  }, [user, wait])

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
            });
        }
        console.log(scname + " added to database.");
        setScname("");
        setDescription("");
        setProvider("");
    } catch (err) {
      console.log(err, scname, description, provider);
      Notifications(
        `${scname} was not added to database. Please try again`
      );
    }
  }

//   const SelectItem = forwardRef(({ value, provider, ...others }, ref) => (
//     <UnstyledButton>
//       <div ref={ref} {...others}>
//         <Group noWrap>
//           <div>
//             <Text size="sm">{value}</Text>
//             <Text size="xs" color="dimmed">{provider}</Text>
//           </div>
//         </Group>
//       </div>
//     </UnstyledButton>
//   ));

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

            {/* <Select
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
            /> */}

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
                        <Accordion.Item value={scholarship.value}>
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
