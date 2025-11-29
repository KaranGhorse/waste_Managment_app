import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// 👉 YOUR SCREENS


// import Login from "./screens/Login";
// import OnboardingScreen from './screens/OnboardingScreen';
// import Signup from "./screens/Signup";
// import Otp from "./screens/Otp";
// import Home from "./screens/Home";
// import HomeScreen from "./screens/HomeScreen";
// import ChangePassword from "./screens/ChangePassword";
// import WalletScreen from "./screens/WalletScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Otp"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="WalletScreen" component={WalletScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} /> */}
          <Stack.Screen name="Otp" component={Otp} />
          {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    // </SafeAreaProvider>
  );
}
