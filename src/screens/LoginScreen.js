import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import authStyles from "../styles/authStyles";
import { appImages } from "../constants/images";
import { showAlert } from "../utils/alertHelper";
import { isValidEmail, isEmpty } from "../utils/validators";
import { getUserDetails, saveLoggedInUser } from "../services/storageService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (isEmpty(email) || isEmpty(password)) {
      showAlert("Validation Error", "Email and password are required.");
      return false;
    }

    if (!isValidEmail(email.trim())) {
      showAlert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    try {
      const parsedUser = await getUserDetails(email.trim());
      console.log("Stored User:", parsedUser);

      if (!parsedUser) {
        showAlert("Error", "No account found with this email.");
        return;
      }

      if (password.trim() === parsedUser.password) {
        await saveLoggedInUser(parsedUser.email);

        showAlert("Success", "Login successful!", () => {
          navigation.replace("Main");
        });
      } else {
        showAlert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.log("Login error:", error);
      showAlert("Error", "Something went wrong.");
    }
  };

  const handleLoginPress = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  return (
    <View style={authStyles.container}>
      <Image source={appImages.logo} style={authStyles.logo} />

      <Text style={authStyles.title}>Login</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={authStyles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={authStyles.button} onPress={handleLoginPress}>
        <Text style={authStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={authStyles.signupContainer}>
        <Text style={authStyles.signupText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={authStyles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;