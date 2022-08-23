// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAUXWaThwUp3Cis5nt__ETHadnrJr6lhhY",
  authDomain: "scholar-up.firebaseapp.com",
  projectId: "scholar-up",
  storageBucket: "scholar-up.appspot.com",
  messagingSenderId: "651848952192",
  appId: "1:651848952192:web:f1a6a7365bea5ef84ab965",
  measurementId: "G-0JFG3SHDCK"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
