import { account } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    console.log("Attempting to log in with email:", email, password);
    try {
      await account.createEmailPasswordSession(email, password);
      // Redirect to /root/try after successful login
      router.replace("/root/try");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      {/* Tabs */}
      <View className="flex-row justify-center space-x-8 pt-16 pb-6 bg-white shadow-md rounded-b-3xl">
        <Text className="text-blue-600 text-xl font-bold border-b-4 border-blue-600 pb-2 px-4">
          Log in
        </Text>
        <Link href="/signup" className="ml-6">
          <Text className="text-gray-400 text-xl font-bold pb-2 px-5 ml-16">
            Sign up
          </Text>
        </Link>
      </View>

      {/* Card */}
      <View className="flex-1 items-center justify-start px-6 pt-10 bg-white">
        <View className="w-full bg-white rounded-2xl shadow-lg p-6">
          {/* Email input */}
          <Text className="text-gray-700 mb-1 font-bold text-1xl ">
            Your Email
          </Text>
          <View className="w-full mb-4">
            <TextInput
              className="border border-gray-300 rounded-2xl px-4 py-3 text-base bg-gray-50"
              placeholder="contact@Suvadip.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password input */}
          <Text className="text-gray-700 mb-1 font-medium">Password</Text>
          <View className="w-full mb-1 relative">
            <TextInput
              className="border border-gray-300 rounded-2xl px-4 py-3 text-base pr-10 bg-gray-50"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setSecureText(!secureText)}
            >
              <Ionicons
                name={secureText ? "eye-off" : "eye"}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Wrong password and Forgot */}
          <View className="w-full flex-row justify-between mt-1 mb-4">
            <Text className="text-red-500 text-xs">Wrong password</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-xs">Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Continue button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-blue-500 py-3 rounded-md mb-6 shadow"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center w-full mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-2 text-gray-400">Or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Google login */}
          <TouchableOpacity className="w-full flex-row items-center justify-center border border-gray-300 py-3 rounded-md">
            <Ionicons name="logo-google" size={20} />
            <Text className="ml-2 text-base">Login with Google</Text>
          </TouchableOpacity>
        </View>
        <Text className="mt-8 text-gray-500">
          Don’t have an account?
          <Link href="/signup">
            <Text className="text-blue-500"> Sign up</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
