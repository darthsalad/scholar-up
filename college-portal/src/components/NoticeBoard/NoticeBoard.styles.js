import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
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
    fontWeight: "1000",
    WebkitTextFillColor: "transparent",
    fontSize: "3rem",
    marginTop: "4rem",
  },

  innerRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));
