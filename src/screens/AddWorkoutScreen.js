import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import workoutStyles from "../styles/workoutStyles";
import storageKeys from "../constants/storageKeys";
import { showAlert } from "../utils/alertHelper";
import { isEmpty } from "../utils/validators";

const AddWorkoutScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("To Do");

  const validateForm = () => {
    if (isEmpty(title) || isEmpty(description) || isEmpty(category)) {
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
      const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);
      const existingWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];

      const newWorkout = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        completed: status === "Done",
      };

      const updatedWorkouts = [...existingWorkouts, newWorkout];

      await AsyncStorage.setItem(
        storageKeys.workouts,
        JSON.stringify(updatedWorkouts)
      );

      showAlert("Success", "Workout added successfully!", () => {
        navigation.goBack();
      });
    } catch (error) {
      console.log("Add workout error:", error);
      showAlert("Error", "Failed to save workout.");
    }
  };

  return (
    <ScrollView contentContainerStyle={workoutStyles.formContainer}>
      <Text style={workoutStyles.formTitle}>Add Workout</Text>

      <Text style={workoutStyles.formLabel}>Workout Title</Text>
      <TextInput
        style={workoutStyles.formInput}
        placeholder="Enter workout title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={workoutStyles.formLabel}>Description</Text>
      <TextInput
        style={[workoutStyles.formInput, workoutStyles.multilineInput]}
        placeholder="Enter workout description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={workoutStyles.formLabel}>Category</Text>
      <TextInput
        style={workoutStyles.formInput}
        placeholder="Examples: Exercises, Quick Warm-ups"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={workoutStyles.formLabel}>Status</Text>

      <View style={workoutStyles.statusContainer}>
        <TouchableOpacity
          style={[
            workoutStyles.statusButton,
            status === "To Do" && workoutStyles.statusButtonActive,
          ]}
          onPress={() => setStatus("To Do")}
        >
          <Text
            style={[
              workoutStyles.statusButtonText,
              status === "To Do" && workoutStyles.statusButtonTextActive,
            ]}
          >
            To Do
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            workoutStyles.statusButton,
            status === "Done" && workoutStyles.statusButtonActive,
          ]}
          onPress={() => setStatus("Done")}
        >
          <Text
            style={[
              workoutStyles.statusButtonText,
              status === "Done" && workoutStyles.statusButtonTextActive,
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={workoutStyles.saveButton}
        onPress={handleSaveWorkout}
      >
        <Text style={workoutStyles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={workoutStyles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={workoutStyles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddWorkoutScreen;