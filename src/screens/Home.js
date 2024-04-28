import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { useNavigation } from "@react-navigation/core";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = TestIds.ADAPTIVE_BANNER;

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.conatiner}>
      <Header />
      <Banner />
      <View style={styles.optionsContainer}>
        <View style={{ width: "50%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contact")}
            style={{ width: "90%", height: "30%", marginBottom: "10%"}}
          >
            <View style={styles.contactConatiner}>
              <Image
                source={require("../../assets/contact.png")}
                style={styles.contactImg}
              />
              <Text style={styles.optionText}>Contact</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.aboutContainer}>
            <Image
              source={require("../../assets/about.png")}
              style={styles.aboutImg}
            />
            <Text style={styles.optionText}>About</Text>
          </View>
        </View>

        <View style={{ width: "50%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("FindDonor")}>
            <View style={styles.findBloodConatiner}>
              <Image
                source={require("../../assets/find-blood.png")}
                style={styles.bloodImg}
              />
              <Text style={styles.optionText}>Find Blood</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  contactImg: {
    width: 60,
    height: 60,
  },
  aboutImg: {
    width: 60,
    height: 60,
  },
  bloodImg: {
    width: 120,
    height: 120,
  },
  optionText: {
    fontWeight: "600",
    fontSize: 22,
    marginLeft: 0,
    color: "white",
  },
  aboutContainer: {
    width: "90%",
    height: "30%",
    backgroundColor: "#e75f62",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  contactConatiner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e75f62",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  findBloodConatiner: {
    marginTop: "0%",
    width: "100%",
    height: "80%",
    backgroundColor: "#e75f62",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
