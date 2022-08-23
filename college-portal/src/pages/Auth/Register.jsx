import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  PasswordInput,
} from "@mantine/core";
import { useStyles } from "./Register.styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleRegister } from "../../api/auth.api";
import Notifications from "../../components/Notifications/Notifications";

const Register = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [cname, setCname] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    handleRegister(mail, password, cname, setLoading, Notifications, navigate);
  }

  return (
    <>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Welcome to App name
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            value={mail}
            onChange={(e) => setMail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
          <TextInput
            label="College name"
            placeholder="Full name of the college"
            size="md"
            value={cname}
            onChange={(e) => setCname(e.currentTarget.value)}
          />

          <Button
            loading={loading}
            fullWidth
            mt="xl"
            size="md"
            onClick={handleSubmit}
          >
            Register
          </Button>

          <Text align="center" mt="md">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                fontWeight: 700,
                color: "inherit",
              }}
            >
              Login
            </Link>
          </Text>
        </Paper>
      </div>
    </>
  );
};

export default Register;
