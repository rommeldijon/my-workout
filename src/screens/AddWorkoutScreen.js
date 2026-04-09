import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

import workoutStyles from "../styles/workoutStyles";
import { showAlert } from "../utils/alertHelper";
import { isEmpty } from "../utils/validators";
import { addWorkout } from "../services/storageService";
import { getExerciseImage } from "../constants/images";

// Built-in image choices for the user.
// The value must match the imageKey used in your images.js file.
const IMAGE_OPTIONS = [
  { label: "Push Up", value: "pushup" },
  { label: "Squat", value: "squat" },
  { label: "Jumping Jacks", value: "jumpingjacks" },
  { label: "Plank", value: "plank" },
];

// Small helper function to validate image URLs.
// This accepts common web image formats and standard http/https links.
const isValidImageUrl = (url) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return true; // Empty is allowed because URL input is optional.
  }

  return /^https?:\/\/.+/i.test(trimmedUrl);
};

const AddWorkoutScreen = ({ navigation }) => {
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("To Do");

  // New image-related fields
  const [selectedImageKey, setSelectedImageKey] = useState("");
  const [imageUri, setImageUri] = useState("");

  // Validate all required fields before saving.
  const validateForm = () => {
    if (isEmpty(title) || isEmpty(description) || isEmpty(category)) {
      showAlert("Validation Error", "Please fill in all required fields.");
      return false;
    }

    if (!isValidImageUrl(imageUri)) {
      showAlert(
        "Validation Error",
        "Please enter a valid image URL starting with http:// or https://"
      );
      return false;
    }

    return true;
  };

  // Save the workout to AsyncStorage.
  // Priority:
  // 1. If the user enters an image URL, save it.
  // 2. If the user selects a built-in image, save its imageKey.
  // 3. If both are empty, the workout can still be saved without an image.
  const handleSaveWorkout = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const trimmedImageUri = imageUri.trim();

      const newWorkout = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        completed: status === "Done",
        imageKey: selectedImageKey || "",
        imageUri: trimmedImageUri || "",
      };

      await addWorkout(newWorkout);

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

      <Text style={workoutStyles.formLabel}>Choose a Built-in Image</Text>
      <Text style={styles.helperText}>
        Tap one of the built-in images below. This is optional.
      </Text>

      <View style={styles.imageGrid}>
        {IMAGE_OPTIONS.map((option) => {
          const isSelected = selectedImageKey === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.imageCard, isSelected && styles.imageCardSelected]}
              onPress={() => setSelectedImageKey(option.value)}
            >
              <Image
                source={getExerciseImage(option.value)}
                style={styles.imagePreview}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.imageLabel,
                  isSelected && styles.imageLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.clearSelectionButton}
        onPress={() => setSelectedImageKey("")}
      >
        <Text style={styles.clearSelectionText}>Clear Built-in Selection</Text>
      </TouchableOpacity>

      <Text style={workoutStyles.formLabel}>Image URL</Text>
      <TextInput
        style={workoutStyles.formInput}
        placeholder="https://example.com/workout-image.jpg"
        placeholderTextColor="#888"
        value={imageUri}
        onChangeText={setImageUri}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.helperText}>
        Optional: paste an image URL. If you enter a URL, your app can use it
        later as the workout image.
      </Text>

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

const styles = StyleSheet.create({
  helperText: {
    fontSize: 13,
    color: "#666",
    marginTop: -4,
    marginBottom: 12,
    lineHeight: 18,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  imageCardSelected: {
    borderColor: "#4A90E2",
    borderWidth: 2,
  },
  imagePreview: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },
  imageLabel: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  imageLabelSelected: {
    color: "#4A90E2",
    fontWeight: "700",
  },
  clearSelectionButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  clearSelectionText: {
    color: "#D9534F",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AddWorkoutScreen;