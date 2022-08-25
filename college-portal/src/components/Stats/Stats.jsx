import { useStyles } from "./Stats.styles";
import { Text } from "@mantine/core";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Load from "../Load/Load";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export function StatsGroup() {
  const [user] = useAuthState(auth);
  const [loadingStats, setLoadingStats] = useState(true);
  const [list, setList] = useState();
  const [unVerified, setUnverified] = useState();

  useEffect(() => {
    async function getRegistered() {
      try {
        const q =
          user.email === "gov@govindia.in"
            ? query(collection(db, "students"))
            : query(
                collection(db, "students"),
                where("cdomain", "==", user.email.split("@")[1])
              );
        const querySnapshot = await getDocs(q);
        setList(querySnapshot.size);
        setLoadingStats(false);
      } catch (err) {
        console.log(err);
      }
    }

    async function getUnverified() {
      try {
        const q =
          user.email === "gov@govindia.in"
            ? query(collection(db, "students"), where("verified", "==", false))
            : query(
                collection(db, "students"),
                where("cdomain", "==", user.email.split("@")[1]),
                where("verified", "==", false)
              );
        const querySnapshot = await getDocs(q);
        setUnverified(querySnapshot.size);
        setLoadingStats(false);
      } catch (err) {
        console.log(err);
      }
    }

    user && getRegistered();
    user && getUnverified();
  }, [user]);

  const data = [
    {
      title: "Number of students registered",
      stats: list,
      description: "",
    },
    {
      title: "Number of unverified users",
      stats: unVerified,
      description: "",
    },
  ];

  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return !user || loadingStats ? (
    <Load></Load>
  ) : (
    <div className={classes.root}>{stats}</div>
  );
}
