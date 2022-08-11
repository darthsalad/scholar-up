import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import Load from "../Load/Load";

const Protected = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Load></Load>;
  }

  if (user && !loading) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
