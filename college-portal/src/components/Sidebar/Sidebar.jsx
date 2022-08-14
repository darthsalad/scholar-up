import { useState } from "react";
import { Navbar, Group, Modal } from "@mantine/core";
import {
  IconListDetails,
  IconSettings,
  IconPhone,
  IconListCheck,
  IconLogout,
  IconBrandTwitter,
  IconChartBar,
  IconBlur
} from "@tabler/icons";
import { useStyles } from "./Sidebar.styles";

const data = [
  { link: "/stats", label: "Stats", icon: IconChartBar },
  { link: "/verified-students", label: "Verified Students", icon: IconListCheck },
  { link: "/unverified-students", label: "Unverified Students", icon: IconListDetails },
  { link: "/profile", label: "Profile", icon: IconSettings },
  { link: "/contact-us", label: "Contact Us", icon: IconPhone },
  { link: "", label: "Themes", icon: IconBlur },
];

export default function Sidebar({ showModal, setShowModal }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Modal
      opened={showModal}
      onClose={() => setShowModal(false)}
      overflow="inside"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
    >
      <Navbar height={500} className={classes.navbar}>
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <IconBrandTwitter size={28} inverted />
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="/"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    </Modal>
  );
}
