import { Navbar,Modal } from "@mantine/core";
import {
  IconHome,
  IconListDetails,
  IconSettings,
  IconPhone,
  IconListCheck,
  IconLogout,
  IconChartBar,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Sidebar.styles";

const data = [
  { link: "/", label: "Home", icon: IconHome},
  { link: "/stats", label: "Stats", icon: IconChartBar },
  {
    link: "/students/verified",
    label: "Verified Students",
    icon: IconListCheck,
  },
  {
    link: "/students/unverified",
    label: "Unverified Students",
    icon: IconListDetails,
  },
  { link: "/profile", label: "Profile", icon: IconSettings },
  { link: "/contact", label: "Contact Us", icon: IconPhone },
];

export default function Sidebar({ showModal, setShowModal }) {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={cx(classes.link)}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        navigate(item.link);
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
        <Navbar.Section grow>{links}</Navbar.Section>

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
