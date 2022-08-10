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
import { app, auth, db } from "../../firebase.config"
import { Link, useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import Cookies from "universal-cookie";
import Notifications from "../../components/Notifications/Notifications";

const cookies = new Cookies();

const Register = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [cname, setCname] = useState("")
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        cookies.set("uid", user.uid, { path: "/" });
        cookies.set("user-email", user.email, { path: "/" });
        createacc()
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        Notifications("There was an error", errorMessage);
      });
  }

  async function createacc() {
    const user = auth.currentUser
    const date = new Date()
    try {
      const docRef = await addDoc(collection(db, "colleges"), {
        cname: cname,
        domain: domain,
        email: user.email,
        createdOn: date,
      })
      console.log("Document written with ID: ", docRef.id)
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    navigate("/")
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
          <br/>
          <TextInput
            label="College name"
            placeholder="Full name of the college"
            size="md"
            value={cname}
            onChange={(e) => setCname(e.currentTarget.value)}
          />
          <br/>
          <TextInput
            label="College domain"
            placeholder="domain of the college"
            size="md"
            value={domain}
            onChange={(e) => setDomain(e.currentTarget.value)}
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
