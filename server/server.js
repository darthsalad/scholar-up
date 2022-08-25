const express = require("express");
const app = express();
const cron = require("node-cron");
const port = 8000;
var admin = require("firebase-admin");
var serviceAccount = require("./keys.json");
const cors = require("cors");
app.use(express.json());
app.use(cors());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const User = db.collection("fcmToken");
const getUser = async () => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => doc.data());
  let arr = list.map((item) => {
    console.log(item);
    return item?.token;
  });
  return arr;
};
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
//scheduling notifications at 8:55 am ...monday to friday
//55 8 * * 1-5
cron.schedule("55 8 * * 1-5", async function () {
  console.log("running task");
  try {
    var registrationToken = await getUser();
    var unique = registrationToken.filter(onlyUnique);
    console.log(unique);
    if (unique.length > 0) {
      var payload = {
        tokens: unique,
        notification: {
          title: "Attendance Alert",
          body: "Dont Missout Attendance !",
        },
      };
      admin.messaging().sendMulticast(payload);
    }
  } catch (err) {
    console.log("errror has occured", err);
  }
});

app.get("/", async (req, res) => {
  res.send("running app");
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
