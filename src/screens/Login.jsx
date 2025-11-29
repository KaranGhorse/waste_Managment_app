import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import showToast from '../utils/tost'
import api from '../axios/axios'
import {setUser,setCoins,setReports} from '../redux/userSlice'
import { saveToken } from "../services/service";
import axios from "axios";

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    // Implement login logic here
    // On successful login, navigate to HomeScreen
    try {
      if (!email || !password) {
      Toast.show({ type: 'error', text1: "Please fill all the fields" });
      return;
    }
      setLoading(true);
      const res = await api.post("/user/login", {
        email,
        password,
      });
      console.log(res.data.user);

      if(res.data.success){
        // Store token in AsyncStorage
        await saveToken(res.data.token)

        // Update Redux store
        dispatch(setUser(res.data.user));
        dispatch(setCoins(res.data.user.coins));
        dispatch(setReports(res.data.user.reports));

        Toast.show({ type: 'success', text1: res.data.message || "Login Successful" });
        // navigation.navigate("HomeScreen");
      }else{
        Toast.show({ type: 'error', text1: res.data.message || "Login failed. Please check your credentials." });
        return;
      }
       

    } catch (error) {
      console.log(error);
      Toast.show({ type: 'error', text1: error.response?.data?.message || "Something went wrong" });
    }finally {
  setLoading(false);  // ✅ Hamesha loading false ho jaye
}



  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

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

      <Text>If not have an account? <Text style={{color: "#45B31E",cursor: "pointer"}} onPress={() => navigation.navigate("Signup")}>Signup</Text></Text>

      <TouchableOpacity onPress={()=> {
        handleLogin();
      }} style={styles.btn}>
        <Text style={styles.btnText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#45B31E",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#45B31E",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#DAFFCD",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#308217",
    fontSize: 18,
    fontWeight: "600",
  },
});
