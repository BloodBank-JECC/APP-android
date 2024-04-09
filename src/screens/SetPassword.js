import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function SetPassword() {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholder="Confirm password"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("BloodType")}
        style={{ width: "100%", alignItems: "center" }}
      >
        <View style={styles.buttonConatiner}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
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
    fontWeight: '600',
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
});
