import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import useFetch from "../hook/useFetch";
import homeStyles from "../styles/homeStyles";
import { appImages } from "../constants/images";
import storageKeys from "../constants/storageKeys";
import { showAlert } from "../utils/alertHelper";

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("User");
  const [loadingUser, setLoadingUser] = useState(true);
  const { data: workouts = [], loading, error, refetch } = useFetch();

  const loadUserData = async () => {
    try {
      setLoadingUser(true);

      const storedUser = await AsyncStorage.getItem(storageKeys.userDetails);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser?.userName || "User");
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(storageKeys.loggedInUser);
      navigation.replace("Login");
    } catch (error) {
      console.log("Logout error:", error);
      showAlert("Error", "Failed to log out.");
    }
  };

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
    navigation.navigate("WorkoutDetail", { item: workout });
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

          <Text style={homeStyles.headerTitle}>Home</Text>

          <TouchableOpacity
            style={homeStyles.headerButton}
            onPress={handleSettingsPress}
          >
            <Text style={homeStyles.headerIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        <View style={homeStyles.welcomeCard}>
          <Image source={appImages.logo} style={homeStyles.logo} />
          <Text style={homeStyles.greeting}>
            {loadingUser ? "Loading..." : `Hello ${userName}!`}
          </Text>
          <Text style={homeStyles.subheading}>
            Use the + button to add exercise or select your next exercise below!
          </Text>
        </View>

        <View style={homeStyles.actionButtonsContainer}>
          <TouchableOpacity
            style={homeStyles.primaryButton}
            onPress={handleStartWorkout}
          >
            <Text style={homeStyles.primaryButtonText}>Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.primaryButton}
            onPress={handleViewWorkouts}
          >
            <Text style={homeStyles.primaryButtonText}>View Workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={homeStyles.logoutButtonText}>Logout</Text>
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
              <TouchableOpacity
                key={item.id}
                style={homeStyles.workoutCard}
                onPress={() => handleWorkoutPress(item)}
              >
                {item.image && (
                  <Image
                    source={item.image}
                    style={homeStyles.workoutImage}
                  />
                )}

                <Text style={homeStyles.workoutTitle}>{item.title}</Text>
                <Text style={homeStyles.workoutDescription}>
                  {item.description}
                </Text>
              </TouchableOpacity>
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
                <TouchableOpacity
                  key={item.id}
                  style={homeStyles.horizontalWorkoutCard}
                  onPress={() => handleWorkoutPress(item)}
                >
                  {item.image && (
                    <Image
                      source={item.image}
                      style={homeStyles.horizontalWorkoutImage}
                    />
                  )}

                  <Text style={homeStyles.workoutTitle}>{item.title}</Text>
                  <Text style={homeStyles.workoutDescription}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
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
                  <Image
                    source={item.image}
                    style={homeStyles.workoutImage}
                  />
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