import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (e) {
    console.log("Error reading token:", e);
    return null;
  }
};

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.log("Error saving token:", e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log("Error removing token:", e);
  }
};
