import { useEffect, useState } from "react";
import { createStyles, Text } from "@mantine/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles.css";
import ArticleCardVertical from "../Article/Article";

const data = [
  {
    title: "The best laptop for Frontend engineers in 2022",
    date: "Feb 6th",
    author: {
      name: "Elsa Brown",
      avatar:
        "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    ind: 0,
  },
  {
    title: "Testing is the new design",
    date: "Feb 8th",
    author: {
      name: "Ravi kumar",
      avatar:
        "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    ind: 1,
  },
  {
    title: "This is epoc",
    date: "Feb 19th",
    author: {
      name: "Testing bot",
      avatar:
        "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    ind: 2,
  },
];

const useStyles = createStyles((theme) => ({
  main: {
    position: "absolute",
    maxWidth: "80vw",
    minWidth: "80vw",
    margin: " 5rem 50%",
    minHeight: "60rem",
    transform: "translateX(-50%)",
  },

  wrapper: {
    padding: "0.3rem",
    borderRadius: theme.radius.md,
    maxWidth: "80vw",
    minHeight: "60rem",

    "&:before": {
      content: '""',
      zIndex: -1,
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      background: `linear-gradient(-22deg, ${
        theme.colors[theme.primaryColor][4]
      } 11%, ${theme.colors[theme.primaryColor][7]} 125% )`,
      transform: "translate3d(0px, -1px, 0) scale(1.02)",
      filter: "blur(42px)",
      opacity: "var(0.5)",
      transition: "opacity 0.3s",
      borderRadius: "inherit",
    },

    "&::after": {
      content: '""',
      zIndex: -1,
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      background: "inherit",
      borderRadius: "inherit",
    },
  },

  root: {
    background: theme.colorScheme === "dark" ? "#222" : "#fff",
    borderRadius: theme.radius.md,
    minHeight: "60rem",
  },

  gradient: {
    background: `linear-gradient(-22deg, ${
      theme.colors[theme.primaryColor][4]
    } 11%, ${theme.colors[theme.primaryColor][7]} 125% )`,

    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "2rem",
    marginTop: "4rem",
  },

  innerRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const NoticeBoard = () => {
  const { classes } = useStyles();

  const [notices, setNotices] = useState([data[0], data[1]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotices((prev) => {
        if (prev.length > 2) {
          const newData = [...prev];
          newData.shift();
          newData.push(data[Math.floor(Math.random() * data.length)]);
          return newData;
        } else {
          const newData = [...prev];
          newData.push(data[Math.floor(Math.random() * data.length)]);
          return newData;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Text
        className={classes.gradient}
        align="center"
        weight={700}
        style={{ fontFamily: "Greycliff CF, sans-serif" }}
      >
        Timeline
      </Text>
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <div className={classes.root}>
            <TransitionGroup component="div" className={classes.innerRoot}>
              {notices.map((notice) => (
                <CSSTransition
                  key={notice.ind}
                  timeout={1000}
                  classNames="item"
                >
                  <ArticleCardVertical {...notice}></ArticleCardVertical>
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
