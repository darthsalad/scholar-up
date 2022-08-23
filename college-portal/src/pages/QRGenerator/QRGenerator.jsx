import { Button, Text } from "@mantine/core";
import QRCode from "react-qr-code";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./QRGenerator.styles";

const QRGenerator = () => {
  const { classes } = useStyles();

  return (
    <>
      <Navbar></Navbar>
      <Text className={classes.text}>
        Generate QR for {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
      </Text>
      <div className={classes.main}>
        <div className={classes.qr}>
          <QRCode
            style={{ display: "block" }}
            title="qr code"
            value="https://mantine.dev/"
          />
        </div>
        <Button fullWidth>Generate QR Code</Button>
      </div>
    </>
  );
};

export default QRGenerator;
