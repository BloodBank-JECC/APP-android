import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { useNavigation } from "@react-navigation/core";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.conatiner}>
      <Header />
      <Banner />
      <TouchableOpacity onPress={() => navigation.navigate("FindDonor")}>
        <View style={styles.optionConatiner}>
          <Image
            source={require("../../assets/find-blood.png")}
            style={styles.optionImg}
          />
          <Text style={styles.optionText}>Find Blood</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  optionConatiner: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5D7DC",
    elevation: 1,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  optionImg: {
    width: 40,
    height: 40,
  },
  optionText: {
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 15,
  },
});
