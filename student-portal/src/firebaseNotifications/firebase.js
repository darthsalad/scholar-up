import firebase from "firebase/app";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/messaging";
const messaging = firebase.messaging();

const NotificationRequest = async (token, uid) => {
  try {
    console.log("token revived", token);
    console.log("user", uid);
    var docRef = db.collection("fcmToken").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
            db.collection("fcmToken")
              .doc(uid)
              .update({
                token: token,
              })
              .then((citiesRef) => {
                console.log("Document updated !");
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          var documentRef = db.collection("fcmToken");
          documentRef
            .doc(uid)
            .set({
              token: token,
            })
            .then((citiesRef) => {
              console.log("Document addded !");
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const requestForToken = (user) => {
  return messaging
    .getToken({
      vapidKey:
        "BMnVdpMJQBcTJdH-Ol2vV05r4w-n7YZhoqzaKTcp3rAWxb8cKYvlCenotsKhKjOuArwtYwsO58rsAdLQB7SQqys",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        console.log(user);
        if (user) {
          const { uid } = user;
          console.log(uid);
          NotificationRequest(currentToken, uid);
        }
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
///vggghghhhgh
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
