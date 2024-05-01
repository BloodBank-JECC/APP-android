import React from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";

const AboutApp = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("./../../assets/banner.png")}
        style={styles.image}
      />
      <Text style={styles.heading}>About Blood Bank App</Text>
      <Text style={styles.description}>
        Welcome to the Blood Bank App! An app designed exclusively for the
        students of Jyothi Engineering College to connect blood donors with
        recipients in need. Our mission is to make blood donation easier and
        more accessible for everyone.
      </Text>
      <Text style={styles.subHeading}>Features:</Text>
      <Text style={styles.feature}>
        - Search for blood donors in your college
      </Text>
      <Text style={styles.feature}>- Register as a blood donor</Text>
      <Text style={styles.feature}>- Request blood donation when in need</Text>
      <Text style={styles.feature}>
        - Get notified about donors in your reach
      </Text>
      <Text style={styles.feature}>- View your donation history</Text>
      <Text style={styles.subHeading}>Developers:</Text>
      <Text style={styles.feature}>Abhiram T K</Text>
      <Text style={styles.feature}>Abhishek P S</Text>
      <Text style={styles.feature}>Anakha A</Text>
      <Text style={styles.feature}>Fathimathul Thabshira P J</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  feature: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AboutApp;
