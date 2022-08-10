import { showNotification } from "@mantine/notifications";

const Notifications = (title, message) => {
  showNotification({
    autoClose: 5000,
    title,
    message,
  });
};

export default Notifications;
