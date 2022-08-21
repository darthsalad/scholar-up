import React, { useState, useEffect } from "react";
import "./Student.css";
import student2 from "./student2.png";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useStyles } from "./Student.styles";
import Navbar from "../../components/Navbar/Navbar";
import { Accordion } from "@mantine/core";
import {
  query,
  where,
  doc,
  getDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import Load from "../../components/Load/Load";

const Student = () => {
  const { classes } = useStyles();
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [user, loading] = useAuthState(auth);
  const [college, setCollege] = useState(null);

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
      console.log(docSnap.data());
      setData({
        id: docSnap.id,
        student: docSnap.data(),
      });
    }

    user && !data && getStudents();
    user && !college && data && getCollege();

    // console.log(college);
  }, [user, id, data, college]);

  const dob = (dataDOB) => {
    const dateParts = dataDOB.split("/");
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return date.toDateString();
  };

  if (loading || !data || !college) return <Load></Load>;

  return (
    <div className={`${classes.studentContainer} studentContainer py-3`}>
      <Navbar></Navbar>
      <div className={`container`}>
        <div className="row my-4 g-2 gx-3">
          <div className="col-12 col-lg-4">
            <div className={`${classes.left} left ${classes.borders}`}>
              <div className="top">
                {console.log(data.student)}
                <img
                  alt="profile-pic"
                  src={data.student.imgURL[0] || student2}
                  className={classes.image}
                />
              </div>
              <div className="bottom">
                {/* {console.log(data)} */}
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
                  <Accordion>
                    {data &&
                      data.student &&
                      data.student.scholarships.map((scholarship, idx) => {
                        return (
                          <Accordion.Item key={idx} value={scholarship}>
                            <Accordion.Control>
                              {scholarship.length < 50
                                ? scholarship
                                : scholarship.substring(0, 50) + "..."}
                            </Accordion.Control>
                            <Accordion.Panel>
                              <p>{scholarship}</p>
                            </Accordion.Panel>
                          </Accordion.Item>
                        );
                      })}
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
      </div>
    </div>
  );
};

export default Student;
