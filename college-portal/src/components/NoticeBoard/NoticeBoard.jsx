import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles.css";
import { useStyles } from "./NoticeBoard.styles";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import ArticleCardVertical from "../Article/Article";

const validDate = (dateOfJoining) => {
  const dateParts = dateOfJoining.split("/");
  const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  return date;
};

const NoticeBoard = () => {
  const { classes } = useStyles();
  const [user, loading] = useAuthState(auth);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const q = query(
        collection(db, "students"),
        where("cdomain", "==", user.email.split("@")[1])
      );

      onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            student: doc.data(),
          });
        });

        list.sort(
          (s1, s2) =>
            validDate(s2.student.accountCreatedOn) -
            validDate(s1.student.accountCreatedOn)
        );

        setStudents(list);
      });
    };

    user && getStudents();
  }, [user]);

  return (
    <>
      <Text
        className={classes.gradient}
        align="center"
        weight={700}
        style={{ fontFamily: "Greycliff CF, sans-serif" }}
      >
        Latest Registrations
      </Text>
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <div className={classes.root}>
            <TransitionGroup component="div" className={classes.innerRoot}>
              {students &&
                students.map((student) => (
                  <CSSTransition
                    key={student.id}
                    timeout={1000}
                    classNames="item-transition"
                    unmountOnExit
                  >
                    <ArticleCardVertical
                      {...student.student}
                    ></ArticleCardVertical>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeBoard;
