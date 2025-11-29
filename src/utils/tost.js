import { ToastAndroid, Platform } from 'react-native';

 const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT); // SHORT ya LONG
  } else {
    alert(message); // iOS ke liye simple alert
  }
};

export default showToast;