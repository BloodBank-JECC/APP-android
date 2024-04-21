import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { locations, departments } from "../utils/Constants";

export default function DonorSort({ locationData, departmentData }) {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);
  const [location, setLocation] = useState(null);
  const [department, setDepartment] = useState(null);

  const handleLocationData = (data) => {
    setLocation(data);
    locationData(data);
  };

  const handleDepartmentData = (data) => {
    setDepartment(data);
    departmentData(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowLocationPicker(true)}>
        <View style={styles.option}>
          <Ionicons name="location-outline" size={18} />
          <Text>{location || "Select Location"}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={showLocationPicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.blurBackground} />
        <View style={styles.pickerConatiner}>
          <Picker
            selectedValue={location}
            style={{ width: "100%", backgroundColor: "white" }}
            onValueChange={(itemValue) => {
              handleLocationData(itemValue);
              setShowLocationPicker(false);
            }}
          >
            {locations.map((option, index) => (
              <Picker.Item
                label={option}
                value={option}
                key={index.toString()}
              />
            ))}
          </Picker>
          <TouchableOpacity onPress={() => setShowLocationPicker(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setShowDepartmentPicker(true)}>
        <View style={styles.option}>
          <Ionicons name="git-branch-outline" size={18} />
          <Text>{department || "Select Department"}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={showDepartmentPicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.blurBackground} />
        <View style={styles.pickerConatiner}>
          <Picker
            selectedValue={department}
            style={{ width: "100%", backgroundColor: "white" }}
            onValueChange={(itemValue) => {
              handleDepartmentData(itemValue);
              setShowDepartmentPicker(false);
            }}
          >
            {departments.map((option, index) => (
              <Picker.Item
                label={option}
                value={option}
                key={index.toString()}
              />
            ))}
          </Picker>
          <TouchableOpacity onPress={() => setShowDepartmentPicker(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 42,
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-around",
  },
  option: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pickerConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    position: "absolute",
    top: "auto",
    bottom: "40%",
    height: "15%",
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
  closeButton: {
    marginTop: 10,
    marginLeft: "auto",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
