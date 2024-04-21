import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import database from "@react-native-firebase/database";
import { useUser } from "../services/UserContext";

const Notifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const notificationsRef = database().ref("notifications");
    notificationsRef.on("value", fetchNotifications);
    return () => {
      notificationsRef.off("value", fetchNotifications);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const snapshot = await database()
        .ref("notifications")
        .orderByChild("timestamp")
        .once("value");
      if (snapshot.exists()) {
        const notificationsData = snapshot.val();
        const filteredNotifications = Object.values(notificationsData).filter(
          (notification) => notification.userId === user.userId
        );
        setNotifications(filteredNotifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const notificationTime = (sendTimestamp) => {
    const sendTimeObj = new Date(sendTimestamp);
    const currDate = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const sendTime = sendTimeObj.toLocaleTimeString([], options);
    const sendDate = sendTimeObj.toLocaleDateString();
    if (currDate.toLocaleDateString() !== sendDate) {
      return sendDate;
    } else {
      return sendTime;
    }
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationBoxContainer}>
      <Image source={{ uri: item.profileImage }} style={styles.image} />
      <View style={styles.notificationItem}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{notificationTime(item.timestamp)}</Text>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {item.message}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"#e75f62"} />
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.windowMsgContainer}>
          <Text style={styles.windowMsgText}>
            You have no new notifications at the moment.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  notificationBoxContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationItem: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "600",
  },
  time: {
    marginLeft: "auto",
    color: "grey",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  windowMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f3f5",
    borderRadius: 8,
    padding: 16,
  },
  windowMsgText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
});

export default Notifications;
