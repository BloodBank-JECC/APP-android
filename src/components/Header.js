import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome6 } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { useUser } from "../services/UserContext";

export default function Header() {
  const navigation = useNavigation();
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>{user.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.greenLight} />
          <Text style={styles.locationText}>{user.location}</Text>
        </View>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <FontAwesome6 name="bell" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FastImage
            source={{ uri: user.profileImage }}
            defaultSource={require("./../../assets/nouser.png")}
            style={styles.profileImage}
          />
          </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 18,
  },
});
