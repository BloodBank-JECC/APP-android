import {
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../services/UserContext";
import { quotes } from "../utils/Constants";

export default function Startup() {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchQuote();
    reset();
    checkLoggedInStatus();
  }, []);

  const fetchQuote = async () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

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
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error checking login status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.conatiner}>
      <StatusBar backgroundColor={"#e75f62"} barStyle="light-content" />
      <Image
        source={require("./../../assets/banner-white.png")}
        style={styles.banner}
      />
      <Text numberOfLines={2} style={styles.quote}>"{quote}"</Text>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={"white"}
          style={styles.loading}
        />
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
    backgroundColor: "#e75f62",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 5,
  },
  quote: {
    fontSize: 22,
    color: "white",
    fontStyle: 'italic',
    textAlign: "center",
  },
  loading: {
    marginTop: "30%",
  },
});
