import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  scrollArea: {
    width: "80%",
    margin: "auto",
    border: `solid 2px ${theme.colors[theme.primaryColor][4]}`,
    borderRadius: theme.radius.md,
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
    textAlign: "center",
  },
}));
