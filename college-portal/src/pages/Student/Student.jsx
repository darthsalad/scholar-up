import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStyles } from "./Student.styles";
import Navbar from "../../components/Navbar/Navbar";
import { Accordion, Text, useMantineTheme, Tabs, Alert } from "@mantine/core";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import Load from "../../components/Load/Load";
import { AwardScholarship } from "../../components/Scholarship/AwardScholarship";
import {
  StudentStats,
  StudentsReceipts,
  StudentLeaveApplications,
} from "./StudentUtils";

import {
  IconFileCheck,
  IconEye,
  IconUser,
  IconReportMoney,
  IconTrophy,
} from "@tabler/icons";
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
      onSnapshot(q, (querySnap) => {
        querySnap.docs.forEach((doc) => {
          setCollege(doc.data().cname);
        });
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
          {user.email === "gov@govindia.in" && (
            <Tabs.Tab
              value="receipts"
              icon={<IconReportMoney></IconReportMoney>}
              onClick={() => setTab("receipts")}
            >
              Receipts
            </Tabs.Tab>
          )}
          {user.email === "gov@govindia.in" && (
            <Tabs.Tab
              value="award"
              icon={<IconTrophy></IconTrophy>}
              onClick={() => setTab("award")}
            >
              Award Scholarships
            </Tabs.Tab>
          )}
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

        {tab === "leave" && (
          <>
            <StudentLeaveApplications
              data={data}
              theme={theme}
            ></StudentLeaveApplications>
          </>
        )}

        {tab === "receipts" && (
          <>
            <StudentsReceipts data={data} user={user}></StudentsReceipts>
          </>
        )}

        {tab === "stats" && (
          <StudentStats data={data} theme={theme}></StudentStats>
        )}

        {tab === "award" && <AwardScholarship data={data}></AwardScholarship>}
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

export default Student;
