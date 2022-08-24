import { useEffect, useState, useCallback } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { Button, Text, LoadingOverlay, Alert } from "@mantine/core";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import QRCode from "react-qr-code";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./QRGenerator.styles";
import { IconAlertCircle } from "@tabler/icons";

const QRGenerator = () => {
  const { classes } = useStyles();
  const [user, wait] = useAuthState(auth);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

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
            doc.data().validDate.toDate().getDate() === new Date().getDate()
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

      await addDoc(collection(db, "QRTokens"), {
        token: randomString,
        cdomain: user.email.split("@")[1],
        validDate: new Date(),
      });

      setToken(randomString);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleCaptureClick = useCallback(async () => {
    const canvas = await html2canvas(document.getElementById("qrcode"));
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(
      dataURL,
      `qr-code-${new Date().toJSON().slice(0, 10).replace(/-/g, "/")}.png`,
      "image/png"
    );
  }, []);

  return (
    <>
      <Navbar />
      <Text className={classes.text}>
        Generate QR for {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
      </Text>

      {!loading && !token && (
        <Button className={classes.btn} onClick={handleGenerate}>
          Generate QR Code
        </Button>
      )}

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
                    value={token}
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
