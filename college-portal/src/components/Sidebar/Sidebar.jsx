import { useState } from "react";
import { Navbar, Group, Modal } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconBrandTwitter,
} from "@tabler/icons";
import { useStyles } from "./Sidebar.styles";

const data = [
  { link: "www.google.com", label: "Notifications", icon: IconBellRinging },
  { link: "www.google.com", label: "Billing", icon: IconReceipt2 },
  { link: "www.google.com", label: "Security", icon: IconFingerprint },
  { link: "www.google.com", label: "SSH Keys", icon: IconKey },
  { link: "www.google.com", label: "Databases", icon: IconDatabaseImport },
  { link: "www.google.com", label: "Authentication", icon: Icon2fa },
  { link: "www.google.com", label: "Other Settings", icon: IconSettings },
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
      <Navbar height={700} className={classes.navbar}>
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
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

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
