import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "../services/UserContext";

export default function Header() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Hello, {user.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.greenLight} />
          <Text style={styles.locationText}>{user.location}</Text>
        </View>
      </View>
      <FontAwesome name="bell" size={25} style={styles.icon} />
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 18,
  }
});
