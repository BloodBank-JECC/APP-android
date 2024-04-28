import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../services/UserContext";

export default function Profile() {
  const { user } = useUser();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const formatedDate = () => {
    if (!user.lastDonated) {
      return "Never";
    }
    const date = new Date(user.lastDonated);
    return date.toLocaleDateString();
  }

  const daysLeft = () => {
    if (!user.lastDonated) {
      return 0;
    }
    const lastDonatedTimestamp = user.lastDonated;
    const threeMonthsAgo = Date.now() - 3 * 30 * 24 * 60 * 60 * 1000; // 3 months in milliseconds
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const daysCount = Math.ceil(
      (threeMonthsAgo - lastDonatedTimestamp) / millisecondsPerDay
    );
    return daysCount;
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", width: "100%", marginHorizontal: "5%" }}
      >
        <View>
          <FastImage
            source={{ uri: user.profileImage }}
            defaultSource={require("./../../assets/nouser.png")}
            style={styles.profileImage}
          />
          <View style={styles.bloodGroupView}>
            <Text style={{ color: "white", fontSize: 24 }}>
              {user.bloodType}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: "5%", marginTop: "5%" }}>
          <Text style={styles.title}>{user.name}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <View style={styles.greenLight} />
            <Text style={{ color: "gray", fontSize: 20 }}>{user.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionsSubContainer}>
          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={styles.optionTitle}>Total donations</Text>
            <Text style={styles.optionValue}>{user.totalDonations || 0}</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={{ marginLeft: 5, justifyContent: "space-evenly" }}>
            <Text style={styles.optionTitle}>Last Donated</Text>
            <Text style={styles.optionValue}>{formatedDate()}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={{ fontSize: 35, color: "white", fontWeight: "500" }}>
            {daysLeft()}
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}>days</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{ width: "50%", alignSelf: "center" }}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
    padding: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "red",
    marginBottom: -1,
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "500",
    color: "red",
  },
  greenLight: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "green",
    marginRight: 5,
  },
  bloodGroupView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    width: 50,
    height: 40,
    marginTop: -20,
  },
  optionsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: "10%",
  },
  optionsSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    height: "80%",
    borderRadius: 10,
    borderColor: "gray",
    marginBottom: 40,
    padding: 10,
    alignItems: "column",
    backgroundColor: "white",
    zIndex: -1,
  },
  optionTitle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "400",
  },
  optionValue: {
    color: "red",
    fontWeight: "600",
    fontSize: 15,
    alignSelf: "center",
  },
  separator: {
    marginHorizontal: 10,
    height: "100%",
    borderWidth: 1,
    borderColor: "gray",
  },
  detailContainer: {
    width: 100,
    height: 100,
    marginLeft: "-10%",
    marginTop: -10,
    backgroundColor: "red",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#e75f62",
    padding: 12,
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
