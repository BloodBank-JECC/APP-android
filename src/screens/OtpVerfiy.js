import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function OtpVerfiy() {
  const navigation = useNavigation();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOnChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    const completeOtp = newOtp.join("");
    console.log("Complete OTP:", completeOtp);
  };

  const handleOnKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOnFocus = (index) => {
    if (!otp[index]) {
      inputRefs.current[index].focus();
    }
  };

  return (
    <View style={styles.conatiner}>
      <LottieView
        source={require("../../assets/lottie-otpVerify.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subTitle}>
        Otp has been sent to your mobile number
      </Text>
      <Text style={styles.subTitle}>******7898</Text>

      <View style={styles.otpInputContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={{
              ...styles.input,
              backgroundColor: otp[index] ? "#e75f62" : "#FFDCE0",
            }}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChangeText={(text) => handleOnChange(text, index)}
            onKeyPress={(e) => handleOnKeyPress(e, index)}
            onFocus={() => handleOnFocus(index)}
            value={otp[index]}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text>Dont recieve otp? </Text>
        <Text style={{ fontWeight: "600" }}>RESEND OTP</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("FillUserDetails")}
        style={{ width: "100%", alignItems: 'center' }}
      >
        <View style={styles.buttonConatiner}>
          <Text style={styles.buttonText}>Verify</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  lottie: {
    width: "100%",
    height: "40%",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  subTitle: {},
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 40,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    backgroundColor: "#FFDCE0",
  },
  buttonConatiner: {
    width: "80%",
    padding: 15,
    marginTop: 50,
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
});
