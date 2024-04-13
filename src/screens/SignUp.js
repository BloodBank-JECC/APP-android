import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import database from "@react-native-firebase/database";
import ShowToast from "../components/Toast";

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyData = () => {
    if (!email && !phone) return false;

    // Verify email (jecc.ac.in only approved for now)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@jecc\.ac\.in$/;
    const isEmailValid = emailPattern.test(email);
    if (!isEmailValid) {
      ShowToast("error", "Please use email with the domain jecc.ac.in");
      return false;
    }

    // Verify phone
    const phonePattern = /^(?:\+?91)?[0-9]{10}$/;
    const isPhoneValid = phonePattern.test(phone);
    if (!isPhoneValid) {
      ShowToast("error", "Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!verifyData()) return;

    const formattedPhone = phone.replace(/^0+|^\+91/g, "");
    const userId = email.split("@")[0] + formattedPhone;

    setLoading(true);
    const userExistsSnapshot = await database()
      .ref(`users/${userId}`)
      .once("value");

    if (userExistsSnapshot.val()) {
      ShowToast("error", "User with this email and phone already exists");
      setLoading(false);
      return;
    }

    const signUpData = {
      email,
      phone: formattedPhone,
      userId,
    };
    navigation.navigate("OtpVerfiy", { signUpData });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/donation-banner.png")}
        style={styles.image}
      />
      <View style={styles.form}>
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.subTitle}>Create an account</Text>

        <View style={styles.textInputConatiner}>
          <Feather name="mail" size={25} />
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

        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#e75f62"}
            style={styles.loading}
          />
        ) : (
          <TouchableOpacity onPress={handleSubmit} style={{ width: "100%" }}>
            <View style={styles.buttonConatiner}>
              <Text style={styles.text}>Continue</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "600" }}>Login</Text>
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
  optionConatiner: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
  },
  radioConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
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
