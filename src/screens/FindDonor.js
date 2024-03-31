import { View, Text, Image, StyleSheet } from "react-native";
import BloodTypeSlector from "../components/BloodTypeSelector";
import FilterOptions from "../components/FilterOptions";

export default function FindDonor() {
  return (
    <View style={styles.container}>
      <BloodTypeSlector />
      <FilterOptions />

      <Text style={styles.title}>Available Donor</Text>
      <View style={styles.profileConatiner}>
        <Image source={require("../../assets/anya.png")} style={styles.profileImage} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.profileNameText}>Anya</Text>
          <Text style={styles.profileLocationText}>From East</Text>
        </View>
        <View style={styles.bookNowConatiner}>
            <Text style={styles.bookNowtext}>Book Now</Text>
        </View>
      </View>

      <View style={styles.profileConatiner}>
        <Image source={require("../../assets/anya.png")} style={styles.profileImage} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.profileNameText}>Anya</Text>
          <Text style={styles.profileLocationText}>From East</Text>
        </View>
        <View style={styles.bookNowConatiner}>
            <Text style={styles.bookNowtext}>Book Now</Text>
        </View>
      </View>

      <View style={styles.profileConatiner}>
        <Image source={require("../../assets/anya.png")} style={styles.profileImage} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.profileNameText}>Anya</Text>
          <Text style={styles.profileLocationText}>From East</Text>
        </View>
        <View style={styles.bookNowConatiner}>
            <Text style={styles.bookNowtext}>Book Now</Text>
        </View>
      </View>

      <View style={styles.profileConatiner}>
        <Image source={require("../../assets/anya.png")} style={styles.profileImage} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.profileNameText}>Anya</Text>
          <Text style={styles.profileLocationText}>From East</Text>
        </View>
        <View style={styles.bookNowConatiner}>
            <Text style={styles.bookNowtext}>Book Now</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    marginTop: 15,
    fontSize: 18,
  },
  profileConatiner: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  profileNameText: {
    fontSize: 20,
    fontWeight: '400',
  },
  profileLocationText: {
    fontSize: 14,
    color: 'grey',
  },
  bookNowConatiner: {
    marginLeft: 'auto',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  }
});
