import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import showToast from '../utils/tost';
import api from '../axios/axios';
import { setUser, setCoins, setReports } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);




  const handleSignUp = async () => {
 
    try {
      if (!email || !password || !confirmPass || !name ) {
      Toast.show({ type: 'error', text1: "Please fill all the fields" });
      return;
    }

      if (password !== confirmPass) {
      Toast.show({ type: 'error', text1: "Passwords not matched" });
      return;
    }
      setLoading(true);
      console.log(api)
      const res = await axios.post("https://waste-managment-y3tn.onrender.com/api/v1/user/signup", {
        name,
        email,
        password,
        referredBy
      });
      // console.log(res.data);

      if(res.data.success){
        Toast.show({ type: 'success', text1: res.data.message || "Signup Success" });
        navigation.replace("OtpScreen",{email});
      }else{
        Toast.show({ type: 'error', text1: res.data.message || "Signup failed. Please check your credentials." });
        return;
      }
       

    } catch (error) {
      console.log(error.message);
      Toast.show({ type: 'error', text1: error.response?.data?.message || "Something went wrong" });
    }finally {
  setLoading(false);  // ✅ Hamesha loading false ho jaye
}



  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Signup</Text>

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={!loading}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPwd}
            style={{ flex: 1, paddingVertical: 12, fontSize: 16 }}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
            {/* <Icon name={showPwd ? "eye" : "eye-off"} size={22} /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showPwd}
            style={{ flex: 1, paddingVertical: 12, fontSize: 16 }}
            value={confirmPass}
            onChangeText={setConfirmPass}
            editable={!loading}
          />

          <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
            {/* <Icon name={showPwd ? "eye" : "eye-off"} size={22} /> */}
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Referred Code (optional)"
          style={styles.input}
          value={referredBy}
          onChangeText={setReferredBy}
          editable={!loading}
        />

        <Text>
          if you already here ?{' '}
          <Text
            style={{ color: '#45B31E', cursor: 'pointer' }}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            handleSignUp();
          }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>
            {loading ? 'Sign-in...' : 'Signup'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#45B31E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#45B31E',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: '#DAFFCD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#308217',
    fontSize: 18,
    fontWeight: '600',
  },
});
