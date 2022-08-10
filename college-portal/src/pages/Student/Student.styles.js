import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  studentContainer: {
    minHeight: "98vh",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[3],
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
}));
