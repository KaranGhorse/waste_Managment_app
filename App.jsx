import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/redux/store';
import Signup from './src/screens/Signup';
import OtpScreen from './src/screens/OtpScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import WalletScreen from './src/screens/WalletScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChangePassword from './src/screens/ChangePassword';
import CreateNewPassword from './src/screens/CreateNewPassword';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const Loading = () => <ActivityIndicator size="large" style={{ flex: 1 }} />;

// Separate component to handle initialRoute AFTER persistGate rehydration
// const AppNavigator = () => {
//   const user = useSelector(state => state.userData.user) ;
  

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={user ? "HomeScreen" : "Login"}
//         // initialRouteName={"Login"}
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="OtpScreen" component={OtpScreen} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//         <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
//         <Stack.Screen name="WalletScreen" component={WalletScreen} />
//         <Stack.Screen name="ChangePassword" component={ChangePassword} />
//         <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };



// const AppNavigator = () => {
//   const user = useSelector(state => state.userData.user);

//   return (
//     <NavigationContainer>
//       {user ? <AppStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };



// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={Login} />
//     <Stack.Screen name="Signup" component={Signup} />
//     <Stack.Screen name="OtpScreen" component={OtpScreen} />
//   </Stack.Navigator>
// );

// const AppStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="HomeScreen" component={HomeScreen} />
//     <Stack.Screen name="WalletScreen" component={WalletScreen} />
//     <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
//     <Stack.Screen name="ChangePassword" component={ChangePassword} />
//   </Stack.Navigator>
// );


const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="OtpScreen" component={OtpScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <Stack.Screen name="WalletScreen" component={WalletScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const user = useSelector(state => state.userData.user);

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
     </PersistGate>
    </Provider>
  );
}
