import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useUser } from "../services/UserContext";
import { useEffect, useState } from "react";
import database, {
  query,
  orderByChild,
  startAt,
  endAt,
  onValue,
} from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useApp } from "../services/AppContext";
import ShowToast from "../components/Toast";
import DonorSort from "../components/DonorSort";
import RewardAd from "../services/RewardAd";

export default function DonorList() {
  const { bloodType } = useApp();
  const { user } = useUser();
  const [donors, setDonors] = useState([]);
  const [requestedDonors, setRequestedDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    findDonor();
    loadPreviousReq();
  }, [bloodType, locationFilter, departmentFilter]);

  useEffect(() => {
    saveRequests();
  }, [requestedDonors]);

  const saveRequests = async () => {
    await AsyncStorage.setItem(
      "requestedDonors",
      JSON.stringify(requestedDonors)
    );
  };

  const loadPreviousReq = async () => {
    await AsyncStorage.getItem("requestedDonors").then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        setRequestedDonors(parsedData);
      }
    });
  };

  const handleLocationData = (data) => {
    if (data === "Select Location") {
      setLocationFilter("");
    } else {
      setLocationFilter(data);
    }
  };

  const handleDepartmentData = (data) => {
    if (data === "Select Department") {
      setDepartmentFilter("");
    } else {
      setDepartmentFilter(data);
    }
  };

  const filterDonors = (donors) => {
    let filteredDonors = donors.filter((donor) => {
      if (donor.userId === user.userId) {
        return false;
      }
      // Check if the donor has donated in the last 3 months
      const lastDonatedTimestamp = donor.lastDonated || 0;
      const threeMonthsAgo = Date.now() - 3 * 30 * 24 * 60 * 60 * 1000; // 3 months in milliseconds
      return lastDonatedTimestamp < threeMonthsAgo;
    });

    if (locationFilter) {
      filteredDonors = filteredDonors.filter(
        (donor) => donor.location === locationFilter
      );
    }
    if (departmentFilter) {
      filteredDonors = filteredDonors.filter(
        (donor) => donor.department === departmentFilter
      );
    }
    return filteredDonors;
  };

  const findDonor = async () => {
    setLoading(true);
    const usersRef = database().ref("users/");

    const usersQuery = query(
      usersRef,
      orderByChild("bloodType"),
      startAt(bloodType),
      endAt(`${bloodType}\uf8ff`)
    );

    const handleData = async (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersArray = Object.values(usersData);
        for (const user of usersArray) {
          user.requestLoading = false;
        }
        setDonors(usersArray);
      } else {
        setDonors([]);
      }
      setLoading(false);
    };

    const usersRefListener = onValue(usersQuery, handleData);
    return () => {
      usersRefListener();
    };
  };

  const handleWatchAd = () => {
    setShowAd(true);
  };
  
  const handleRewardEarned = async (amount) => {
    setShowAd(false);
    if (amount === 10) {
      await AsyncStorage.setItem("reqCount", (5).toString());
    }
  };

  const showDailyLimitAlert = () => {
    Alert.alert(
      'Request Limit Reached',
      'Your request limit is reached. Would you like to watch an ad to get more requests?',
      [
        {
          text: 'Close',
          style: 'cancel',
        },
        {
          text: 'Watch Ad',
          onPress: () => handleWatchAd(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleRequest = async (userId, item) => {
    try {
      if (item.requestLoading) {
        return;
      }
      item.requestLoading = true;
      setRequestLoading(true);

      let currCount = Number(await AsyncStorage.getItem("reqCount"));
      if (currCount >= 5) {
        ShowToast("error", "Daily limit reached. Try again tomorrow.");
        showDailyLimitAlert();
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

      const message = {
        targetToken: recipientToken,
        title: "Blood Donation Request",
        body: `🚨 Urgent: ${user.name} seeks your support. Tap to help save a life.`,
        senderId: `${user.userId}`,
        userId: `${userId}`,
        profileImage: `${user.profileImage}`,
        confirmation: "",
      };

      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_FCM_SEND_URL}/sendNotification`,
        message,
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

      setRequestedDonors((prevDonors) => [...prevDonors, item.userId]);
      await AsyncStorage.setItem("reqCount", (++currCount).toString());
      ShowToast("success", `Request sent successfully (${currCount}/5)`);
    } catch (error) {
      ShowToast("error", "Request failed to send!");
      console.error("Error sending notification:", error);
    } finally {
      item.requestLoading = false;
      setRequestLoading(false);
    }
  };

  const renderDonorCard = ({ item, index }) => (
    <View style={styles.profileConatiner}>
      {showAd && <RewardAd onRewardEarned={handleRewardEarned} />}
      <Image
        source={{ uri: item.profileImage || "./../../assets/nouser.png" }}
        style={styles.profileImage}
      />
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.profileNameText}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.profileSubText}>{item.bloodType}</Text>
          <Text style={styles.profileSubText}>{item.location}</Text>
        </View>
      </View>
      {requestedDonors.includes(item.userId) ? (
        <View style={styles.requestConatiner}>
          <Text>Requested</Text>
        </View>
      ) : item.requestLoading ? (
        <ActivityIndicator
          size={"small"}
          color={"#e75f62"}
          style={{ marginLeft: "auto", marginRight: 10 }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => handleRequest(item.userId, item)}
          style={{ marginLeft: "auto" }}
        >
          <View style={styles.requestConatiner}>
            <Text>Request</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <DonorSort
        locationData={(data) => handleLocationData(data)}
        departmentData={(data) => handleDepartmentData(data)}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"#e75f62"} />
        </View>
      ) : donors.length === 0 ? (
        <View style={styles.windowMsgContainer}>
          <Text style={styles.windowMsgText}>
            No {bloodType} blood donor found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filterDonors(donors)}
          renderItem={renderDonorCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingRight: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingRight: -10,
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
  profileConatiner: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#fcfcfc",
    borderRadius: 10,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  profileNameText: {
    fontSize: 20,
    fontWeight: "400",
  },
  profileSubText: {
    marginRight: 10,
    fontSize: 14,
    color: "grey",
  },
  requestConatiner: {
    marginLeft: "auto",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
