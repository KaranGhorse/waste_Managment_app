import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";

const wasteOptions = ["Plastic", "Metal", "Glass", "Paper"];

const WastePopup = ({ visible, images, address, onClose, onSubmit }) => {
    console.log(address);
    
  const [localAddress, setLocalAddress] = useState(address || "");
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          {/* 1️⃣ IMAGES BOX */}
          <View style={styles.imageRow}>
            {images?.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.img} />
            ))}
          </View>

          {/* 2️⃣ INPUT FIELDS */}
          <TextInput
            placeholder="Address"
            value={localAddress}
            onChangeText={setLocalAddress}
            style={styles.input}
          />

          {/* Waste Type Dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownOpen(true)}
          >
            <Text style={{ color: "#555" }}>
              Waste Type: {wasteType || "Select"} ▼
            </Text>
          </TouchableOpacity>

          {/* Dropdown Modal */}
          <Modal transparent visible={dropdownOpen} animationType="fade">
            <TouchableOpacity
              style={styles.fullOverlay}
              activeOpacity={1}
              onPress={() => setDropdownOpen(false)}
            >
              <View style={styles.dropdownBox}>
                <FlatList
                  data={wasteOptions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => {
                        setWasteType(item);
                        setDropdownOpen(false);
                      }}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <TextInput
            placeholder="Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            style={styles.input}
          />

          <TextInput
            placeholder="Notes"
            value={note}
            onChangeText={setNote}
            style={[styles.input, { height: 70 }]}
            multiline
          />

          {/* BUTTONS */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, { backgroundColor: "#ddd" }]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSubmit({ localAddress, wasteType, weight, note })}
              style={[styles.btn, { backgroundColor: "green" }]}
            >
              <Text style={{ color: "#fff" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WastePopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 10,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  popinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#333",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  fullOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownBox: {
    width: "70%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 5,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
});
