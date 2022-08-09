import { useStyles } from "./Stats.styles";
import { Text } from "@mantine/core";

const data = [
  {
    title: "Number of students registered",
    stats: "456,133",
    description: "",
  },
  {
    title: "Number of students having more than 75% attendance",
    stats: "2,175",
    description: "",
  },
  {
    title: "Number of unverified users",
    stats: "1,994",
    description: "",
  },
];

export function StatsGroup() {
  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
