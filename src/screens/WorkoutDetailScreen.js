import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

import detailStyles from "../styles/detailStyles";
import { getExerciseImage } from "../constants/images";

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  const workoutImage = item?.imageKey ? getExerciseImage(item.imageKey) : null;

  return (
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
        style={detailStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={detailStyles.backButtonText}>Previous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkoutDetailScreen;