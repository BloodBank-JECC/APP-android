import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import LottieView from "lottie-react-native";
import BloodTypeSlector from "../components/BloodTypeSelector";

export default function BloodType() {
  const [checked, setChecked] = useState("first");

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lottie-bloodType.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text style={styles.title}>Pick your blood type</Text>
      <BloodTypeSlector />

      <View style={{ marginVertical: 30 }}>
        <Text style={styles.title}>Are you willing to donate blood?</Text>
        <View style={styles.radioButtonAlignment}>
          <View style={styles.filterOptionConatiner}>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
              color="#e75f62"
            />
            <Text style={styles.radioButtonText}>Yes</Text>
          </View>
          <View style={styles.filterOptionConatiner}>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
              color="#e75f62"
            />
            <Text style={styles.radioButtonText}>Maybe</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("BloodType")}
        style={{ width: "100%" }}
      >
        <View style={styles.buttonConatiner}>
          <Text style={styles.saveButtonText}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  lottie: {
    width: "100%",
    height: "30%",
    marginVertical: -30,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  buttonConatiner: {
    width: "80%",
    padding: 15,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e75f62",
    borderRadius: 10,
  },
  radioButtonText: {
    fontSize: 18,
    fontWeight: "500",
  },
  radioConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 13,
    fontWeight: "400",
  },
  radioButtonAlignment: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 15,
  },
  filterOptionConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});
