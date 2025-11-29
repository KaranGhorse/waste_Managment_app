import { Alert, PermissionsAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Geolocation from "react-native-geolocation-service";

import Feather from "react-native-vector-icons/Feather";
import Font6 from "react-native-vector-icons/FontAwesome6";
import Icon2 from "react-native-vector-icons/FontAwesome";

import Navigation from "../components/Navigation";
import { getAddressFromCoords } from "../services/locationServ";
import { openCamera } from "../utils/openCamera";

// Dropdown Options
const wasteOptions = ["Plastic", "Metal", "Glass", "Paper"];

export default function HomeScreen() {
  const user = useSelector((state) => state.userData.user) || null;

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState({ fullAddress: "", address: "" });

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Form states
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [images, setImages] = useState([]);

  // -----------------------------
  //   LOCATION PERMISSION
  // -----------------------------
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (err) => console.log("Location Error", err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchAddress(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchAddress = async (lat, lng) => {
    const add = await getAddressFromCoords(lat, lng);
    setAddress(add);
  };

  // -----------------------------
  //   CLOSE POPUP
  // -----------------------------
  const onClosePopup = () => {
    setShowPopup(false);
    setDropdownOpen(false);
  };

  // -----------------------------
  //   SUBMIT DATA
  // -----------------------------
  const onSubmit = (data) => {
    console.log("Form Submit:", data);

    setShowPopup(false);
    setDropdownOpen(false);

    // reset form
    setWasteType("");
    setWeight("");
    setNote("");
    setImages([]);
  };

  const submitReportHnadler = () => {
    try {
      if(!location || images.length === 0) {
        Alert.alert("Location not available or images not selected");
        return;
      }
      if (!wasteType || !address) {
        Alert.alert("Please select waste type and ensure address is available");
        return;
      }
    
      let formData = new FormData();
      formData.append("latitude", location.latitude);
      formData.append("longitude", location.longitude);
      formData.append("address", address.fullAddress);
      formData.append("type", wasteType);
      formData.append("weight", weight);
      formData.append("note", note);


    } catch (error) {
      
    }

    // Handle the submission of the report
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Hi, {user?.name || "User"}</Text>

        {/* ADDRESS */}
        <View style={styles.header}>
          <Text style={{ fontSize: 12 }}>
            <Font6 name="location-dot" size={16} color="#4CBB17" />{" "}
            {address.address || "Fetching..."}
          </Text>
          <Feather name="bell" size={22} color="#444" />
        </View>

        {/* NEARBY BIN LIST */}
        <Text style={styles.sectionTitle}>Nearby Bin Station</Text>

        <FlatList
          data={[
            { id: 1, name: "OGG Bin 1", address: "Street 1", distance: "2.1 km" },
            { id: 2, name: "OGG Bin 2", address: "Street 2", distance: "3.4 km" },
            { id: 3, name: "OGG Bin 3", address: "Street 3", distance: "1.2 km" },
          ]}
          keyExtractor={(i) => i.id.toString()}
          style={{ height: 330 }}
          renderItem={({ item }) => (
            <View style={styles.binItem}>
              <View style={styles.binIcon}>
                <Feather name="map-pin" size={26} color="#4CBB17" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.binTitle}>{item.name}</Text>
                <Text style={styles.binAddress}>{item.address}</Text>
                <Text style={styles.binDistance}>{item.distance}</Text>
              </View>

              <Feather name="more-vertical" size={22} color="#555" />
            </View>
          )}
        />

        {/* -----------------------------
               Waste Popup 
        ------------------------------ */}
        <Modal transparent visible={showPopup} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              {/* Images */}
              <View style={styles.imageRow}>
                {images?.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.img} />
                ))}
              </View>

              {/* Address */}
              <TextInput
                placeholder="Address"
                value={address.fullAddress}
                onChangeText={setAddress}
                style={styles.popinput}
              />

              {/* Waste Dropdown Open */}
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
                    {wasteOptions.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.option}
                        onPress={() => {
                          setWasteType(item);
                          setDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Weight */}
              <TextInput
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                style={styles.popinput}
              />

              {/* Notes */}
              <TextInput
                placeholder="Notes"
                value={note}
                onChangeText={setNote}
                style={[styles.popinput, { height: 70 }]}
                multiline
              />

              {/* Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity
                  onPress={onClosePopup}
                  style={[styles.btn, { backgroundColor: "#ddd" }]}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    onSubmit({
                      address: address.fullAddress,
                      wasteType,
                      weight,
                      note,
                      images,
                    })
                  }
                  style={[styles.btn, { backgroundColor: "green" }]}
                >
                  <Text style={{ color: "#fff" }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* Camera button open popup */}
      <Navigation
        onCameraPress={() => {
          openCamera(setImages);
          setShowPopup(true);
        }}
      />
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, paddingBottom: 70 },
  title: { fontSize: 20, fontWeight: "700" },
  header: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: { marginTop: 20, fontSize: 18, fontWeight: "700" },

  binItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    borderRadius: 14,
    marginTop: 10,
    alignItems: "center",
    elevation: 2,
  },

  binIcon: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#F1F8EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  binTitle: { fontWeight: "700", fontSize: 15 },
  binAddress: { fontSize: 12, color: "#777" },
  binDistance: {
    marginTop: 4,
    fontSize: 12,
    color: "#4CBB17",
    backgroundColor: "#EAF8E6",
    paddingHorizontal: 6,
    borderRadius: 10,
  },

  // POPUP
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
