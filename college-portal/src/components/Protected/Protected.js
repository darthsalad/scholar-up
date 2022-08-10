import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
const cookies = new Cookies();

const Protected = ({ children }) => {
  if (cookies.get("uid")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
