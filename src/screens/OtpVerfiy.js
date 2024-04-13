import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import ShowToast from "../components/Toast";

export default function OtpVerfiy({ route }) {
  const navigation = useNavigation();
  const { signUpData } = route.params;
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [code, setCode] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //signInwithPhoneNumber();
    navigation.replace("FillUserDetails", {  signUpData });
  }, []);

  const signInwithPhoneNumber = async () => {
    try {
      await auth()
        .signInWithPhoneNumber(`+91${signUpData.phone}`)
        .then((confirmation) => {
          setConfirm(confirmation);
          ShowToast("success", "OTP sent successfully.");
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (e) {
      console.error(e.message);
      ShowToast("error", "Failed to send otp.");
    }
  };

  const confirmCode = async () => {
    try {
      setLoading(true);
      await confirm.confirm(code);
      navigation.replace("FillUserDetails");
    } catch (error) {
      ShowToast("error", "Invalid code.");
      console.error(error);
    }
  };

  const handleOnChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    const completeOtp = newOtp.join("");
    setCode(completeOtp);
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
      <Text style={styles.subTitle}>******{signUpData.phone.slice(-4)}</Text>

      <View style={styles.otpInputContainer}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
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

      {loading ? (
        <ActivityIndicator
          color="#e75f62"
          size="large"
          style={{ marginTop: 50 }}
        />
      ) : (
        <TouchableOpacity
          onPress={confirmCode}
          style={{ width: "100%", alignItems: "center" }}
        >
          <View style={styles.buttonConatiner}>
            <Text style={styles.buttonText}>Verify</Text>
          </View>
        </TouchableOpacity>
      )}
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
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
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
