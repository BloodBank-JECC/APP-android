import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ShowToast from "../components/Toast";

const getFileSize = async (uri) => {
  const fileInfo = await FileSystem.getInfoAsync(uri);
  const fileSize = fileInfo.size / (1024 * 1024);
  return fileSize;
};

const ImagePickerGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Sorry, we need camera roll permissions to make this work!",
      [{ text: "OK" }]
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.2,
  });

  if (!result.canceled) {
    const fileSize = await getFileSize(result.assets[0].uri);
    if (fileSize > 2) {
      ShowToast(
        "error",
        "File size exceeds 2MB. Please choose a smaller image."
      );
    } else {
        return result.assets[0].uri;
    }
  }
};

export default ImagePickerGallery;
