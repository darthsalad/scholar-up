import AttnedanceInRange from "../../components/Graphs/AttendaceInRange";
import AttendanceByMonthGraph from "../../components/Graphs/AttendanceByMonth";
import AttendaceOfCollegePerMonth from "../../components/Graphs/AttendanceOfCollegePerMonth";
import AttendancePerCollege from "../../components/Graphs/AttendancePerCollege";
import TotalAttendanceGraph from "../../components/Graphs/TotalAttendanceGraph";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./Stats.styles";

const Stats = () => {
  const { classes } = useStyles();

  return (
    <>
      <Navbar></Navbar>
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <div className={classes.root}>
            <div className={classes.innerRoot}>
              {/* <AttendanceByMonthGraph></AttendanceByMonthGraph> */}
              {/* <AttendancePerCollege></AttendancePerCollege> */}
              {/* <TotalAttendanceGraph></TotalAttendanceGraph> */}
              {/* <AttnedanceInRange></AttnedanceInRange> */}
              <AttendaceOfCollegePerMonth></AttendaceOfCollegePerMonth>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
