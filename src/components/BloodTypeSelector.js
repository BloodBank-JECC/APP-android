import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useApp } from "../services/AppContext";

export default function BloodTypeSlector() {
  const [type, setType] = useState(null);
  const { setBloodType } = useApp();
  const bloodTypes = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"];

  useEffect(() => {
    setBloodType(null);
  }, []);

  const handleData = (data) => {
    setType(data);
    setBloodType(data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bloodTypes}
        numColumns={4}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handleData(item)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
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
