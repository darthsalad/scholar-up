import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  mainContainer: {
    minHeight: "98vh",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[3],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    backgroundColor: theme.colorScheme === "dark" ? "black" : "white",
  },
  heading: {
    color: theme.colorScheme === "dark" ? "white" : "rgb(7, 7, 61)",
    fontSize: "6.3rem",
    fontWeight: "600",
    textAlign: "center",
  },
  innerContainer: {
    minHeight: "50vh",
    padding: "14px",
  },
  subHeading: {
    color: theme.colors[theme.primaryColor][7],
    fontSize: "2rem",
    textAlign: "center",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: "25px",
      marginBottom: "10px",
    },
  },
  text: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors[theme.primaryColor][0]
        : "grey",
    fontSize: "1rem",
    textAlign: "left",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      textAlign: "center",
      lineHeight:"23px"
    },
  },
}));
