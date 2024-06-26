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
import { useNavigation } from "@react-navigation/core";
import ImagePickerGallery from "../utils/ImagePickerGallery";
import { locations, departments } from "../utils/Constants";
import ShowToast from "../components/Toast";

export default function FillUserDetails({ route }) {
  const { signUpData } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [location, setLocation] = useState();
  const [department, setDepartment] = useState();
  const [gender, setGender] = useState("Male");
  const [profileImage, setProfileImage] = useState(null);

  const formattedDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleImagePicker = async () => {
    const imageUri = await ImagePickerGallery();
    setProfileImage(imageUri);
  };

  const handleSubmit = () => {
    if (
      name &&
      formattedDate(date) !== formattedDate(dayjs()) &&
      location &&
      location !== "Select Location" &&
      department !== "Select Department"
    ) {
      if (!profileImage) {
        ShowToast("error", "Please add a profile image");
        return;
      }

      const fillUserDetailsData = {
        ...signUpData,
        name: name,
        dob: formattedDate(date),
        location: location,
        department: department,
        gender: gender,
        profileImage: profileImage,
      };
      navigation.navigate("BloodType", { fillUserDetailsData });
    } else {
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete your details</Text>
      <TouchableOpacity onPress={handleImagePicker}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImg} />
        ) : (
          <Image
            source={require("../../assets/nouser.png")}
            style={styles.profileImg}
          />
        )}
      </TouchableOpacity>
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
              marginTop: -20,
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
        <Ionicons name="location-outline" size={25} />
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={{ width: "100%", marginLeft: -10 }}
        >
          {locations.map((option, index) => (
            <Picker.Item label={option} value={option} key={index.toString()} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="git-branch-outline" size={24} />
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          style={{ width: "100%", marginLeft: -10 }}
        >
          {departments.map((option, index) => (
            <Picker.Item label={option} value={option} key={index.toString()} />
          ))}
        </Picker>
      </View>

      <View style={{ marginVertical: 5, width: "100%" }}>
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
        onPress={handleSubmit}
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
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 30,
  },
  lottie: {
    width: "100%",
    height: "40%",
  },
  profileImg: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#e75f62",
  },
  inputContainer: {
    flexDirection: "row",
    height: 55,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    alignItems: "center",
  },
  input: {
    marginLeft: 12,
    width: "100%",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    top: "auto",
    bottom: "20%",
    height: "55%",
    width: "85%",
    padding: 10,
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
    marginTop: 10,
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
