import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  studentContainer: {
    minHeight: "98vh",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[3],
    marginTop: "-1rem",
  },
  left: {
    backgroundColor: theme.colorScheme === "dark" ? "black" : "white",
  },
  textLeft: {
    color: theme.colorScheme === "dark" ? "white" : "rgb(7, 7, 61)",
  },
  leftt: { color: theme.colorScheme === "dark" ? "white" : "rgb(7, 7, 61)" },
  rightt: {
    color:
      theme.colorScheme === "dark" ? "rgb(170, 166, 166)" : "rgb(37, 36, 36)",
  },
  tag: {
    backgroundColor: theme.colors[theme.primaryColor][7],
    color: theme.colors[theme.primaryColor][0],
  },

  image: {
    border: `solid 5px ${theme.colors[theme.primaryColor][4]}`,
    height: "10rem",
    width: "10rem",
    borderRadius: "50%",
    minWidth: "2rem",
    minHeight: "2rem",
  },
  borders: {
    border: `solid 5px ${theme.colors[theme.primaryColor][4]}`,
  },
  leaveApplications: {
    backgroundColor: "black",
    borderRadius: "5px",
    border: `solid 5px ${theme.colors[theme.primaryColor][4]}`,
    marginBottom: "2rem",
  },
  text: {
    background: `linear-gradient(-22deg, ${
      theme.colors[theme.primaryColor][4]
    } 11%, ${theme.colors[theme.primaryColor][7]} 125% )`,

    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "3rem",
    fontWeight: "1000",
    textAlign: "center",
    marginBottom: "2rem",
  },
  statsContainer: {
    backgroundColor: "black",
    borderRadius: "5px",
    border: `solid 5px ${theme.colors[theme.primaryColor][4]}`,
    marginBottom: "2rem",
  },
}));
