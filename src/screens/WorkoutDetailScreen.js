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

  // Local edit mode state.
  const [isEditing, setIsEditing] = useState(false);

  // Local workout state so the screen updates immediately after save.
  const [workout, setWorkout] = useState(item || {});

  // Editable field state.
  const [editedTitle, setEditedTitle] = useState(item?.title || "");
  const [editedDescription, setEditedDescription] = useState(
    item?.description || ""
  );
  const [editedCategory, setEditedCategory] = useState(item?.category || "");

  // Delete confirmation modal state.
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const workoutImage = workout?.imageKey ? getExerciseImage(workout.imageKey) : null;

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleStartEdit = () => {
    // Reset edit fields to current saved values before entering edit mode.
    setEditedTitle(workout?.title || "");
    setEditedDescription(workout?.description || "");
    setEditedCategory(workout?.category || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Restore the text fields to last saved values.
    setEditedTitle(workout?.title || "");
    setEditedDescription(workout?.description || "");
    setEditedCategory(workout?.category || "");
    setIsEditing(false);
  };

  const handleSaveWorkout = async () => {
    try {
      if (!workout?.id) return;

      if (!editedTitle.trim()) {
        showAlert("Validation Error", "Title is required.");
        return;
      }

      const updatedWorkout = {
        ...workout,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        category: editedCategory.trim(),
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
          {workoutImage ? (
            <Image
              source={workoutImage}
              resizeMode="contain"
              style={detailStyles.image}
            />
          ) : null}

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

          <Text style={detailStyles.label}>Status</Text>
          <Text style={detailStyles.value}>
            {workout?.completed ? "Done" : "To Do"}
          </Text>

          <Text style={detailStyles.label}>Workout ID</Text>
          <Text style={detailStyles.value}>
            {workout?.id || "No ID available"}
          </Text>
        </View>

        {/* Action buttons row */}
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