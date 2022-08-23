import React, { useState, useEffect } from "react";
import "./Student.css";
import student2 from "./student2.png";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStyles } from "./Student.styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  Accordion,
  Button,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  query,
  where,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import Load from "../../components/Load/Load";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { IconEye, IconEyeOff } from "@tabler/icons";
import StudentGraph from "./StudentGraph";

const Student = () => {
  const { classes } = useStyles();
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [college, setCollege] = useState(null);
  const [scholarships, setScholarships] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const theme = useMantineTheme();

  useEffect(() => {
    async function getCollege() {
      const q = query(
        collection(db, "colleges"),
        where("domain", "==", data.student.cdomain)
      );
      const querySnap = await getDocs(q);
      querySnap.docs.forEach((doc) => {
        setCollege(doc.data().cname);
      });
    }

    async function getStudents() {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap);
      setData({
        id: docSnap.id,
        student: docSnap.data(),
      });
    }

    async function getScholarships() {
      try {
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
          querySnapshot.docs[0].data().scholarships.map((scholarship) =>
            // console.log(scholarship);
            ({
              name: scholarship.name,
              provider: scholarship.provider,
              description: scholarship.description,
            })
          )
        );
      } catch (err) {
        console.log(err);
      }
    }

    user && !data && getStudents();
    user && !college && data && getCollege();
    user && !scholarships && getScholarships();
    // console.log(data);
    // console.log(college);
  }, [user, id, data, college, scholarships]);

  if (loading || !data || !college || !scholarships) return <Load></Load>;

  const dob = (dataDOB) => {
    if (!dataDOB) return "Not provided";

    const dateParts = dataDOB.split("/");
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return date.toDateString();
  };

  return (
    <div className={`${classes.studentContainer} studentContainer py-3`}>
      <Navbar></Navbar>
      <div className={`container`}>
        <div className="row my-4 g-2 gx-3">
          <div className="col-12 col-lg-4">
            <div className={`${classes.left} left ${classes.borders}`}>
              <div className="top">
                <img
                  alt="profile-pic"
                  src={data.student.imgURL || student2}
                  className={classes.image}
                />
              </div>
              <div className="bottom">
                <p className={`${classes.textLeft} name`}>
                  {data.student.sname}
                </p>
                <p className={`${classes.textLeft} other`}>Gender : Male</p>
                <p className={`${classes.textLeft} other`}>
                  DOB : {dob(data.student.DOB)}
                </p>
                <p className={`${classes.textLeft} other`}>
                  {data.student.mobile}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className={`${classes.left} ${classes.borders} right py-2`}>
              <div className="row my-2 px-2">
                <div className="col-4 col-md-3 leftt">Full Name</div>
                <div className={`${classes.rightt}  col-8 col-md-9 rightt`}>
                  {data.student.sname}
                </div>
              </div>
              <hr />
              <div className="row mb-2 px-2">
                <div className="col-4 col-md-3 leftt">College ID</div>
                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                  {data.student.email.split("@")[0]}
                </div>
              </div>
              <hr />
              <div className="row mb-2 px-2">
                <div className="col-4 col-md-3 leftt">Email</div>
                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                  {data.student.email}
                </div>
              </div>
              <hr />
              <div className="row mb-2 px-2">
                <div className="col-4 col-md-3 leftt">College</div>
                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                  {college}
                </div>
              </div>
              <hr />
              <div className="row mb-2 px-2">
                <div className="col-4 col-md-3 leftt">Scholarships</div>
                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                  {/* <>No Scholarships</> */}
                  <Accordion>
                    {data.student.scholarships.length === 0 ? (
                      <>No Scholarships</>
                    ) : (
                      scholarships.map((scholarship) => {
                        if (
                          data.student.scholarships.includes(scholarship.name)
                        )
                          return (
                            <Accordion.Item value={scholarship.name}>
                              <Accordion.Control>
                                {scholarship.name.length < 20
                                  ? scholarship.name
                                  : scholarship.name.substring(0, 18) + "..."}
                              </Accordion.Control>
                              <Accordion.Panel>
                                <p>
                                  Provider- {scholarship.provider}
                                  <br />
                                  Details: {scholarship.description}
                                </p>
                              </Accordion.Panel>
                            </Accordion.Item>
                          );
                        return <></>;
                      })
                    )}
                  </Accordion>
                </div>
              </div>
              <hr />
              <div className="row mb-2 px-2">
                <div className="col-4 col-md-3 leftt">Address</div>
                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                  House no-455 , Gothapatna , Bhubneshwar , Odisha
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.studentContainer}>
          <Text className={classes.text}>Leave applications</Text>
          <ScrollArea
            style={{ height: 800 }}
            className={classes.leaveApplications}
          >
            <Accordion>
              { data.student.applications.length !== 0 && data.student.applications.map((file,i) => (
                <Accordion.Item value={`leave application ${i + 1}`}>
                  <Accordion.Control>
                    Leave Application {i + 1}{" "}
                    {i % 2 == 0 ? (   // add field accept in application array
                      <IconEye></IconEye>
                    ) : (
                      <IconEyeOff></IconEyeOff>
                    )}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                      <div style={{ height: "750px" }}>
                        <Viewer
                          fileUrl={file.filePDF}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </div>
                    </Worker>
                    <br></br>
                    <Button variant="primary" fullWidth>
                      Accept
                    </Button>
                    <br></br>
                    <Button variant="outline" fullWidth>
                      Reject
                    </Button>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </ScrollArea>
        </div>{" "}
        <Text className={classes.text}>Stats</Text>
        <div className={classes.statsContainer}>
          <StudentGraph
            color={theme.primaryColor}
            attendance={data.student.attendence}
          ></StudentGraph>
        </div>
      </div>
    </div>
  );
};

export default Student;
