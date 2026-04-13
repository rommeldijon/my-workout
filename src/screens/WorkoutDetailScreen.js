import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import detailStyles from "../styles/detailStyles";
import { getExerciseImage } from "../constants/images";
import { deleteWorkout, updateWorkout } from "../services/storageService";
import { showAlert } from "../utils/alertHelper";

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  // Controls whether the screen is in edit mode.
  const [isEditing, setIsEditing] = useState(false);

  // Local workout state so the UI updates immediately after saving changes.
  const [workout, setWorkout] = useState(item || {});

  // Editable text field state.
  const [editedTitle, setEditedTitle] = useState(item?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    item?.description || ""
  );
  const [editedCategory, setEditedCategory] = useState(item?.category || "");

  // Editable image URL field.
  const [editedImageUri, setEditedImageUri] = useState(item?.imageUri || "");

  // Editable status field.
  // Supports the 3-state flow: To Do, Started, Done.
  const [editedStatus, setEditedStatus] = useState(
    item?.status || (item?.completed ? "Done" : "To Do")
  );

  // Delete confirmation modal state.
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Simple image URL validation.
  // Blank is allowed because the user may want to keep/remove a custom image URL.
  const isValidImageUrl = (url) => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) return true;

    const isHttp = /^https?:\/\/.+/i.test(trimmedUrl);

    const isImage =
      /\.(jpg|jpeg|png|webp|gif)$/i.test(trimmedUrl) ||
      trimmedUrl.includes("unsplash.com") ||
      trimmedUrl.includes("images");

    return isHttp && isImage;
  };

  // Helper to choose which image to display.
  // While editing, we want the live typed image URL preview to show immediately.
  const resolveWorkoutImage = () => {
    const activeImageUri = isEditing
      ? editedImageUri.trim()
      : workout?.imageUri?.trim();

    // If a valid remote image URL exists, use it first.
    if (activeImageUri) {
      return { uri: activeImageUri };
    }

    // Otherwise, fall back to the built-in imageKey image.
    return getExerciseImage(workout?.imageKey);
  };

  const workoutImage = resolveWorkoutImage();

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleStartEdit = () => {
    // Reset edit fields to the currently saved values.
    setEditedTitle(workout?.title || "");
    setEditedDescription(workout?.description || "");
    setEditedCategory(workout?.category || "");
    setEditedImageUri(workout?.imageUri || "");
    setEditedStatus(workout?.status || (workout?.completed ? "Done" : "To Do"));
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Restore all fields to the last saved values.
    setEditedTitle(workout?.title || "");
    setEditedDescription(workout?.description || "");
    setEditedCategory(workout?.category || "");
    setEditedImageUri(workout?.imageUri || "");
    setEditedStatus(workout?.status || (workout?.completed ? "Done" : "To Do"));
    setIsEditing(false);
  };

  const handleSaveWorkout = async () => {
    try {
      if (!workout?.id) return;

      if (!editedTitle.trim()) {
        showAlert("Validation Error", "Title is required.");
        return;
      }

      if (!isValidImageUrl(editedImageUri)) {
        showAlert(
          "Validation Error",
          "Please enter a valid image URL that starts with http or https."
        );
        return;
      }

      const updatedWorkout = {
        ...workout,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        category: editedCategory.trim(),
        imageUri: editedImageUri.trim(),

        // Save the selected 3-state status value.
        status: editedStatus,

        // Keep completed for backward compatibility with older app logic.
        completed: editedStatus === "Done",
      };

      await updateWorkout(updatedWorkout);
      setWorkout(updatedWorkout);
      setIsEditing(false);

      showAlert("Success", "Workout updated successfully.");
    } catch (error) {
      console.log("Update workout error:", error);
      showAlert("Error", "Failed to update workout.");
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      if (!workout?.id) return;

      await deleteWorkout(workout.id);
      closeDeleteModal();

      showAlert("Success", "Workout deleted successfully.", () => {
        navigation.goBack();
      });
    } catch (error) {
      console.log("Delete workout error:", error);
      closeDeleteModal();
      showAlert("Error", "Failed to delete workout.");
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={detailStyles.container}>
        <Text style={detailStyles.header}>Workout Details</Text>

        <View style={detailStyles.card}>
          <Image
            source={workoutImage}
            resizeMode="contain"
            style={detailStyles.image}
          />

          <Text style={detailStyles.label}>Title</Text>
          {isEditing ? (
            <TextInput
              value={editedTitle}
              onChangeText={setEditedTitle}
              style={detailStyles.input}
              placeholder="Enter workout title"
            />
          ) : (
            <Text style={detailStyles.value}>
              {workout?.title || "No title available"}
            </Text>
          )}

          <Text style={detailStyles.label}>Description</Text>
          {isEditing ? (
            <TextInput
              value={editedDescription}
              onChangeText={setEditedDescription}
              style={[detailStyles.input, detailStyles.multilineInput]}
              placeholder="Enter workout description"
              multiline
            />
          ) : (
            <Text style={detailStyles.value}>
              {workout?.description || "No description available"}
            </Text>
          )}

          <Text style={detailStyles.label}>Category</Text>
          {isEditing ? (
            <TextInput
              value={editedCategory}
              onChangeText={setEditedCategory}
              style={detailStyles.input}
              placeholder="Enter workout category"
            />
          ) : (
            <Text style={detailStyles.value}>
              {workout?.category || "No category"}
            </Text>
          )}

          <Text style={detailStyles.label}>Image URL</Text>
          {isEditing ? (
            <TextInput
              value={editedImageUri}
              onChangeText={setEditedImageUri}
              style={detailStyles.input}
              placeholder="Enter image URL"
              autoCapitalize="none"
              autoCorrect={false}
            />
          ) : (
            <Text style={detailStyles.value}>
              {workout?.imageUri || "No custom image URL"}
            </Text>
          )}

          <Text style={detailStyles.label}>Status</Text>
          {isEditing ? (
            <View style={detailStyles.statusContainer}>
              <TouchableOpacity
                style={[
                  detailStyles.statusButton,
                  editedStatus === "To Do" && detailStyles.statusButtonActive,
                ]}
                onPress={() => setEditedStatus("To Do")}
              >
                <Text
                  style={[
                    detailStyles.statusButtonText,
                    editedStatus === "To Do" &&
                      detailStyles.statusButtonTextActive,
                  ]}
                >
                  To Do
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  detailStyles.statusButton,
                  editedStatus === "Started" &&
                    detailStyles.statusButtonActive,
                ]}
                onPress={() => setEditedStatus("Started")}
              >
                <Text
                  style={[
                    detailStyles.statusButtonText,
                    editedStatus === "Started" &&
                      detailStyles.statusButtonTextActive,
                  ]}
                >
                  Started
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  detailStyles.statusButton,
                  editedStatus === "Done" && detailStyles.statusButtonActive,
                ]}
                onPress={() => setEditedStatus("Done")}
              >
                <Text
                  style={[
                    detailStyles.statusButtonText,
                    editedStatus === "Done" &&
                      detailStyles.statusButtonTextActive,
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={detailStyles.value}>
              {workout?.status || (workout?.completed ? "Done" : "To Do")}
            </Text>
          )}

          <Text style={detailStyles.label}>Workout ID</Text>
          <Text style={detailStyles.value}>
            {workout?.id || "No ID available"}
          </Text>
        </View>

        <View style={detailStyles.iconButtonRow}>
          {!isEditing ? (
            <TouchableOpacity
              style={detailStyles.iconButton}
              onPress={handleStartEdit}
            >
              <MaterialIcons name="edit" size={24} color="#ffffff" />
              <Text style={detailStyles.iconButtonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={detailStyles.iconButton}
                onPress={handleSaveWorkout}
              >
                <MaterialIcons name="save" size={24} color="#ffffff" />
                <Text style={detailStyles.iconButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={detailStyles.iconButton}
                onPress={handleCancelEdit}
              >
                <MaterialIcons name="cancel" size={24} color="#ffffff" />
                <Text style={detailStyles.iconButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={detailStyles.iconButton}
            onPress={openDeleteModal}
          >
            <MaterialIcons name="delete" size={24} color="#ffffff" />
            <Text style={detailStyles.iconButtonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={detailStyles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
            <Text style={detailStyles.iconButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={detailStyles.modalOverlay}>
          <View style={detailStyles.modalContainer}>
            <Text style={detailStyles.modalTitle}>Delete Workout</Text>

            <Text style={detailStyles.modalMessage}>
              Are you sure you want to delete "{workout?.title}"?
            </Text>

            <View style={detailStyles.modalButtonRow}>
              <TouchableOpacity
                style={detailStyles.modalCancelButton}
                onPress={closeDeleteModal}
              >
                <Text style={detailStyles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={detailStyles.modalDeleteButton}
                onPress={handleDeleteWorkout}
              >
                <Text style={detailStyles.modalDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default WorkoutDetailScreen;