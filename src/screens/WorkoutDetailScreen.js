import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";

import detailStyles from "../styles/detailStyles";
import { getExerciseImage } from "../constants/images";
import { deleteWorkout } from "../services/storageService";
import { showAlert } from "../utils/alertHelper";

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {};
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const workoutImage = item?.imageKey ? getExerciseImage(item.imageKey) : null;

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteWorkout = async () => {
    try {
      if (!item?.id) return;

      await deleteWorkout(item.id);
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
          <Text style={detailStyles.value}>
            {item?.title || "No title available"}
          </Text>

          <Text style={detailStyles.label}>Description</Text>
          <Text style={detailStyles.value}>
            {item?.description || "No description available"}
          </Text>

          <Text style={detailStyles.label}>Category</Text>
          <Text style={detailStyles.value}>
            {item?.category || "No category"}
          </Text>

          <Text style={detailStyles.label}>Status</Text>
          <Text style={detailStyles.value}>
            {item?.completed ? "Done" : "To Do"}
          </Text>

          <Text style={detailStyles.label}>Workout ID</Text>
          <Text style={detailStyles.value}>
            {item?.id || "No ID available"}
          </Text>
        </View>

        <TouchableOpacity
          style={detailStyles.deleteButton}
          onPress={openDeleteModal}
        >
          <Text style={detailStyles.deleteButtonText}>Delete Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={detailStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={detailStyles.backButtonText}>Previous</Text>
        </TouchableOpacity>
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
              Are you sure you want to delete "{item?.title}"?
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