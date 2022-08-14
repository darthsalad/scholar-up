import React, { useState, useEffect } from "react";
//import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from "react-toastify";
import "./notification.css";
import "react-toastify/dist/ReactToastify.css";
import { requestForToken, onMessageListener } from "./firebase";
const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [user, setUser] = useState(null);
  const notify = () => toast.info(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <h4>
          <b style={{ color: "black" }}>{notification?.title}</b>
        </h4>
        <p style={{ color: "black" }}>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  //requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      console.log(payload);
      console.log("message recived");
    })
    .catch((err) => console.log("failed: ", err));

  return <ToastContainer />;
};

export default Notification;
