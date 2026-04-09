import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useWorkouts from "../hooks/useWorkouts";
import homeStyles from "../styles/homeStyles";
import { appImages } from "../constants/images";
import { showAlert } from "../utils/alertHelper";
import WorkoutCard from "../components/WorkoutCard";
import { getCurrentUser, deleteWorkout } from "../services/storageService";

const HomeScreen = ({ navigation }) => {
  // Store the current user's display name for the greeting section.
  const [userName, setUserName] = useState("User");

  // Track whether the user data is still loading.
  const [loadingUser, setLoadingUser] = useState(true);

  // Get workouts and refresh function from the custom hook.
  const { data: workouts = [], loading, error, refetch } = useWorkouts();

  // Delete modal state.
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [selectedWorkoutTitle, setSelectedWorkoutTitle] = useState("");

  // Load the current logged-in user so we can show the username on the screen.
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

  // Reload both the user data and workouts whenever this screen becomes active.
  useFocusEffect(
    useCallback(() => {
      loadUserData();
      refetch();
    }, [refetch])
  );

  // Placeholder action for future workout session flow.
  const handleStartWorkout = () => {
    showAlert("Start Workout", "Workout session screen coming soon.");
  };

  // Open the full workout list screen.
  const handleViewWorkouts = () => {
    navigation.navigate("ViewWorkouts");
  };

  // Open the drawer menu.
  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  // Go to settings.
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  // Open the add workout screen.
  const handleAddWorkout = () => {
    navigation.navigate("AddWorkout");
  };

  // Open the workout detail screen when a workout card is pressed.
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

  // When the user presses the edit icon on a Home screen workout card,
  // send them to the workout detail screen where editing is supported.
  const handleStartEdit = (workout) => {
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

  // Open the delete confirmation modal.
  const openDeleteModal = (workoutId, workoutTitle) => {
    setSelectedWorkoutId(workoutId);
    setSelectedWorkoutTitle(workoutTitle);
    setDeleteModalVisible(true);
  };

  // Close the delete confirmation modal and clear selected workout info.
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedWorkoutId(null);
    setSelectedWorkoutTitle("");
  };

  // Delete the selected workout from storage, then refresh the Home screen data.
  const handleDeleteWorkout = async () => {
    try {
      if (!selectedWorkoutId) return;

      await deleteWorkout(selectedWorkoutId);
      await refetch();

      closeDeleteModal();
      showAlert("Success", "Workout deleted successfully.");
    } catch (error) {
      console.log("Delete workout error:", error);
      closeDeleteModal();
      showAlert("Error", "Failed to delete workout.");
    }
  };

  // Build filtered workout sections for the Home screen.
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
        {/* Top header with drawer button, logo, and settings button */}
        <View style={homeStyles.screenHeader}>
          <TouchableOpacity
            style={homeStyles.headerButton}
            onPress={handleMenuPress}
          >
            <Text style={homeStyles.headerIcon}>☰</Text>
          </TouchableOpacity>

          <Image
            source={appImages.logo}
            resizeMode="contain"
            style={homeStyles.headerLogo}
          />

          <TouchableOpacity
            style={homeStyles.headerButton}
            onPress={handleSettingsPress}
          >
            <Text style={homeStyles.headerIcon}>⚙</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome card */}
        <View style={homeStyles.welcomeCard}>
          <Text style={homeStyles.greeting}>
            {loadingUser ? "Loading..." : `Hello ${userName}!`}
          </Text>
          <Text style={homeStyles.subheading}>
            Use the + button to add exercise or select your next exercise below!
          </Text>
        </View>

        {/* Main action buttons */}
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

        {/* Loading state */}
        {loading && (
          <View style={homeStyles.placeholderCard}>
            <Text style={homeStyles.placeholderText}>Loading workouts...</Text>
          </View>
        )}

        {/* Error state */}
        {error ? (
          <View style={homeStyles.placeholderCard}>
            <Text style={homeStyles.placeholderText}>{error}</Text>
          </View>
        ) : null}

        {/* Empty state */}
        {workouts.length === 0 && !loading && (
          <View style={homeStyles.placeholderCard}>
            <Text style={homeStyles.placeholderText}>
              No exercises yet. Use the + button to add your first exercise.
            </Text>
          </View>
        )}

        {/* To Do / Exercises section */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>To Do / Exercises</Text>

          {todoWorkouts.length > 0 ? (
            todoWorkouts.map((item) => (
              <WorkoutCard
                key={item.id}
                item={item}
                onPress={handleWorkoutPress}
                onStartEdit={handleStartEdit}
                onDelete={openDeleteModal}
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

        {/* Quick Warm-ups section */}
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

        {/* Done section */}
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
                    resizeMode="contain"
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

      {/* Delete confirmation modal for Home screen workout cards */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 380,
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 12,
                textAlign: "center",
                color: "#222222",
              }}
            >
              Delete Workout
            </Text>

            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                textAlign: "center",
                color: "#555555",
                marginBottom: 20,
              }}
            >
              Are you sure you want to delete "{selectedWorkoutTitle}"?
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={closeDeleteModal}
                style={{
                  flex: 1,
                  backgroundColor: "#D9D9D9",
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDeleteWorkout}
                style={{
                  flex: 1,
                  backgroundColor: "#D9534F",
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating action button */}
      <TouchableOpacity style={homeStyles.fab} onPress={handleAddWorkout}>
        <Text style={homeStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;