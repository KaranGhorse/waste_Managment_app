import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
const OnboardingScreen = () => {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      
      {/* Illustration */}
      <Image
        source={""} // <-- put your image here
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Looking for recycling options nearby?</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Use our search feature to discover recycling centers, collection points, 
        and more. It filters results to find exactly what you need.
      </Text>

      {/* Pagination Dots */}
      <View style={styles.dotsWrapper}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      
    </View>
    // </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  image: {
    width: "85%",
    height: 260,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 25,
  },

  dotsWrapper: {
    flexDirection: "row",
    marginBottom: 30,
    // gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#cbd5c0",
    borderRadius: 50,
  },

  dotActive: {
    width: 20,
    backgroundColor: "#8CCB8A",
  },

  button: {
    backgroundColor: "#6EBF6E",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
