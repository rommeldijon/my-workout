import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useWorkouts from "../hooks/useWorkouts";
import workoutStyles from "../styles/workoutStyles";
import WorkoutCard from "../components/WorkoutCard";
import { deleteWorkout, updateWorkout } from "../services/storageService";
import { showAlert } from "../utils/alertHelper";

const ViewWorkoutsScreen = ({ navigation }) => {
  const { data: workouts, loading, error, refetch } = useWorkouts();

  // Delete modal state.
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [selectedWorkoutTitle, setSelectedWorkoutTitle] = useState("");

  // Track which workout is currently being edited inline.
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleWorkoutPress = (workout) => {
    navigation.navigate("WorkoutDetail", {
      item: {
        id: workout.id,
        title: workout.title,
        description: workout.description,
        category: workout.category,
        completed: workout.completed,
        imageKey: workout.imageKey || null,
      },
    });
  };

  const handleStartEdit = (workout) => {
    setEditingWorkoutId(workout.id);
  };

  const handleCancelEdit = () => {
    setEditingWorkoutId(null);
  };

  const handleSaveEdit = async (updatedWorkout) => {
    try {
      if (!updatedWorkout?.title?.trim()) {
        showAlert("Validation Error", "Title is required.");
        return;
      }

      const cleanedWorkout = {
        ...updatedWorkout,
        title: updatedWorkout.title.trim(),
        description: updatedWorkout.description?.trim() || "",
        category: updatedWorkout.category?.trim() || "",
      };

      await updateWorkout(cleanedWorkout);
      setEditingWorkoutId(null);
      await refetch();

      showAlert("Success", "Workout updated successfully.");
    } catch (err) {
      console.log("Update workout error:", err);
      showAlert("Error", "Failed to update workout.");
    }
  };

  const openDeleteModal = (workoutId, workoutTitle) => {
    setSelectedWorkoutId(workoutId);
    setSelectedWorkoutTitle(workoutTitle);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedWorkoutId(null);
    setSelectedWorkoutTitle("");
  };

  const handleDeleteWorkout = async () => {
    try {
      if (!selectedWorkoutId) return;

      await deleteWorkout(selectedWorkoutId);
      await refetch();

      if (editingWorkoutId === selectedWorkoutId) {
        setEditingWorkoutId(null);
      }

      closeDeleteModal();
      showAlert("Success", "Workout deleted successfully.");
    } catch (err) {
      console.log("Delete workout error:", err);
      closeDeleteModal();
      showAlert("Error", "Failed to delete workout.");
    }
  };

  return (
    <View style={workoutStyles.container}>
      <Text style={workoutStyles.header}>All Workouts</Text>

      <ScrollView
        style={workoutStyles.scrollView}
        contentContainerStyle={workoutStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text style={workoutStyles.infoText}>Loading workouts...</Text>
        ) : error ? (
          <View style={workoutStyles.emptyCard}>
            <Text style={workoutStyles.infoText}>{error}</Text>
          </View>
        ) : workouts.length === 0 ? (
          <View style={workoutStyles.emptyCard}>
            <Text style={workoutStyles.infoText}>
              No workouts found yet. Go back and use the + button to add one.
            </Text>
          </View>
        ) : (
          workouts.map((item) => (
            <WorkoutCard
              key={item.id}
              item={item}
              onPress={handleWorkoutPress}
              onDelete={openDeleteModal}
              onStartEdit={handleStartEdit}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              isEditing={editingWorkoutId === item.id}
              showCategory={true}
              showStatus={true}
            />
          ))
        )}

        <TouchableOpacity
          style={workoutStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={workoutStyles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={workoutStyles.modalOverlay}>
          <View style={workoutStyles.modalContainer}>
            <Text style={workoutStyles.modalTitle}>Delete Workout</Text>

            <Text style={workoutStyles.modalMessage}>
              Are you sure you want to delete "{selectedWorkoutTitle}"?
            </Text>

            <View style={workoutStyles.modalButtonRow}>
              <TouchableOpacity
                style={workoutStyles.modalCancelButton}
                onPress={closeDeleteModal}
              >
                <Text style={workoutStyles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={workoutStyles.modalDeleteButton}
                onPress={handleDeleteWorkout}
              >
                <Text style={workoutStyles.modalDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewWorkoutsScreen;