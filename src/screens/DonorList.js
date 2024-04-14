import {
  View,
  Text,
  Image,
  FlatList,
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
import { useApp } from "../services/AppContext";

export default function DonorList() {
  const { bloodType } = useApp();
  const { user } = useUser();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findDonor();
  }, [bloodType]);

  const findDonor = async () => {
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

  const handleRequest = () => {
    // request msg to be made
  };

  const renderDonorCard = ({ item, index }) => (
    <View style={styles.profileConatiner}>
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
      <TouchableOpacity
        onPress={() => handleRequest(item.userId)}
        style={{ marginLeft: "auto" }}
      >
        <View style={styles.requestConatiner}>
          <Text>Request</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
          data={donors}
          renderItem={renderDonorCard}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
