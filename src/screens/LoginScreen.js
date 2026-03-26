import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showAlert = (title, message, onOk) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(
        title,
        message,
        onOk ? [{ text: "OK", onPress: onOk }] : undefined
      );
    }
  };

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      showAlert("Validation Error", "Email and password are required.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email.trim())) {
      showAlert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("userDetails");
      console.log("Stored User:", storedUser);

      if (!storedUser) {
        showAlert("Error", "No user found. Please sign up first.");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (
        email.trim() === parsedUser.email &&
        password.trim() === parsedUser.password
      ) {
        await AsyncStorage.setItem("loggedInUser", parsedUser.email);

        showAlert("Success", "Login successful!", () => {
          navigation.replace("Home");
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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#222",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 15,
    color: "#333",
  },
  signupLink: {
    fontSize: 15,
    color: "blue",
    fontWeight: "bold",
  },
});