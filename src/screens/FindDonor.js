import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BloodTypeSlector from "../components/BloodTypeSelector";
import FilterOptions from "../components/FilterOptions";
import DonorList from "./DonorList";
import { useApp } from "../services/AppContext";

export default function FindDonor() {
  const navigation = useNavigation();
  const { bloodType } = useApp();

  return (
    <View style={styles.container}>
      <BloodTypeSlector />
      <FilterOptions />

      <View style={styles.donorListHeader}>
        <Text style={styles.title}>Available Donor</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonorList")}
          style={{ marginLeft: "auto" }}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {bloodType && <DonorList />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
  },
  donorListHeader: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "baseline",
  },
  viewAllText: {
    marginLeft: "auto",
    fontSize: 15,
  },
});
