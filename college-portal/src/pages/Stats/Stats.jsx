import { useState, useEffect } from "react";
import AttnedanceInRange from "../../components/Graphs/AttendaceInRange";
import AttendanceByMonthGraph from "../../components/Graphs/AttendanceByMonth";
import AttendaceOfCollegePerMonth from "../../components/Graphs/AttendanceOfCollegePerMonth";
import AttendancePerCollege from "../../components/Graphs/AttendancePerCollege";
import TotalAttendanceGraph from "../../components/Graphs/TotalAttendanceGraph";
import Navbar from "../../components/Navbar/Navbar";
import { Text, Select } from "@mantine/core";
import { useStyles } from "./Stats.styles";

const options = [
  {
    label: "Attendance Record for all colleges per month",
    value: 0,
  },
  {
    label: "Attendance Record per college",
    value: 1,
  },
  {
    label: "Attendace Record of all colleges till today",
    value: 2,
  },
  {
    label: "Attendance Record for a range of days",
    value: 3,
  },
  {
    label: "Attendance Record of a college per month",
    value: 4,
  },
];

const Stats = () => {
  const { classes } = useStyles();
  const [selected, setSelected] = useState(options[0].value);

  let graph = getGraph(selected);

  useEffect(() => {
    //eslint-disable-next-line
    graph = getGraph(selected);
  }, [selected]);

  return (
    <>
      <Navbar></Navbar>
      <Text className={classes.text}>Stats</Text>
      <Select
        value={selected}
        onChange={setSelected}
        data={options}
        className={classes.select}
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        required={true}
        searchable
        nothingFound="Not found"
      ></Select>
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <div className={classes.root}>
            <div className={classes.innerRoot}>{graph}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const getGraph = (selected) => {
  switch (selected) {
    case 0:
      return <AttendanceByMonthGraph />;
    case 1:
      return <AttendancePerCollege />;
    case 2:
      return <TotalAttendanceGraph />;
    case 3:
      return <AttnedanceInRange />;
    case 4:
      return <AttendaceOfCollegePerMonth />;
    default:
      return <AttendanceByMonthGraph />;
  }
};

export default Stats;
