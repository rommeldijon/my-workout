import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useWorkouts from "../hooks/useWorkouts";
import workoutStyles from "../styles/workoutStyles";
import WorkoutCard from "../components/WorkoutCard";

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