import { useState } from "react";
import {
  View,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Feather, Ionicons, Fontisto } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

export default function FillUserDetails() {
  const [name, setName] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [location, setLocation] = useState(null);
  const [gender, setGender] = useState("Male");

  const locations = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];

  const formattedDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fill your info</Text>
      <Image
        source={require("../../assets/nouser.png")}
        style={styles.profileImg}
      />
      <View style={styles.inputContainer}>
        <Feather name="user" size={24} />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Name"
        />
      </View>

      <TouchableOpacity
        onPress={() => setShowDate(!showDate)}
        style={{ width: "100%", alignItems: "center" }}
      >
        <View style={styles.inputContainer}>
          <Fontisto name="date" size={24} />
          <Text style={styles.input}>
            {formattedDate(date) == formattedDate(dayjs())
              ? "Date Of Birth"
              : formattedDate(date)}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDate}
        onRequestClose={() => {
          setShowDate(!showDate);
        }}
        style={styles.dateModal}
      >
        <View style={styles.blurBackground} />

        <View style={styles.datePicker}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => setDate(params.date)}
            selectedItemColor="#e75f62"
          />

          <TouchableOpacity
            onPress={() => setShowDate(!showDate)}
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: -30,
              marginBottom: 20,
            }}
          >
            <View style={styles.buttonConatiner}>
              <Text style={styles.buttonText}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={28} />
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={{ width: "95%" }}
        >
          {locations.map((option) => (
            <Picker.Item label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={{ marginVertical: 10, width: "100%" }}>
        <View style={styles.radioButtonAlignment}>
          <View style={styles.filterOptionConatiner}>
            <RadioButton
              value="first"
              status={gender === "Male" ? "checked" : "unchecked"}
              onPress={() => setGender("Male")}
              color="#e75f62"
            />
            <Text style={styles.radioButtonText}>Male</Text>
          </View>
          <View style={styles.filterOptionConatiner}>
            <RadioButton
              value="second"
              status={gender === "Female" ? "checked" : "unchecked"}
              onPress={() => setGender("Female")}
              color="#e75f62"
            />
            <Text style={styles.radioButtonText}>Female</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("OtpVerfiy")}
        style={{ width: "100%", alignItems: "center" }}
      >
        <View style={styles.buttonConatiner}>
          <Text style={styles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 40,
    marginLeft: 20,
  },
  lottie: {
    width: "100%",
    height: "40%",
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#e75f62",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    marginLeft: 10,
    width: "100%",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    top: "20%",
    height: "50%",
    width: "85%",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonConatiner: {
    width: "80%",
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e75f62",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  radioButtonText: {
    fontSize: 18,
    fontWeight: "500",
  },
  radioConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 13,
    fontWeight: "400",
  },
  radioButtonAlignment: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 15,
  },
  filterOptionConatiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
