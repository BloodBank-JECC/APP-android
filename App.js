import { StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import FindDonor from "./src/screens/FindDonor";
import Startup from "./src/screens/Startup";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import BloodType from "./src/screens/BloodType";
import OtpVerfiy from "./src/screens/OtpVerfiy";
import FillUserDetails from "./src/screens/FillUserDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Startup">
          <Stack.Screen
            name="Startup"
            component={Startup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OtpVerfiy"
            component={OtpVerfiy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FillUserDetails"
            component={FillUserDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BloodType"
            component={BloodType}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FindDonor"
            component={FindDonor}
            options={{ title: "Pick your blood group" }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
