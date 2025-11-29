import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import Font6 from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Navigation = ({onCameraPress}) => {
  return (
    <View style={styles.bottomNav}>
      <Feather name="home" size={24} color="#000" />
      <Ionicons name="wallet-outline" size={24} color="#000" />

 <TouchableOpacity onPress={onCameraPress}>
        <Feather name="camera" size={24} color="#000" />
      </TouchableOpacity>
      <Icon2 name="history" size={24} color="#000" />
      <Font6 name="circle-user" size={24} color="#000" />
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
       bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        // Use paddingBottom for space below icons on iPhones with notch
        paddingVertical: 10, 
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        position: 'absolute', // Fixed at the bottom of the screen
        bottom: 0,
        left: 0,
        right: 0,
        height: 80, // Explicit height
    },
    scan:{
        backgroundColor: "green",
        
    }
})