import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useFetch from "../hook/useFetch";
import workoutStyles from "../styles/workoutStyles";

const ViewWorkoutsScreen = ({ navigation }) => {
  const { data: workouts, loading, error, refetch } = useFetch();

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
            <TouchableOpacity
              key={item.id}
              style={workoutStyles.workoutCard}
              onPress={() => handleWorkoutPress(item)}
            >
              {item.image ? (
                <Image source={item.image} style={workoutStyles.workoutImage} />
              ) : null}

              <Text style={workoutStyles.workoutTitle}>
                {item.title || "Untitled Workout"}
              </Text>
              <Text style={workoutStyles.workoutDescription}>
                {item.description || "No description available"}
              </Text>
              <Text style={workoutStyles.workoutMeta}>
                Category: {item.category || "N/A"}
              </Text>
              <Text style={workoutStyles.workoutMeta}>
                Status: {item.completed ? "Done" : "To Do"}
              </Text>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          style={workoutStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={workoutStyles.backButtonText}>Previous</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ViewWorkoutsScreen;