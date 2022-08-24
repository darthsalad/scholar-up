import { auth, db } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export const handleLogin = (
  mail,
  password,
  setLoading,
  navigate,
  Notifications
) => {
  setLoading(true);
  signInWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      setLoading(false);
      navigate("/");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(error);
      setLoading(false);
      Notifications("There was an error", errorMessage);
    });
};

export const handleRegister = (
  mail,
  password,
  cname,
  setLoading,
  Notifications,
  navigate
) => {
  setLoading(true);
  createUserWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      createacc(setLoading, navigate, Notifications, cname);
    })
    .catch((error) => {
      const errorMessage = error.message;
      setLoading(false);
      Notifications("There was an error", errorMessage);
    });
};

async function createacc(setLoading, navigate, Notifications, cname) {
  const user = auth.currentUser;
  const date = new Date();
  try {
    const docRef = await addDoc(collection(db, "colleges"), {
      cname: cname,
      domain: user.email.split("@")[1],
      email: user.email,
      createdOn: date,
      scholarships: [],
      class_begin: "",
      class_end: ""
    });
    console.log("Document written with ID: ", docRef.id);
    setLoading(false);
    navigate("/");
  } catch (e) {
    Notifications("There was an error", e.message);
  }
  navigate("/");
}
