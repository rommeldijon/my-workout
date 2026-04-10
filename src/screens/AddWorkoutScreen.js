import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import workoutStyles from "../styles/workoutStyles";
import { showAlert } from "../utils/alertHelper";
import { isEmpty } from "../utils/validators";
import { addWorkout } from "../services/storageService";
import { getExerciseImage } from "../constants/images";

// Built-in image choices shown inside the custom dropdown.
// The value must match the imageKey inside your images.js file.
const IMAGE_OPTIONS = [
  { label: "Arms", value: "arms" },
  { label: "Legs", value: "legs" },
  { label: "Back", value: "back" },
  { label: "Core", value: "core" },
  { label: "Cardio", value: "cardio" },
];

// Three workout progress choices.
// We use a segmented slider-style selector instead of plain buttons.
const STATUS_OPTIONS = ["To Do", "Started", "Done"];

// Validate standard http/https image URLs.
// Empty is allowed because the image URL is optional.
const isValidImageUrl = (url) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return true;
  }

  const isHttpUrl = /^https?:\/\/.+/i.test(trimmedUrl);
  const isGoogleDriveUrl =
    trimmedUrl.includes("drive.google.com") ||
    trimmedUrl.includes("docs.google.com");

  if (!isHttpUrl) {
    return false;
  }

  if (isGoogleDriveUrl) {
    return false;
  }

  return true;
};

const AddWorkoutScreen = ({ navigation }) => {
  // Main form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // New 3-state status
  const [status, setStatus] = useState("To Do");

  // Image-related fields
  const [selectedImageKey, setSelectedImageKey] = useState("");
  const [imageUri, setImageUri] = useState("");

  // Controls whether the image dropdown is open
  const [showImageDropdown, setShowImageDropdown] = useState(false);

  // Get the selected image object for display in the closed dropdown
  const selectedImageOption = useMemo(() => {
    return IMAGE_OPTIONS.find((option) => option.value === selectedImageKey) || null;
  }, [selectedImageKey]);

  // Validate all required fields before saving
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

  // Save the workout to storage
  // Priority:
  // 1. Save imageUri if provided
  // 2. Save selected built-in imageKey if chosen
  // 3. Allow no image if the user leaves both empty
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

        // Keep old completed logic for backward compatibility
        completed: status === "Done",

        // Save the more detailed status so you can use it later in the UI
        status,

        // Save both built-in and URI image sources
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

  // Clear the built-in image choice
  const handleClearImageSelection = () => {
    setSelectedImageKey("");
    setShowImageDropdown(false);
  };

  return (
    <ScrollView
      contentContainerStyle={workoutStyles.formContainer}
      keyboardShouldPersistTaps="handled"
    >
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

      <Text style={workoutStyles.formLabel}>Workout Progress</Text>
      <Text style={styles.helperText}>
        Choose the current progress of this workout.
      </Text>

      <View style={styles.segmentContainer}>
        {STATUS_OPTIONS.map((option) => {
          const isSelected = status === option;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.segmentButton,
                isSelected && styles.segmentButtonActive,
              ]}
              onPress={() => setStatus(option)}
            >
              <Text
                style={[
                  styles.segmentButtonText,
                  isSelected && styles.segmentButtonTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={workoutStyles.formLabel}>Built-in Image</Text>
      <Text style={styles.helperText}>
        Optional. Pick one built-in image now and update it later if needed.
      </Text>

      {/* Custom dropdown trigger */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowImageDropdown((prev) => !prev)}
      >
        <View style={styles.dropdownContent}>
          {selectedImageOption ? (
            <>
              <Image
                source={getExerciseImage(selectedImageOption.value)}
                style={styles.dropdownImage}
                resizeMode="contain"
              />
              <Text style={styles.dropdownButtonText}>
                {selectedImageOption.label}
              </Text>
            </>
          ) : (
            <Text style={styles.dropdownPlaceholderText}>
              Select a built-in image
            </Text>
          )}
        </View>

        <MaterialIcons
          name={showImageDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#444"
        />
      </TouchableOpacity>

      {/* Dropdown options */}
      {showImageDropdown && (
        <View style={styles.dropdownList}>
          {IMAGE_OPTIONS.map((option) => {
            const isSelected = selectedImageKey === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.dropdownItem,
                  isSelected && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  setSelectedImageKey(option.value);
                  setShowImageDropdown(false);
                }}
              >
                <Image
                  source={getExerciseImage(option.value)}
                  style={styles.dropdownItemImage}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.dropdownItemText,
                    isSelected && styles.dropdownItemTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        style={styles.clearSelectionButton}
        onPress={handleClearImageSelection}
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
        Optional. Paste an image URL of your workout. 
      </Text>

      {/* Icon action buttons */}
      <View style={styles.iconButtonRow}>
        <TouchableOpacity
          style={[styles.iconButton, styles.saveIconButton]}
          onPress={handleSaveWorkout}
        >
          <MaterialIcons name="save" size={24} color="#FFFFFF" />
          <Text style={styles.iconButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, styles.cancelIconButton]}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color="#FFFFFF" />
          <Text style={styles.iconButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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

  // Segmented slider-style status selector
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#E9EEF5",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#4A90E2",
  },
  segmentButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  segmentButtonTextActive: {
    color: "#FFFFFF",
  },

  // Custom dropdown styles
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownImage: {
    width: 38,
    height: 38,
    marginRight: 12,
  },
  dropdownButtonText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
  dropdownPlaceholderText: {
    fontSize: 15,
    color: "#888",
  },
  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemSelected: {
    backgroundColor: "#EEF5FF",
  },
  dropdownItemImage: {
    width: 34,
    height: 34,
    marginRight: 12,
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#333",
  },
  dropdownItemTextSelected: {
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

  // Icon buttons
  iconButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 12,
  },
  iconButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  saveIconButton: {
    backgroundColor: "#4A90E2",
  },
  cancelIconButton: {
    backgroundColor: "#D9534F",
  },
  iconButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
});

export default AddWorkoutScreen;