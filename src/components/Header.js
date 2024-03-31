import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Hello, Amal</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.greenLight} />
          <Text style={styles.locationText}>Thrissur</Text>
        </View>
      </View>
      <FontAwesome name="bell" size={25} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 30,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "500",
  },
  locationText: {
    fontSize: 20,
    color: "grey",
    fontWeight: "400",
  },
  greenLight: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "green",
    marginRight: 5,
  },
  icon: {
    marginLeft: "auto",
  },
});
