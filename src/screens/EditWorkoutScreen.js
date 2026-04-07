import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

import workoutStyles from "../styles/workoutStyles";
import { showAlert } from "../utils/alertHelper";
import { isEmpty } from "../utils/validators";
import { updateWorkout } from "../services/storageService";

const EditWorkoutScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [category, setCategory] = useState(item?.category || "");
  const [status, setStatus] = useState(item?.completed ? "Done" : "To Do");

  const validateForm = () => {
    if (isEmpty(title) || isEmpty(description) || isEmpty(category)) {
      showAlert("Validation Error", "Please fill in all fields.");
      return false;
    }

    return true;
  };

  const handleUpdateWorkout = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const updatedWorkout = {
        ...item,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        completed: status === "Done",
      };

      await updateWorkout(updatedWorkout);

      showAlert("Success", "Workout updated successfully!", () => {
        navigation.goBack();
      });
    } catch (error) {
      console.log("Edit workout error:", error);
      showAlert("Error", "Failed to update workout.");
    }
  };

  return (
    <ScrollView contentContainerStyle={workoutStyles.formContainer}>
      <Text style={workoutStyles.formTitle}>Edit Workout</Text>

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
        onPress={handleUpdateWorkout}
      >
        <Text style={workoutStyles.saveButtonText}>Save Changes</Text>
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

export default EditWorkoutScreen;