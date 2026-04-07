import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useWorkouts from "../hooks/useWorkouts";
import homeStyles from "../styles/homeStyles";
import { appImages } from "../constants/images";
import { showAlert } from "../utils/alertHelper";
import WorkoutCard from "../components/WorkoutCard";
import { getCurrentUser } from "../services/storageService";

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("User");
  const [loadingUser, setLoadingUser] = useState(true);
  const { data: workouts = [], loading, error, refetch } = useWorkouts();

  const loadUserData = async () => {
    try {
      setLoadingUser(true);

      const storedUser = await getCurrentUser();

      if (storedUser) {
        setUserName(storedUser.userName || "User");
      } else {
        setUserName("User");
      }
    } catch (error) {
      console.log("Error loading user data:", error);
      showAlert("Error", "Failed to load user data.");
    } finally {
      setLoadingUser(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
      refetch();
    }, [refetch])
  );

  const handleStartWorkout = () => {
    showAlert("Start Workout", "Workout session screen coming soon.");
  };

  const handleViewWorkouts = () => {
    navigation.navigate("ViewWorkouts");
  };

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleAddWorkout = () => {
    navigation.navigate("AddWorkout");
  };

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

  const todoWorkouts = workouts.filter((item) => !item.completed);
  const quickWarmUps = workouts.filter(
    (item) => item.category === "Quick Warm-ups"
  );
  const doneWorkouts = workouts.filter((item) => item.completed);

  return (
    <View style={homeStyles.container}>
      <ScrollView
        style={homeStyles.scrollView}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={homeStyles.screenHeader}>
          <TouchableOpacity
            style={homeStyles.headerButton}
            onPress={handleMenuPress}
          >
            <Text style={homeStyles.headerIcon}>☰</Text>
          </TouchableOpacity>

          <Image source={appImages.logo} resizeMode="contain" style={homeStyles.headerLogo} />

          <TouchableOpacity
            style={homeStyles.headerButton}
            onPress={handleSettingsPress}
          >
            <Text style={homeStyles.headerIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.welcomeCard}>
          <Text style={homeStyles.greeting}>
            {loadingUser ? "Loading..." : `Hello ${userName}!`}
          </Text>
          <Text style={homeStyles.subheading}>
            Use the + button to add exercise or select your next exercise below!
          </Text>
        </View>

        <View style={homeStyles.actionButtonsRow}>
          <TouchableOpacity
            style={homeStyles.smallActionButton}
            onPress={handleStartWorkout}
          >
            <Text style={homeStyles.smallActionButtonText}>Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.smallActionButton}
            onPress={handleViewWorkouts}
          >
            <Text style={homeStyles.smallActionButtonText}>View Workouts</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={homeStyles.placeholderCard}>
            <Text style={homeStyles.placeholderText}>Loading workouts...</Text>
          </View>
        )}

        {error ? (
          <View style={homeStyles.placeholderCard}>
            <Text style={homeStyles.placeholderText}>{error}</Text>
          </View>
        ) : null}

        {workouts.length === 0 && !loading && (
          <View style={homeStyles.placeholderCard}>
            <Text style={homeStyles.placeholderText}>
              No exercises yet. Use the + button to add your first exercise.
            </Text>
          </View>
        )}

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>To Do / Exercises</Text>

          {todoWorkouts.length > 0 ? (
            todoWorkouts.map((item) => (
              <WorkoutCard
                key={item.id}
                item={item}
                onPress={handleWorkoutPress}
                showCategory={false}
                showStatus={false}
              />
            ))
          ) : (
            <Text style={homeStyles.emptySectionText}>
              No exercises to do yet. Use the + button to add new exercise!
            </Text>
          )}
        </View>

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Quick Warm-ups</Text>

          {quickWarmUps.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={homeStyles.horizontalScroll}
            >
              {quickWarmUps.map((item) => (
                <WorkoutCard
                  key={item.id}
                  item={item}
                  onPress={handleWorkoutPress}
                  variant="horizontal"
                  showCategory={false}
                  showStatus={false}
                />
              ))}
            </ScrollView>
          ) : (
            <Text style={homeStyles.emptySectionText}>
              No quick warm-ups yet. Add one with the + button.
            </Text>
          )}
        </View>

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Done</Text>

          {doneWorkouts.length > 0 ? (
            doneWorkouts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={homeStyles.doneWorkoutCard}
                onPress={() => handleWorkoutPress(item)}
              >
                {item.image && (
                  <Image source={item.image} resizeMode="contain" style={homeStyles.workoutImage} />
                )}

                <Text style={homeStyles.workoutTitle}>{item.title}</Text>
                <Text style={homeStyles.workoutDescription}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={homeStyles.emptySectionText}>
              No completed exercises yet.
            </Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={homeStyles.fab} onPress={handleAddWorkout}>
        <Text style={homeStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;