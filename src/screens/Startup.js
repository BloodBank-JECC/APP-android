import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/core";

export default function Startup() {
  const navigation = useNavigation();

  return (
    <View style={styles.conatiner}>
      <LottieView
        source={require("../../assets/lottie-initial.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.buttonConatiner}>
          <Text style={styles.text}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  lottie: {
    width: "90%",
    aspectRatio: 1,
  },
  buttonConatiner: {
    width: "90%",
    padding: 15,
    marginTop: 50,
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
