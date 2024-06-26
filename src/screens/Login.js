import { Fontisto, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import database from "@react-native-firebase/database";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../services/UserContext";
import ShowToast from "../components/Toast";

export default function Login() {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (email && phone && password) {
        const formattedPhone = phone.replace(/^0+|^\+91/g, "");
        const emailName = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
        const userId = emailName + formattedPhone;

        // Check if the userID exists
        const userDetailsSnapshot = await database()
          .ref(`users/${userId}`)
          .once("value");

        const userDetails = userDetailsSnapshot.val();
        if (userDetails && userDetails.password === password) {
          // Save userId in AsyncStorage -token
          await AsyncStorage.setItem("userId", userId);

          // Update the user's fcmToken for every login
          const fcmToken = await messaging().getToken();
          if (!fcmToken) throw new Error("fcmToken not found!");
          await database().ref(`users/${userId}`).update({
            fcmToken,
          });

          // Generate fcmBackendToken
          const fcmBackendRes = await axios.post(
            `${process.env.EXPO_PUBLIC_FCM_SEND_URL}/genToken`,
            {
              userId,
              username: userDetails.name,
              password: userDetails.password,
            }
          );

          if (fcmBackendRes.status !== 200) {
            throw new Error("fcmBackend genToken responded code: ", fcmBackendRes.code);
          }
          const fcmBackendToken = fcmBackendRes.data.token;
          await AsyncStorage.setItem("fcmBackendToken", fcmBackendToken);

          setUser(userDetails);
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          ShowToast("error", "Invalid email or password");
        }
      }
    } catch (error) {
      console.error("Login error:", error.message);
      ShowToast("error", "Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <Image
        source={require("../../assets/donation-banner.png")}
        style={styles.image}
      />
      <View style={styles.form}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subTitle}>Login to your existing account</Text>

        <View style={styles.textInputConatiner}>
          <Fontisto name="email" size={25} />
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>

        <View style={styles.textInputConatiner}>
          <Feather name="phone" size={25} />
          <TextInput
            value={phone}
            placeholder="Phone"
            onChangeText={setPhone}
            style={styles.textInput}
          />
        </View>

        <View style={styles.textInputConatiner}>
          <Feather name="lock" size={25} />
          <TextInput
            value={password}
            secureTextEntry
            placeholder="Password"
            onChangeText={setPassword}
            style={styles.textInput}
          />
        </View>

        <Text style={styles.forgotPassText}>Forgot password?</Text>

        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#e75f62"}
            style={styles.loading}
          />
        ) : (
          <TouchableOpacity onPress={handleLogin} style={{ width: "100%" }}>
            <View style={styles.buttonConatiner}>
              <Text style={styles.text}>Login</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontWeight: "600" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "80%",
    height: "30%",
  },
  form: {
    width: "90%",
    height: "auto",
    borderRadius: 20,
    padding: 35,
    backgroundColor: "#f7f1f1",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "200",
    color: "grey",
    marginBottom: 20,
  },
  textInputConatiner: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
  },
  textInput: {
    width: "100%",
    marginLeft: 10,
  },
  forgotPassText: {
    padding: 10,
    fontSize: 13,
    fontWeight: "400",
  },
  buttonConatiner: {
    width: "100%",
    padding: 15,
    marginTop: 20,
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
    marginTop: 20,
  },
});
