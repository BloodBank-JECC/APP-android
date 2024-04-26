import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import ShowToast from "../components/Toast";

export default function SetPassword({ route }) {
  const { bloodTypeData } = route.params;
  const navigation = useNavigation();
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      ShowToast("error", "Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      ShowToast("error", "Password length should be minimum of 8");
      return;
    }

    const finalData = {
      ...bloodTypeData,
      password,
    };

    const profileImagePath = `profile_images/${finalData.userId}`;
    const imageRef = storage().ref(profileImagePath);

    try {
      setLoading(true);
      const response = await fetch(finalData.profileImage);
      const blob = await response.blob();
      await imageRef.put(blob);
      const profileImageUrl = await imageRef.getDownloadURL();
      await database()
        .ref(`users/${finalData.userId}`)
        .set({
          ...finalData,
          profileImage: profileImageUrl,
        });

      ShowToast("success", "Registration successful");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Registration error:", error.message);
      ShowToast("error", "Error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.conatiner}>
      <LottieView
        source={require("../../assets/lottie-otpVerify.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Set your password</Text>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} />
        <TextInput
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} />
        <TextInput
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholder="Confirm password"
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ width: "100%", alignItems: "center" }}
      >
        <View style={styles.buttonConatiner}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e75f62" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  lottie: {
    width: "100%",
    height: "40%",
  },
  title: {
    color: "#333",
    fontWeight: "600",
    fontSize: 28,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
  },
  input: {
    marginLeft: 10,
    width: "100%",
  },
  buttonConatiner: {
    width: "80%",
    padding: 15,
    marginTop: 20,
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
