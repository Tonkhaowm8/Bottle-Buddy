import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyByHrdZWscP6xFXfmyaT0e7gKuQ3WRyOjM",
  authDomain: "hydrobudpushnotification.firebaseapp.com",
  projectId: "hydrobudpushnotification",
  storageBucket: "hydrobudpushnotification.appspot.com",
  messagingSenderId: "74790842488",
  appId: "1:74790842488:web:6ba8ae567b9ddc152f3d8d",
  measurementId: "G-HPJ888FW5K"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BOYLMrLhTDn1qH0Z9UkxZ6fuho-sj7eNbr48xEvAIvMoyhar74cwHTnvDWCKDktUiSKfr9dojnWK8PU8YEaCU6s",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();