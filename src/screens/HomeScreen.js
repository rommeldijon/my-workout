import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const showAlert = (title, message, onOk) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(
        title,
        message,
        onOk ? [{ text: "OK", onPress: onOk }] : undefined
      );
    }
  };

  const defaultWorkouts = [
    {
      id: "1",
      title: "Push Ups",
      description: "3 sets of 10 reps",
      category: "Exercises",
      completed: false,
    },
    {
      id: "2",
      title: "Jumping Jacks",
      description: "2 minutes warm-up",
      category: "Quick Warm-ups",
      completed: false,
    },
    {
      id: "3",
      title: "Bodyweight Squats",
      description: "3 sets of 12 reps",
      category: "Exercises",
      completed: true,
    },
  ];

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const storedUser = await AsyncStorage.getItem("userDetails");
      const storedWorkouts = await AsyncStorage.getItem("workouts");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.userName || "User");
      } else {
        setUserName("User");
      }

      if (!storedWorkouts) {
        await AsyncStorage.setItem("workouts", JSON.stringify(defaultWorkouts));
        setWorkouts(defaultWorkouts);
      } else {
        const parsedWorkouts = JSON.parse(storedWorkouts);
        setWorkouts(Array.isArray(parsedWorkouts) ? parsedWorkouts : []);
      }
    } catch (error) {
      console.log("Error loading home data:", error);
      showAlert("Error", "Failed to load home screen data.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedInUser");
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
    showAlert("Menu", "Drawer menu coming soon.");
  };

  const handleSettingsPress = () => {
    showAlert("Settings", "Settings screen coming soon.");
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
    <View style={styles.container}>
       <Image
         source={require("../../assets/logo.png")}
         style={styles.logo}
       />
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
          <Text style={styles.iconText}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>
          {loading ? "Loading..." : "Enter or Select your next exercise"}
        </Text>

        <TouchableOpacity style={styles.iconButton} onPress={handleSettingsPress}>
          <Text style={styles.iconText}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeCard}>
          <Text style={styles.greeting}>Hello {userName}!</Text>
          <Text style={styles.subheading}>
            Use the + button to add or select your next exercise!
          </Text>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleStartWorkout}>
            <Text style={styles.primaryButtonText}>Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleViewWorkouts}>
            <Text style={styles.primaryButtonText}>View Workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {workouts.length === 0 && !loading && (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>
              No exercises yet. Use the + button to add your first exercise.
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>To Do / Exercises</Text>

          {todoWorkouts.length > 0 ? (
            todoWorkouts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.workoutCard}
                onPress={() => handleWorkoutPress(item)}
              >
                <Text style={styles.workoutTitle}>{item.title}</Text>
                <Text style={styles.workoutDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptySectionText}>
              No exercises to do yet. Use the + button to add new exercise!
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Warm-ups</Text>

          {quickWarmUps.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {quickWarmUps.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.horizontalWorkoutCard}
                  onPress={() => handleWorkoutPress(item)}
                >
                  <Text style={styles.workoutTitle}>{item.title}</Text>
                  <Text style={styles.workoutDescription}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptySectionText}>
              No quick warm-ups yet. Add one with the + button.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Done</Text>

          {doneWorkouts.length > 0 ? (
            doneWorkouts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.doneWorkoutCard}
                onPress={() => handleWorkoutPress(item)}
              >
                <Text style={styles.workoutTitle}>{item.title}</Text>
                <Text style={styles.workoutDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptySectionText}>
              No completed exercises yet.
            </Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddWorkout}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "#2196F3",
  },
  iconButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  topBarTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  actionButtonsContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  placeholderCard: {
    backgroundColor: "#fff3cd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  placeholderText: {
    color: "#7a5c00",
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  workoutCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  horizontalScroll: {
    paddingRight: 10,
  },
  horizontalWorkoutCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 220,
    elevation: 2,
  },
  doneWorkoutCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  workoutTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  workoutDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  emptySectionText: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginTop: -2,
  },
  logo: {
  width: 100,
  height: 100,
  resizeMode: "contain",
  alignSelf: "center",
  marginBottom: 20,
  },
});