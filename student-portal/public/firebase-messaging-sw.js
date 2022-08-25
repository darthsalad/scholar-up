// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyArzJHx8QMAx4rJAgGgIxV0G44qPkDNmmI",
  authDomain: "scholar-up1.firebaseapp.com",
  projectId: "scholar-up1",
  storageBucket: "scholar-up1.appspot.com",
  messagingSenderId: "1012802440689",
  appId: "1:1012802440689:web:8de0e7e1bd569171cb4850",
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
