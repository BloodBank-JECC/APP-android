import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../services/UserContext";

export default function Startup() {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedInStatus();
    reset();
  }, []);

  const reset = async () => {
    const currDate = new Date().toDateString();
    const lastResetDate = await AsyncStorage.getItem("lastResetDate");
    if (lastResetDate !== currDate) {
      await AsyncStorage.setItem("lastResetDate", currDate);
      await AsyncStorage.removeItem("requestedDonors");
      await AsyncStorage.setItem("reqCount", (0).toString());
    }
  };

  const checkLoggedInStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const userDetailsSnapshot = await database()
          .ref(`users/${userId}`)
          .once("value");
        const userDetails = userDetailsSnapshot.val();

        if (userDetails) {
          setUser(userDetails);
          navigation.replace("Home");
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.conatiner}>
      <LottieView
        source={require("../../assets/lottie-initial.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={"#e75f62"}
          style={styles.loading}
        />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.buttonConatiner}>
            <Text style={styles.text}>Let's Go</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  lottie: {
    width: "90%",
    aspectRatio: 1,
  },
  buttonConatiner: {
    width: "90%",
    padding: 15,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e75f62",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  loading: {
    marginTop: 50,
  },
});
