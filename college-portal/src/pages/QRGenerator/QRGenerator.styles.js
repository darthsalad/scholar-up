import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  main: {
    height: "fit-content",
    width: "50vw",
    minWidth: "fit-content",
    margin: "auto",
    border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,
    borderRadius: theme.radius.md,
    padding: "2rem",
  },

  text: {
    background: `linear-gradient(-22deg, ${
      theme.colors[theme.primaryColor][4]
    } 11%, ${theme.colors[theme.primaryColor][7]} 125% )`,

    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "3rem",
    textAlign: "center",
    fontWeight: "1000",
    marginBottom: "4rem",
  },
  qr: {
    background: "white",
    maxWidth: "fit-content",
    margin: "2rem auto",
  },
}));
