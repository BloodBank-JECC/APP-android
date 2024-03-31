import { View, Text, Image, StyleSheet } from "react-native";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate blood</Text>
      <Text style={styles.title}>Save life</Text>
      <Image
        source={require("../../assets/donation-banner.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#e75f62",
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "600",
  },
  image: {
    width: 150,
    height: 180,
    position: "absolute",
    zIndex: -1,
    right: 10,
    top: 40,
  },
});
