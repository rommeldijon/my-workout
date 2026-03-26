import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddWorkoutScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("To Do");

  const showAlert = (titleText, message, onOk) => {
    if (Platform.OS === "web") {
      window.alert(`${titleText}\n\n${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(
        titleText,
        message,
        onOk ? [{ text: "OK", onPress: onOk }] : undefined
      );
    }
  };

  const validateForm = () => {
    if (!title.trim() || !description.trim() || !category.trim()) {
      showAlert("Validation Error", "Please fill in all fields.");
      return false;
    }

    return true;
  };

  const handleSaveWorkout = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const storedWorkouts = await AsyncStorage.getItem("workouts");
      const existingWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];

      const newWorkout = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        completed: status === "Done",
      };

      const updatedWorkouts = [...existingWorkouts, newWorkout];

      await AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

      showAlert("Success", "Workout added successfully!", () => {
        navigation.goBack();
      });
    } catch (error) {
      console.log("Add workout error:", error);
      showAlert("Error", "Failed to save workout.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Workout</Text>

      <Text style={styles.label}>Workout Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter workout title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter workout description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Examples: Exercises, Quick Warm-ups"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Status</Text>

      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "To Do" && styles.statusButtonActive,
          ]}
          onPress={() => setStatus("To Do")}
        >
          <Text
            style={[
              styles.statusButtonText,
              status === "To Do" && styles.statusButtonTextActive,
            ]}
          >
            To Do
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "Done" && styles.statusButtonActive,
          ]}
          onPress={() => setStatus("Done")}
        >
          <Text
            style={[
              styles.statusButtonText,
              status === "Done" && styles.statusButtonTextActive,
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F4F7FB",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#222",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 14,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 5,
  },
  statusButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  statusButtonActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});