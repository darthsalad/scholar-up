import { Button } from "@mantine/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Load from "../../components/Load/Load";
import Navbar from "../../components/Navbar/Navbar";
import { StatsGroup } from "../../components/Stats/Stats";
import { auth } from "../../firebase.config";
import Verified from "../verify/Verified";

const Home = () => {
  const [user] = useAuthState(auth);

  const data = () => {
    if (user.email === "gov@govindia.in") return(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px"
        }}
      >
        <Link to="/table">
          <Button>
            Data for all students
          </Button>
        </Link>
      </div>
    )
  }

  if(!user) return <Load />

  return (
    <div>
      <Navbar></Navbar>
      <StatsGroup></StatsGroup>
      {data()}
      <div
        style={{
          paddingTop: "50px",
        }}
      >
        <Verified></Verified>
      </div>
    </div>
  );
};

export default Home;
