import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";

export default function FilterOptions() {
  const [checked, setChecked] = useState("first");

  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>Select what you need</Text>
      <View style={styles.filterConatiner}>
        <View style={styles.filterOptionConatiner}>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
            color="#e75f62"
          />
          <Text style={styles.text}>Now</Text>
        </View>
        <View style={styles.filterOptionConatiner}>
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
            color="#e75f62"
          />
          <Text style={styles.text}>Book Later</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
  },
  filterConatiner: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  filterOptionConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
  },
});
