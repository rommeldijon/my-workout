import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useWorkouts from "../hooks/useWorkouts";
import workoutStyles from "../styles/workoutStyles";
import WorkoutCard from "../components/WorkoutCard";
import { deleteWorkout } from "../services/storageService";

const ViewWorkoutsScreen = ({ navigation }) => {
  const { data: workouts, loading, error, refetch } = useWorkouts();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleWorkoutPress = (workout) => {
    navigation.navigate("WorkoutDetail", { item: workout });
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId);
      await refetch();

      if (Platform.OS === "web") {
        window.alert("Workout deleted successfully.");
      } else {
        Alert.alert("Success", "Workout deleted successfully.");
      }
    } catch (err) {
      if (Platform.OS === "web") {
        window.alert("Failed to delete workout.");
      } else {
        Alert.alert("Error", "Failed to delete workout.");
      }
    }
  };

  const confirmDeleteWorkout = (workoutId, workoutTitle) => {
    const message = `Are you sure you want to delete "${workoutTitle}"?`;

    if (Platform.OS === "web") {
      const confirmed = window.confirm(message);
      if (confirmed) {
        handleDeleteWorkout(workoutId);
      }
    } else {
      Alert.alert("Delete Workout", message, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteWorkout(workoutId),
        },
      ]);
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
              onDelete={confirmDeleteWorkout}
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
    </View>
  );
};

export default ViewWorkoutsScreen;