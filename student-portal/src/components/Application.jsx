import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { db, auth, storage } from "../firebaseConfig";

import { checkImage } from "../Utilities/checker";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Application = () => {
  const [user] = useAuthState(auth);
  const upload = useRef();
  const [id, setID] = useState();
  const [progress, setProgress] = useState(0);
  const [err, setError] = useState("");
  const [applications, setApplications] = useState([]);

  function LinearProgressWithLabel(props) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: "80%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  useEffect(() => {
    db.collection("students")
      .where("email", "==", user.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach(async (snap) => {
          setID(snap.id);
          setApplications(snap.data().applications);
        });
      });
  }, [user]);

  const imageUpload = (e) => {
    const file = e.target.files[0];

    setError(checkImage(file));
    if (!err) {
      uploadPDF(file);
    }
  };

  const uploadPDF = (file) => {
    const uploadTask = storage.ref(`applications/${file.name}`).put(file);

    uploadTask.on(
      "state_changes",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setError(err);
      },
      () => {
        storage
          .ref("applications")
          .child(file.name)
          .getDownloadURL()
          .then(async (url) => {
            const variable = db.collection("students").doc(id);
            const date = new Date();
            const fileObj = {
              fileName: file.name,
              fileDate: date.toLocaleDateString(),
              filePDF: url,
              verify: false,
            };
            await variable
              .update({
                applications: firebase.firestore.FieldValue.arrayUnion(fileObj),
              })
              .then(() => setProgress(0));
          });
      }
    );
  };

  return (
    <>
      {err && (
        <Alert
          severity="error"
          style={{ position: "absolute", top: "0", left: "0" }}
        >
          <AlertTitle>Error</AlertTitle>
          {err} — <strong>check it out!</strong>
        </Alert>
      )}
      <Container>
        <input
          type="file"
          ref={upload}
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={imageUpload}
        />

        <Wrapper onClick={() => upload.current.click()}>
          <UploadFileIcon style={{ color: "#658ec6", fontSize: "3rem" }} />
          <p style={{ color: "#658ec6", fontSize: "1.5rem" }}>
            Browse File to Upload
          </p>

          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        </Wrapper>
        <ApplicationList>
          <h3 style={{ color: "#658ec6" }}> Application</h3>
          <Files>
            {applications &&
              applications.map((file, key) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={file.filePDF}
                  style={{ textDecoration: "none" }}
                  key={key}
                >
                  <File>
                    <Name>{file.fileName}</Name>
                    <UploadDate>{file.fileDate}</UploadDate>
                    <Viewed
                      style={{ backgroundColor: file.verify ? "green" : "red" }}
                    ></Viewed>
                  </File>
                </a>
              ))}
          </Files>
        </ApplicationList>
      </Container>
    </>
  );
};

export default Application;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.form`
  width: 80%;
  border: 1px solid #658ec6;
  border-radius: 10px;
  border-style: dashed;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #658ec673;
  }
`;

const ApplicationList = styled.div`
  width: 80%;
  margin-top: 10px;
  overflow: scroll;
`;

const Files = styled.div``;

const File = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #658ec673;
  border-radius: 10px;
  position: relative;
`;

const Viewed = styled.div`
  padding: 5px;
  border-radius: 50%;
  position: absolute;
  right: 7px;
`;

const Name = styled.div`
  font-size: 20px;
`;

const UploadDate = styled.div`
  position: absolute;
  right: 12px;
  bottom: 0;
  font-size: 13px;
  color: #658ec6;
  font-weight: 700;
`;
