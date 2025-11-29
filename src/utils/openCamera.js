
import { Platform } from "react-native";
import { PERMISSIONS, request, check, RESULTS } from "react-native-permissions";
import { launchCamera } from 'react-native-image-picker';


export const openCamera = async (setImages) => {
  let images = [];
  const allowed = await askCameraPermission();
    if (!allowed) {
      alert("Camera permission denied");
      return;
    }

  while (images.length < 3) {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      saveToPhotos: true,
    });

    if (result.didCancel) break;

    if (result.assets && result.assets[0]) {
      images.push(result.assets[0].uri);
    }
  }

  setImages(images);
};


const askCameraPermission = async () => {
  const permission =
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA;

  const status = await check(permission);

  // CASE 1: Already allowed → direct allow
  if (status === RESULTS.GRANTED) {
    return true;
  }

  // CASE 2: Permission not granted (first time, or user removed in settings)
  const result = await request(permission);

  return result === RESULTS.GRANTED;
};