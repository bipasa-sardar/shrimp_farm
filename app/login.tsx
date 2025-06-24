import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import './global.css'; // Ensure you have global styles if needed

const Login = () => {
  return (
      <ImageBackground
      source={require('../assets/images/Frame.webp')} // or { uri: 'https://...' }
      className="flex-1 justify-center items-center"
      resizeMode="cover"
    >
      <View className="bg-black/50 p-6 rounded-lg">
        <Text className="text-white text-xl font-bold">Hello from Login</Text>
      </View>
    </ImageBackground>
  )
}

export default Login;