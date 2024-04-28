import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useUser } from "../services/UserContext";
import ShowToast from "../components/Toast";

export default function Contact() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const contactFormData = {
      name: user.name,
      email: user.email,
      message: message,
    };

    try {
      setLoading(true);
      const fcmBackendToken = await AsyncStorage.getItem("fcmBackendToken");
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_FCM_SEND_URL}/sendContactForm`,
        contactFormData,
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
      ShowToast("success", "Your response submitted successfully!");
      setMessage("");
    } catch (error) {
      console.error("Email failed to send:", error);
      ShowToast("error", "Failed to sumbmit your response!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/banner.png")}
        style={styles.image}
      />
      <Text style={styles.title}>GET IN TOUCH</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Feather name="user" size={24} styles={styles.icon} />
          <TextInput
            value={user.name}
            editable={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={24} styles={styles.icon} />
          <TextInput
            value={user.email}
            editable={false}
            style={styles.textInput}
          />
        </View>
        <TextInput
          placeholder="Your Message"
          onChangeText={setMessage}
          style={styles.messageInput}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e75f62" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-10%",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  formContainer: {
    width: "90%",
  },
  icon: {
    marginRight: 30,
  },
  inputContainer: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  textInput: {
    marginLeft: 10,
    fontSize: 18,
  },
  messageInput: {
    height: 150,
    width: "100%",
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
    textAlignVertical: "top",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
  },
  buttonContainer: {
    width: "90%",
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#e75f62",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
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
