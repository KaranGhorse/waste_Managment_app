import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import { setUser } from "../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../axios/axios";

const OtpScreen = ({navigation}) => {
  const route = useRoute();
  const { email } = route.params || "";
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch()


  const handleChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = async (index, event) => {
    const pastedText = await Clipboard.getString();
    const pastedArray = pastedText.split("");

    let newOtp = [...otp];
    pastedArray.forEach((char, i) => {
      if (index + i < length) {
        newOtp[index + i] = char;
      }
    });

    setOtp(newOtp);

    const nextIndex = Math.min(index + pastedArray.length, length - 1);
    inputRefs.current[nextIndex].focus();
  };

  const handleVerify = () => {
    return otp.join("");
    
  };


  const handleVerifyOtp = async()=>{
    const newOtp = handleVerify()
    console.log("oooottttpppp",newOtp);
    Toast.show({ type: 'error', text1: newOtp });
    if (!newOtp.length === 6) {
      Toast.show({ type: 'error', text1: res.data.message || "OTP mustr be 6 length ." });
      return 
    }
    try {
      const res = await api.post('/api/v1/user/verify/otp', {otp:newOtp,email});

      if(res.data.success){
        dispatch(setUser(res.data.user));
        await AsyncStorage.setItem("token", res.data.token);
        navigation.navigate('HomeScreen')
      }
    } catch (error) {
      console.log(error)
      Toast.show({ type: 'error', text1: res.data.message || "OTP not matched or something else" });
    }

  }


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Enter OTP</Text>

        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(val) => handleChange(val.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onPaste={(e) => handlePaste(index, e)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: 45,
    height: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#2D7CFF",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
