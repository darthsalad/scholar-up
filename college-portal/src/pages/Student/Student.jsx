import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStyles } from "./Student.styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  Accordion,
  Button,
  Image,
  ScrollArea,
  Text,
  useMantineTheme,
  Tabs,
} from "@mantine/core";
import {
  query,
  where,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Load from "../../components/Load/Load";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { IconFileOff, IconFileCheck, IconEye, IconUser } from "@tabler/icons";
import StudentGraph from "./StudentGraph";
import { getScholarships, getStudents } from "../../api/profile.api";

const Student = () => {
  const { classes } = useStyles();
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [college, setCollege] = useState(null);
  const [scholarships, setScholarships] = useState(null);
  const [tab, setTab] = useState("profile");
  const theme = useMantineTheme();

  useEffect(() => {
    if (user && data && college && scholarships) {
      return;
    }

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

    user && !data && getStudents(id, setData);
    user && !college && data && getCollege();
    user && getScholarships(user, setScholarships);
  }, [user, id, data, college, scholarships]);

  if (loading || !data || !college) return <Load></Load>;

  return (
    <div className={`${classes.studentContainer} studentContainer py-3`}>
      <Navbar></Navbar>

      <Tabs variant="outline" defaultValue="profile">
        <Tabs.List grow position="center">
          <Tabs.Tab
            value="profile"
            icon={<IconUser></IconUser>}
            onClick={() => setTab("profile")}
          >
            User Profile
          </Tabs.Tab>
          <Tabs.Tab
            value="leave"
            icon={<IconEye></IconEye>}
            onClick={() => setTab("leave")}
          >
            Leave Applications
          </Tabs.Tab>
          <Tabs.Tab
            value="stats"
            icon={<IconFileCheck></IconFileCheck>}
            onClick={() => setTab("stats")}
          >
            Stats
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <div className={`container`}>
        {tab === "profile" && (
          <StudentProfileData
            data={data}
            college={college}
            scholarships={scholarships}
          />
        )}

        <StudentsReceipts data={data} user={user} />

        {tab === "leave" && (
          <StudentLeaveApplications data={data}></StudentLeaveApplications>
        )}

        {tab === "stats" && (
          <StudentStats data={data} theme={theme}></StudentStats>
        )}
      </div>
    </div>
  );
};

function StudentProfileData({ data, college, scholarships }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const dob = (dataDOB) => {
    if (!dataDOB) return "Not provided";
    const dateParts = dataDOB.split("/");
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return date.toDateString();
  };

  return (
    <div className="row my-4 g-2 gx-3">
      <Text className={classes.text}>User Profile</Text>
      <div className="col-12 col-lg-4">
        <div
          className={`${classes.left} left ${classes.borders} ${classes.studentInfo}`}
        >
          <div className="top">
            <img
              alt="profile-pic"
              src={
                data.student.imgURL.length == 0
                  ? "./student2.png"
                  : data.student.imgURL
              }
              className={classes.image}
            />
          </div>
          <div className="bottom">
            <p className={`${classes.textLeft} name`}>{data.student.sname}</p>
            <p className={`${classes.textLeft} other`}>
              DOB : {dob(data.student.DOB)}
            </p>
            <p className={`${classes.textLeft} other`}>{data.student.mobile}</p>
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
            <div className="col-4 col-md-3 leftt">Hadera Account ID</div>
            <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
              {data.student.accid}
            </div>
          </div>
          <hr />

          <div className="row mb-2 px-2">
            <div className="col-4 col-md-3 leftt">View History</div>
            <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
              <a
                style={{ color: theme.primaryColor, textDecoration: "none" }}
                target={"_blank"}
                rel="noopener noreferrer"
                href={`https://hashscan.io/#/testnet/account/${data.student.accid}`}
              >
                View Transactions
              </a>
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
                    if (data.student.scholarships.includes(scholarship.name))
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
        </div>
      </div>
    </div>
  );
}

function StudentLeaveApplications({ data }) {
  const { classes } = useStyles();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  let { id } = useParams();

  async function handleAccept(e, i, value) {
    e.preventDefault();
    let list = data.student.applications;
    list[i].verify = value;
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, {
      applications: list,
    });
  }

  return (
    <>
      {data.student.verified === true ? (
        <div className={classes.studentContainer}>
          <Text className={classes.text} style={{ marginTop: "50px" }}>
            Leave applications
          </Text>
          <ScrollArea className={classes.leaveApplications}>
            <Accordion>
              {data.student.applications.length !== 0 &&
                data.student.applications.map((file, i) => (
                  <Accordion.Item value={`leave application ${i + 1}`}>
                    <Accordion.Control>
                      {file.fileName}{" "}
                      <p style={{ fontSize: "0.8rem" }}>({file.fileDate})</p>
                      {file.verify ? (
                        <IconFileCheck color="green" />
                      ) : (
                        <IconFileOff />
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
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={(e) => {
                          handleAccept(e, i, true);
                        }}
                      >
                        Accept
                      </Button>
                      <br></br>
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={(e) => {
                          handleAccept(e, i, false);
                        }}
                      >
                        Reject
                      </Button>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
            </Accordion>
          </ScrollArea>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function StudentStats({ data, theme }) {
  const { classes } = useStyles();

  return (
    <>
      <Text className={classes.text}>Stats</Text>
      <div className={classes.statsContainer}>
        <StudentGraph
          color={theme.primaryColor}
          attendance={data.student.attendence}
        ></StudentGraph>
      </div>
    </>
  );
}

function StudentsReceipts({ data, user }) {
  const { classes } = useStyles();
  return (
    <>
      {user.email === "gov@govindia.in" &&
      data.student.scholarships.length !== 0 &&
      data.student.verified == true ? (
        <div className={classes.studentContainer}>
          <Text className={classes.text} style={{ marginTop: "50px" }}>
            Receipts
          </Text>
          <ScrollArea
            style={{ height: "auto", maxHeight: 900 }}
            className={classes.leaveApplications}
          >
            <Accordion>
              {data.student.receipts.map((file, i) => (
                <Accordion.Item value={`leave application ${i + 1}`}>
                  <Accordion.Control>
                    Receipt {i + 1} <IconEye />
                  </Accordion.Control>
                  <Accordion.Panel
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div style={{ width: "100%", maxWidth: "500px" }}>
                      <Image
                        radius="md"
                        alt={file.fileName}
                        src={file.filePDF}
                      />
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Student;
