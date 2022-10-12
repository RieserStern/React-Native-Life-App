import messaging from "@react-native-firebase/messaging";
import { updateToken } from "./firestore";

const CLOUD_MESSAGING_SERVER_KEY =
  "AAAAa2uhe4c:APA91bEnMUCK-H2Bf3gM3o4Zo8TbDi_5oK41qzWcpOdf4JE4xHVOkwVrjrhBIJDd2JqTWTwo34LZBCmz2NARPLxOOLbxpAwloXAd5RLfQYPSQSenTf7Lz8kDXnWzNZB0IvhsQ8PH8Uwr";

export const setFcmToken = async (userId) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      updateToken(userId, fcmToken);
      return;
    }
  }
  console.log("Failed", "No token received");
  return null;
};

export const sendPushNotification = (token, data, sound) => {
  let params = {};
  if (isAndroid) {
    params = {
      to: token,
      data,
    };
  } else {
    params = {
      to: token,
      notification: {
        title: data.title,
        body: data.message,
        sound: sound ?? "default",
      },
      priority: "high",
      data,
    };
  }

  let options = {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
      Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };
  console.log("send notification: ", options);
  try {
    fetch("https://fcm.googleapis.com/fcm/send", options);
  } catch (e) {
    console.log("Send Notification Error:", e);
  }
};
