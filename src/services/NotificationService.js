import { PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";
import database from "@react-native-firebase/database";

const NotificationService = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  messaging().onMessage(async (remoteMessage) => {
    const { notification } = remoteMessage;
    console.log("Received Notification (Foreground):", notification);

    saveNotificationToDatabase(notification);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const { notification } = remoteMessage;
    console.log("Received Notification (Background):", notification);

    saveNotificationToDatabase(notification);
  });
};

const saveNotificationToDatabase = (notification) => {
  database().ref("notifications").push().set({
    title: notification.title,
    message: notification.body,
    userId: notification.userId,
    senderId: notification.senderId,
    timestamp: Date.now(),
  });
};

export default NotificationService;
