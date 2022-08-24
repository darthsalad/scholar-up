import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  main: {
    height: "fit-content",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "80%",
    height: "30rem",
    border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,
    borderRadius: theme.radius.md,
  },

  timeInputs: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: "4rem",
  },
  timeInput: {
    minWidth: "40%",
  },
  content: {
    width: "80%",
    margin: "2rem auto",
  },
  textInput: {
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
    marginBottom: "4rem",
    marginTop: "-2rem",
  },
  gov: {
    display: "none",
  },
}));
