import { useEffect, useState, useCallback } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { Button, Text, LoadingOverlay, Alert, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { collection, query, where, getDocs, addDoc, updateDoc,increment,doc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import QRCode from "react-qr-code";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./QRGenerator.styles";
import { IconAlertCircle } from "@tabler/icons";

const QRGenerator = () => {
  const { classes } = useStyles();
  const [user] = useAuthState(auth);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [validStartTime, setValidStartTime] = useState(null);
  const [validEndTime, setValidEndTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation(position.coords);
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    async function getQRCode() {
      try {
        const q = query(
          collection(db, "QRTokens"),
          where("cdomain", "==", user.email.split("@")[1])
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach((doc) => {
          if (
            new Date().getTime() >=
              doc.data().validStartTime.toDate().getTime() &&
            new Date().getTime() <= doc.data().validEndTime.toDate().getTime()
          ) {
            setToken(doc.data().token);
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getQRCode();
  }, [user]);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const randomString = makeid(10);

      const q = query(
        collection(db, "QRTokens"),
        where("cdomain", "==", user.email.split("@")[1])
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs)
      if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "QRTokens"), {
          token: randomString,
          cdomain: user.email.split("@")[1],
          validStartTime: validStartTime,
          validEndTime: validEndTime,
          location: {
            lat: location.latitude,
            lng: location.longitude,
            alt: location.altitude,
          },
          classNo: 1
        });
      } else {
            await updateDoc(doc(db, "QRTokens", querySnapshot.docs[0].id), {
              classNo: increment(1),
              token: randomString,
              validStartTime: validStartTime,
              validEndTime: validEndTime,
              location: {
                lat: location.latitude,
                lng: location.longitude,
                alt: location.altitude,
              },
            })
      }

      setToken(randomString);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleCaptureClick = useCallback(async () => {
    const canvas = await html2canvas(document.getElementById("qrcode"));
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, `qr-code-${new Date().toString()}.png`, "image/png");
  }, []);

  return (
    <>
      <Navbar />

      {error ? (
        <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
          {error}
        </Alert>
      ) : (
        <>
          <Text className={classes.text}>Generate QR</Text>

          <div style={{ width: "80%", margin: "auto" }}>
            <Button
              className={classes.btn}
              onClick={handleGenerate}
              disabled={!validStartTime || !validEndTime || !location}
            >
              Generate QR Code
            </Button>
            <TimeInput
              label="Start of the class"
              required
              onChange={(e) => {
                setValidStartTime(e);
              }}
            ></TimeInput>
            <TimeInput
              label="End of the class"
              required
              onChange={(e) => {
                setValidEndTime(e);
              }}
            ></TimeInput>

            {location && (
              <TextInput
                label="Location"
                value={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
                disabled
              ></TextInput>
            )}
            {/* {console.log(location)} */}

            {!location && (
              <TextInput
                label="Location"
                value="Loading location"
                disabled
              ></TextInput>
            )}
          </div>

          {!loading && token && (
            <Button className={classes.btn} onClick={handleCaptureClick}>
              Capture QR Code
            </Button>
          )}

          <div className={classes.main}>
            <div className={classes.wrapper}>
              <div id="qrcode" className={classes.root} visible={loading}>
                <LoadingOverlay visible={loading} overlayBlur={2} />
                <div style={{ position: "relative" }}>
                  <div className={classes.qr}>
                    {token && (
                      <QRCode
                        style={{ display: "block" }}
                        title="qr code"
                        value={JSON.stringify({
                          token: token,
                          cdomain: user.email.split("@")[1],
                          validStartTime: validStartTime,
                          validEndTime: validEndTime,
                          location: {
                            lat: location.latitude,
                            lng: location.longitude,
                            alt: location.altitude,
                          },
                        })}
                      />
                    )}
                    {!loading && !token && (
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Oops!"
                        color="red"
                        radius="xs"
                        variant="filled"
                      >
                        No QR code found. Generate a new qr code
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default QRGenerator;
