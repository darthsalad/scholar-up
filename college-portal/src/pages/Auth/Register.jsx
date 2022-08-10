import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  PasswordInput,
} from "@mantine/core";
import { useStyles } from "./Register.styles";

import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Notifications from "../../components/Notifications/Notifications";

const cookies = new Cookies();

const Register = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        cookies.set("uid", user.uid, { path: "/" });
        cookies.set("user-email", user.email, { path: "/" });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        Notifications("There was an error", errorMessage);
      });
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
