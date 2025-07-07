import { account, databases } from '@/lib/appwrite';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ID } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';


const Signup = () => {
  const [role, setRole] = useState('owner');
  const [ownerId, setOwnerId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handaleSignup = async () => {
    setLoading(true);
    try {
      const user = await account.create(ID.unique(), email, password, name);
      await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
        ID.unique(),
        { name, phone, role,email }
      );
      setShowSuccess(true); // Show custom modal
      console.log("Signup successful with email:", email, "role:", role, "ownerId:", ownerId);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white mt-0">
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 0 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} className="flex-1 mt-2">
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom:0,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Tabs */}
            <View className="flex-row justify-center pt-5 pb-4 bg-white shadow-md rounded-b-3xl w-full">
              <Link href="./login" className="px-6">
                <Text className="text-gray-400 text-xl font-bold pb-2">
                  Log in
                </Text>
              </Link>
              <View className="px-6">
                <Text className="text-blue-600 text-xl font-bold border-b-4 border-blue-600 pb-2">
                  Sign up
                </Text>
              </View>
            </View>

            <View className="w-full max-w-xl bg-white rounded-3xl shadow-md p-6 mt-8 mb-0">
              {/* Role Dropdown */}
              <Text className="text-blue-900 mb-1 font-bold text-base">Select Role</Text>
              <View className="w-full mb-4 border border-blue-200 rounded-2xl bg-blue-50">
                <Picker
                  selectedValue={role}
                  onValueChange={setRole}
                  style={{ height: 48, width: '100%' }}
                  dropdownIconColor="#1e293b"
                >
                  <Picker.Item label="Owner" value="owner" />
                  <Picker.Item label="Admin" value="admin" />
                  <Picker.Item label="Enumarator" value="enumarator" />
                </Picker>
              </View>

              {/* Owner ID Field (only for admin or enumarator) */}
              {(role === 'admin' || role === 'enumarator') && (
                <>
                  <Text className="text-blue-900 mb-1 font-bold text-base">Owner ID</Text>
                  <View className="w-full mb-4">
                    <TextInput
                      className="border border-blue-200 rounded-2xl px-4 py-3 text-base bg-blue-50"
                      placeholder="Enter Owner ID"
                      value={ownerId}
                      onChangeText={setOwnerId}
                      autoCapitalize="none"
                    />
                  </View>
                </>
              )}

              {/* Name */}
              <Text className="text-blue-900 mb-1 font-bold text-base">Your Name</Text>
              <View className="w-full mb-4">
                <TextInput
                  className="border border-blue-200 rounded-2xl px-4 py-3 text-base bg-blue-50"
                  placeholder="Suvadip"
                  value={name}
                  onChangeText={setName}
                  keyboardType="default"
                  autoCapitalize="words"
                />
              </View>

              {/* Email */}
              <Text className="text-blue-900 mb-1 font-bold text-base">Your Email</Text>
              <View className="w-full mb-4">
                <TextInput
                  className="border border-blue-200 rounded-2xl px-4 py-3 text-base bg-blue-50"
                  placeholder="contact@Suvadip.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Phone */}
              <Text className="text-blue-900 mb-1 font-bold text-base">Mobile No</Text>
              <View className="w-full mb-4">
                <TextInput
                  className="border border-blue-200 rounded-2xl px-4 py-3 text-base bg-blue-50"
                  placeholder="+91 12345 67890"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <Text className="text-blue-900 mb-1 font-bold text-base">Password</Text>
              <View className="w-full mb-6 relative">
                <TextInput
                  className="border border-blue-200 px-4 py-3 rounded-2xl text-base pr-10 bg-blue-50"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setSecureText(!secureText)}
                >
                  <Ionicons
                    name={secureText ? "eye-off" : "eye"}
                    size={22}
                    color="#2563eb"
                  />
                </TouchableOpacity>
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={handaleSignup}
                className="w-full bg-blue-600 py-3 rounded-2xl mb-2 shadow"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {loading ? "Signing up..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="mt-8 text-gray-500">
              Already have an account?
              <Link href="./login"><Text className="text-blue-600"> Log in</Text></Link>
            </Text>

            {/* Success Modal */}
            <Modal transparent visible={showSuccess} animationType="fade">
              <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white w-11/12 max-w-sm p-6 rounded-2xl shadow-lg items-center">
                  <Text className="text-xl font-bold text-green-600 mb-2">Signup Successful!</Text>
                  <Text className="text-base text-gray-600 text-center mb-4">
                    Your account has been created successfully.
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowSuccess(false)}
                    className="bg-green-500 px-6 py-2 rounded-xl"
                   >
                    <Text className="text-white font-semibold text-base">OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;