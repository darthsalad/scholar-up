import React, { useState, useEffect, forwardRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import styled from "styled-components";
import { mobile } from "../Utilities/responsive";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, storage } from "../firebaseConfig";
import firebase from "firebase";
import Webcam from "react-webcam";
import {
  TextInput,
  Button,
  Select,
  Group,
  UnstyledButton,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconAt, IconBuilding } from "@tabler/icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "#2aa08ac2",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  outline: "none",
  "@media (max-width: 770px)": {
    minWidth: 300,
  },
};

const videoConstraints = {
  width: "100%",
  facingMode: "user",
};

export default function BasicModal() {
  const [user] = useAuthState(auth);
  const [id, setID] = useState();
  const [progress, setProgress] = useState(0);
  const [disable, setDisable] = useState(false);
  const [text, setText] = useState("Take a Selfie");
  const [imgTaken, setImgTaken] = useState(true);
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState(false);
  const [mobileNo, setMobile] = useState("");
  const [colleges, setColleges] = useState([]);
  const [domain, setDomain] = useState("");

  // Gets docid and checks for imgURL
  useEffect(() => {
    db.collection("students")
      .where("email", "==", user.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach(async (snap) => {
          setID(snap.id);
          if (!snap.data().imgURL.length) setOpen(true);
          else setOpen(false);
        });
      });

    db.collection("colleges").onSnapshot((snapshot) => {
      setColleges(
        snapshot.docs.map((doc) => ({
          value: doc.id,
          cname: doc.data().cname,
          label: doc.data().cname,
        }))
      );
    });
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const variable = db.collection("students").doc(id);
      await variable.update({
        DOB: dob,
        mobile: mobileNo,
        cdomain: domain,
      });
      setImgTaken(false);
    } catch (err) {
      console.log(err);
      alert("Invalid data");
    }
  }

  const SelectItem = forwardRef(({ value, cname, ...others }, ref) => (
    <UnstyledButton>
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{cname}</Text>
          </div>
        </Group>
      </div>
    </UnstyledButton>
  ));

  async function setCollegeDomain(cId) {
    const variable = db.collection("colleges").doc(cId);
    const c = await variable.get();
    console.log(c.data().domain);
    setDomain(c.data().domain);
  }

  return (
    <>
      {progress === 100 ? (
        <Alert
          style={{ position: "absolute", zIndex: 2 }}
          onClose={() => {
            setOpen(false);
          }}
          severity="success"
        >
          <AlertTitle>Uploaded</AlertTitle>
          You image has been uploaded — <strong>Give Attendence</strong>
        </Alert>
      ) : (
        ""
      )}
      <div style={{ objectFit: "contain" }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {imgTaken ? (
              <form onSubmit={(e) => handleSubmit(e)}>
                <div
                  style={{
                    width: "auto",
                    height: "30rem",
                    borderRadius: "10px",
                  }}
                >
                  <TextInput
                    icon={<IconBuilding size={14}></IconBuilding>}
                    label="Mobile"
                    value={mobileNo}
                    placeholder="Enter mobile number"
                    style={{ marginBottom: "2rem" }}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    required
                  ></TextInput>
                  <Select
                    label="Choose college"
                    placeholder="Pick one"
                    itemComponent={SelectItem}
                    data={colleges}
                    searchable
                    required
                    maxDropdownHeight={400}
                    nothingFound="No Results"
                    filter={(value, item) =>
                      item.cname
                        .toLowerCase()
                        .includes(value.toLowerCase().trim())
                    }
                    onChange={(e) => {
                      setCollegeDomain(e);
                    }}
                  />
                  <TextInput
                    value={domain}
                    icon={<IconAt size={14}></IconAt>}
                    label="Institute domain"
                    placeholder="Update your institute's domain"
                    style={{ marginBottom: "2rem" }}
                    data={colleges}
                    disabled
                  ></TextInput>
                  <div style={{ minWidth: "40%" }}>
                    <DatePicker
                      label="Date of Birth"
                      required
                      onChange={(e) => {
                        setDob(e.toLocaleDateString());
                      }}
                    />
                  </div>

                  <Button type="submit" fullWidth>
                    Submit
                  </Button>
                </div>
              </form>
            ) : (
              <Webcam
                audio={false}
                height={1080}
                videoConstraints={videoConstraints}
                screenshotQuality={1}
                imageSmoothing={true}
                screenshotFormat="image/jpeg"
                style={{
                  width: "100%",
                  height: "100%",
                  mobile: { height: "100%" },
                }}
              >
                {({ getScreenshot }) => (
                  <CustomButton
                    disabled={disable}
                    onClick={() => {
                      // gets screens shot
                      const imgSrc = getScreenshot();
                      setText("Wait for it");
                      // upload to firebase storage
                      const uploadTask = storage
                        .ref(`images/${user.displayName}/`)
                        .putString(imgSrc, "data_url");
                      uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                          const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                              100
                          );
                          setProgress(progress);
                        },
                        (error) => {
                          console.error(error);
                        },
                        () => {
                          // saves the generated url from storage in firebase database
                          storage
                            .ref("images")
                            .child(user.displayName)
                            .getDownloadURL()
                            .then(async (url) => {
                              const variable = db
                                .collection("students")
                                .doc(id);
                              await variable.update({
                                imgURL:
                                  firebase.firestore.FieldValue.arrayUnion(url),
                              });
                              setProgress(0);
                              setDisable(true);
                              // setOpen(false);
                              setImgTaken(true);
                            })
                            .catch((err) => console.error(err));
                        }
                      );
                    }}
                  >
                    {text}
                  </CustomButton>
                )}
              </Webcam>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

const CustomButton = styled.button`
  background: linear-gradient(to right top, #65dfc9, #6cdbeb);
  border-radius: 2rem;
  color: white;
  padding: 1rem;
  outline: none;
  border: none;
  margin-top: 10px;
  font-size: 2rem;
  cursor: pointer;
  margin: 0 auto;
  width: 100%;
  &:hover {
    background: linear-gradient(to right bottom, #26a890, #3fe3fb);
    transition: all 1s ease-in-out;
  }
  ${mobile({ marginTop: "2px" })};
`;
