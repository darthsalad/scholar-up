import { createStyles, Card, Image, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginTop: "2rem",
    minWidth: "80%",
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export default function ArticleCardVertical({
  imgURL,
  sname,
  accountCreatedOn,
}) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image
          src={imgURL ? imgURL[0] : null}
          withPlaceholder
          height={140}
          width={140}
        />
        <div className={classes.body}>
          <Text className={classes.title} mt="xs" mb="md">
            New registration!!
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Text size="xs">{sname}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              Account created : {accountCreatedOn}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
