import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StatsGroup } from "../../components/Stats/Stats";
import NoticeBoard from "../../components/NoticeBoard/NoticeBoard";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <StatsGroup></StatsGroup>
      <NoticeBoard></NoticeBoard>
    </div>
  );
};

export default Home;
