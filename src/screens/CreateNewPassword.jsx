import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'; // eye icon
import { SafeAreaView } from "react-native-safe-area-context";

const CreateNewPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
const [isPressed, setIsPressed] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        {/* <Icon name="arrow-left" size={24} color="#000" /> */}
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Create a{'\n'}New Password</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Enter your new password</Text>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPass}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          {/* <Icon name={showPass ? 'eye' : 'eye-off'} size={20} color="#666" /> */}
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Confirm New Password"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirmPass}
          style={styles.input}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
          {/* <Icon
            name={showConfirmPass ? 'eye' : 'eye-off'}
            size={20}
            color="#666"
          /> */}
        </TouchableOpacity>
      </View>

      {/* Button */}
      <Pressable
        activeOpacity={1}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[
          styles.button,
          { backgroundColor: isPressed ? '#5AA85A' : '#6EBF6E' }, // darker on press
        ]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 60,
  },

  backBtn: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 5,
    lineHeight: 34,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

 button: {
  backgroundColor: "#6EBF6E",
  paddingVertical: 15,
  borderRadius: 30,
  marginTop: 10,
  alignItems: "center",
  justifyContent: "center",
},

buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},
});
