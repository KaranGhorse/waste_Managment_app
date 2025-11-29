import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Icon name="arrow-back" size={24} /> */}
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>

      {/* Old Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Old Password</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry={!showOld}
            value={oldPass}
            onChangeText={setOldPass}
          />
          <TouchableOpacity onPress={() => setShowOld(!showOld)}>
            {/* <Icon
              name={showOld ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#7f7f7f"
            /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNew}
            value={newPass}
            onChangeText={setNewPass}
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            {/* <Icon
              name={showNew ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#7f7f7f"
            /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirm}
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            {/* <Icon
              name={showConfirm ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#7f7f7f"
            /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 15,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },

  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#7f7f7f",
    marginBottom: 7,
  },

  inputBox: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: {
    flex: 1,
    fontSize: 15,
  },

  saveBtn: {
    backgroundColor: "#64A66B",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
