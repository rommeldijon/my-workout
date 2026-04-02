import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authStyles from "../styles/authStyles";
import { appImages } from "../constants/images";
import storageKeys from "../constants/storageKeys";
import { showAlert } from "../utils/alertHelper";
import { isValidEmail, isEmpty } from "../utils/validators";

const SignupScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (isEmpty(userName) || isEmpty(email) || isEmpty(password)) {
      showAlert("Validation Error", "Please fill in all fields.");
      return false;
    }

    if (!isValidEmail(email.trim())) {
      showAlert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    console.log("Register button pressed");

    if (!validateForm()) return;

    const userDetails = {
      userName: userName.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      await AsyncStorage.setItem(
        storageKeys.userDetails,
        JSON.stringify(userDetails)
      );

      const savedData = await AsyncStorage.getItem(storageKeys.userDetails);
      console.log("Saved User:", savedData);

      showAlert("Success", "Registration successful!", () => {
        navigation.navigate("Login");
      });
    } catch (error) {
      console.log("Signup storage error:", error);
      showAlert("Error", "Failed to save user details.");
    }
  };

  return (
    <View style={authStyles.container}>
      <Image source={appImages.logo} style={authStyles.logo} />

      <Text style={authStyles.title}>Create Account</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Enter your username"
        placeholderTextColor="#888"
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={authStyles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={authStyles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={authStyles.button} onPress={handleRegister}>
        <Text style={authStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={authStyles.signupContainer}>
        <Text style={authStyles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={authStyles.signupLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;