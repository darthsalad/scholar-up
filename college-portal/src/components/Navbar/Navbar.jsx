import {
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  ActionIcon,
  useMantineColorScheme,
  Button,
} from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconChevronDown,
  IconSun,
  IconMoonStars,
  IconCircle,
} from "@tabler/icons";
import { useStyles } from "./Navbar.styles";

const links = [
  {
    link: "/stats",
    label: "Stats",
  },
  {
    link: "#1",
    label: "My students",
    links: [
      {
        link: "/verified",
        label: "Verified students",
      },
      {
        link: "/unverified",
        label: "Unverified students",
      },
    ],
  },
  {
    link: "/edit",
    label: "Edit profile",
  },
  {
    link: "/contact",
    label: "Contact Us",
  },
];

const colors = [
  { label: "Red", value: "red" },
  { label: "Pink", value: "pink" },
  { label: "Violet", value: "violet" },
  { label: "Cyan", value: "cyan" },
  { label: "Teal", value: "teal" },
  { label: "Green", value: "green" },
  { label: "Lime", value: "lime" },
  { label: "Orange", value: "orange" },
];

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  items.push(
    <Menu key="Select" trigger="hover" exitTransitionDuration={0}>
      <Menu.Target>
        <Button>Toggle Color</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {colors.map((color) => (
          <Menu.Item
            icon={<IconCircle fill={color.value} size={14}></IconCircle>}
            onClick={() => toggleColorScheme(color.value)}
          >
            {color.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );

  items.push(
    <Menu key="button" trigger="hover" exitTransitionDuration={0}>
      <Menu.Target>
        <ActionIcon
          variant="default"
          color="white"
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </Menu.Target>
    </Menu>
  );

  return (
    <>
      <Sidebar showModal={opened} setShowModal={toggle}></Sidebar>
      <Header height={56} className={classes.header} mb={120}>
        <Container>
          <div className={classes.inner}>
            <IconBrandTwitter size={28} inverted="true" />
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              color="#fff"
            />
          </div>
        </Container>
      </Header>
    </>
  );
}
