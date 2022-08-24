import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StatsGroup } from "../../components/Stats/Stats";
import Verified from "../verify/Verified";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <StatsGroup></StatsGroup>
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
