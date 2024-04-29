import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
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
    quality: 1,
  });

  if (!result.canceled) {
    const compressedUri = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 300, height: 300 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    const fileSize = await getFileSize(compressedUri.uri);
    if (fileSize > 1) {
      ShowToast(
        "error",
        "File size exceeds 1MB. Please choose a smaller image."
      );
    } else {
        return compressedUri.uri;
    }
  }
};

export default ImagePickerGallery;