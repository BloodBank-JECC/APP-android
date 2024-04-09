import Toast from "react-native-toast-message";

export default function ShowToast(msgType, message) {
  Toast.show({
    type: msgType,
    text1: message,
    visibilityTime: 3000,
    autoHide: true,
  });
}
