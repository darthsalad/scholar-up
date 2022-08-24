import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StatsGroup } from "../../components/Stats/Stats";
import Verified from "../verify/Verified";
// import NoticeBoard from "../../components/NoticeBoard/NoticeBoard";
// import { Button } from "@mantine/core";
// import { IconExternalLink } from "@tabler/icons";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <StatsGroup></StatsGroup>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px"
        }}
      >
        <Link to="/students/verified">
        <Button 
          rightIcon={<IconExternalLink />} 
          size="lg"
          >
          Verified Students
        </Button>
        </Link>
      </div> */}
      <div style={{
          paddingTop: "50px"
      }}>
        
      <Verified></Verified>
        </div>
    </div>
  );
};

export default Home;
