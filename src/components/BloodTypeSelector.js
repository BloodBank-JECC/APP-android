import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function BloodTypeSlector() {
  const [type, setType] = useState(null);
  const bloodTypes = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"];

  return (
    <FlatList
      data={bloodTypes}
      numColumns={4}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setType(item);
            }}
          >
            <View
              style={{
                ...styles.optionConatiner,
                backgroundColor: type === item ? "#e75f62" : "#fcfcfc",
              }}
            >
              <Text
                style={{
                  ...styles.text,
                  color: type === item ? "white" : "black",
                }}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  optionConatiner: {
    padding: 10,
    margin: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fcfcfc",
  },
  text: {
    fontSize: 20,
    marginVertical: 15,
    color: "#333",
  },
});
