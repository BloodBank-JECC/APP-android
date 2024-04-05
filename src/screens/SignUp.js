import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

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

        <TouchableOpacity
          onPress={() => navigation.navigate("OtpVerfiy")}
          style={{ width: "100%" }}
        >
          <View style={styles.buttonConatiner}>
            <Text style={styles.text}>Continue</Text>
          </View>
        </TouchableOpacity>

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
});
