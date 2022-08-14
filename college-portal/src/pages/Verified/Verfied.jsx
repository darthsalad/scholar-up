import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Switch,
} from "@mantine/core";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./Verified.styles";

const data = [
  {
    avatar:
      "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Robert Wolfkisser",
    email: "rob_wolf@gmail.com",
    registeredAt: "01.01.2019",
    verified: false,
  },

  {
    avatar:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jill Jailbreaker",
    email: "rob_wolf@gmail.com",
    registeredAt: "01.01.2019",
    verified: true,
  },

  {
    avatar:
      "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Robert Wolfkisser",
    email: "rob_wolf@gmail.com",
    registeredAt: "01.01.2019",
    verified: true,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Bill Horsefighter",
    email: "rob_wolf@gmail.com",
    registeredAt: "01.01.2019",
    verified: true,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jeremy Footviewer",
    email: "rob_wolf@gmail.com",
    registeredAt: "01.01.2019",
    verified: true,
  },
];

const Verified = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={item.verified ? "green" : "red"}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {item.verified ? "Verified" : "Not Verified"}
        </Badge>
      </td>
      <td>
        <Anchor size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.registeredAt}
        </Text>
      </td>
      <td>
        <Switch
          size="lg"
          onLabel="Verifed"
          offLabel="Not verified"
          checked={item.verified}
        ></Switch>
      </td>
    </tr>
  ));

  return (
    <>
      <Navbar></Navbar>
      <Text className={classes.text}>Verified Students</Text>
      <ScrollArea
        className={classes.scrollArea}
        style={{ height: 500 }}
        offsetScrollbars
      >
        <Table
          sx={{ minWidth: 800 }}
          verticalSpacing="xl"
          horizontalSpacing="xl"
        >
          <thead>
            <tr>
              <th>Employee</th>
              <th>Job title</th>
              <th>Email</th>
              <th>Registered at</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default Verified;
