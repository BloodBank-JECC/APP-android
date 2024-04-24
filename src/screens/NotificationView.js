import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from "react-native";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ShowToast from "../components/Toast";
import { useUser } from "../services/UserContext";

export default function NotificationView({ sender }) {
  const { user } = useUser();
  const [senderData, setSenderData] = useState();
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showRejectMsg, setShowRejectMsg] = useState(false);
  const [alreadyDonated, setAlreadyDonated] = useState(false);
  const [daysUntilCanDonate, setDaysUntilCanDonate] = useState(null);

  useEffect(() => {
    findSenderData();

    if (sender.confirmation === "accepted") {
      setShowCall(true);
    } else if (sender.confirmation === "rejected") {
      setShowRejectMsg(true);
    }
  }, []);

  const findSenderData = async () => {
    try {
      setLoading(true);
      const senderDetailsSnapshot = await database()
        .ref(`users/${sender.senderId}`)
        .once("value");
      setSenderData(senderDetailsSnapshot.val());
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch sender data ", error);
    }
  };

  const handleCall = () => {
    const phoneNumber = senderData.phone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.error("Phone number not available.");
    }
  };

  const handleConfirmation = async (userId, status) => {
    try {
      setRequestLoading(true);

      const lastDonatedTimestamp = user.lastDonated || 0;
      const threeMonthsAgo = Date.now() - 3 * 30 * 24 * 60 * 60 * 1000; // 3 months in milliseconds

      if (lastDonatedTimestamp >= threeMonthsAgo) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const daysCount = Math.ceil(
          (threeMonthsAgo - lastDonatedTimestamp) / millisecondsPerDay
        );
        setDaysUntilCanDonate(daysCount);
        setAlreadyDonated(true);
        return;
      }

      const fcmBackendToken = await AsyncStorage.getItem("fcmBackendToken");
      const tokenSnapshot = await database()
        .ref(`users/${userId}/fcmToken`)
        .once("value");
      const recipientToken = tokenSnapshot.val();

      if (!recipientToken || !fcmBackendToken) {
        throw new Error("Token not found");
      }

      const acceptMessage = {
        targetToken: recipientToken,
        title: "Blood Donation Request Accepted",
        body: `🎉 Your blood donation request has been accepted! ${user.name} is ready to support. Tap to coordinate further.`,
        senderId: `${user.userId}`,
        userId: `${userId}`,
        profileImage: `${user.profileImage}`,
        confirmation: "accepted",
      };

      const rejectMessage = {
        targetToken: recipientToken,
        title: "Blood Donation Request Rejected",
        body: `❌ Unfortunately, ${user.name} is unable to support your blood donation request at this time. Keep reaching out for help!`,
        senderId: `${user.userId}`,
        userId: `${userId}`,
        profileImage: `${user.profileImage}`,
        confirmation: "rejected",
      };

      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_FCM_SEND_URL}/sendNotification`,
        status ? acceptMessage : rejectMessage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${fcmBackendToken}`,
          },
        }
      );

      if (res.status !== 200) {
        throw new Error("FCM send service responded code: ", res.status);
      }

      await database().ref(`users/${user.userId}`).update({
        lastDonated: Date.now(),
      });
      setConfirmation(status ? "accepted" : "rejected");
    } catch (error) {
      ShowToast("error", "Request failed to send!");
      console.error("Error sending notification:", error);
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#e75f62" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: sender.profileImage }} style={styles.image} />
      {senderData && (
        <>
          <Text style={styles.name}>{senderData.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.greenLight} />
            <Text style={styles.subTitlte}>{senderData.location}</Text>
          </View>
          <Text style={styles.subTitile}>{senderData.department} Dept</Text>

          {requestLoading ? (
            <View style={styles.requestLoading}>
              <ActivityIndicator size="large" color="#e75f62" />
            </View>
          ) : alreadyDonated ? (
            <View style={styles.errorMsgContainer}>
              <Text style={styles.errorText}>
                You can donate blood again after {daysUntilCanDonate} days.
                Thank you for your willingness to donate and save lives!
              </Text>
            </View>
          ) : showCall ? (
            <TouchableOpacity
              onPress={() => handleCall()}
              style={{ width: "100%", alignItems: "center" }}
            >
              <View
                style={{
                  ...styles.confirmationContainer,
                  backgroundColor: "#5dbea3",
                }}
              >
                <Text style={styles.buttonText}>Call Now</Text>
              </View>
            </TouchableOpacity>
          ) : showRejectMsg ? (
            <View style={styles.errorMsgContainer}>
              <Text style={styles.errorText}>
                Unfortunately, {senderData.name} is unable to support your blood
                donation request at this time. Keep reaching out for help!
              </Text>
            </View>
          ) : confirmation === "accepted" ? (
            <View
              style={{
                ...styles.confirmationContainer,
                backgroundColor: "#5dbea3",
              }}
            >
              <Text style={styles.buttonText}>Accepted</Text>
            </View>
          ) : confirmation === "rejected" ? (
            <View style={styles.confirmationContainer}>
              <Text style={styles.buttonText}>Rejected</Text>
            </View>
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => handleConfirmation(sender.senderId, false)}
              >
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Reject</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleConfirmation(sender.userId, true)}
              >
                <View
                  style={{
                    ...styles.buttonContainer,
                    backgroundColor: "#5dbea3",
                  }}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "auto",
    bottom: "30%",
    width: "80%",
    height: "42%",
    padding: "20",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#e75f62",
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: 110,
    padding: 15,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e75f62",
    borderRadius: 10,
  },
  confirmationContainer: {
    width: "80%",
    padding: 15,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e75f62",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  greenLight: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "green",
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  requestLoading: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsgContainer: {
    width: "85%",
    padding: 15,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
});
