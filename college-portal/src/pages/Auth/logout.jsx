import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth, app } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import Notifications from "../../components/Notifications/Notifications";

const Logout = () => {
  const navigate = useNavigate();
  const user = getAuth(app);
  useEffect(() => {
    user &&
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((e) => {
          Notifications("There was an error", e.message);
        });
  }, [user, navigate]);

  return <div>logout successful</div>;
};

export default Logout;
