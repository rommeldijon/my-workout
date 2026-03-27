import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ViewWorkoutsScreen = ({ navigation }) => {
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

  const exerciseImages = {
    pushup: require("../../assets/exercises/push_ups.png"),
    squat: require("../../assets/exercises/squat.png"),
    jumpingjacks: require("../../assets/exercises/jumping_jacks.png"),
    plank: require("../../assets/exercises/plank_on_elbows.png"),
  };

  const loadWorkouts = async () => {
    try {
      setLoading(true);

      const storedWorkouts = await AsyncStorage.getItem("workouts");
      const parsedWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];

      setWorkouts(Array.isArray(parsedWorkouts) ? parsedWorkouts : []);
    } catch (error) {
      console.log("Error loading workouts:", error);
      showAlert("Error", "Failed to load workouts.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  const handleWorkoutPress = (workout) => {
    navigation.navigate("WorkoutDetail", { item: workout });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Workouts</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text style={styles.infoText}>Loading workouts...</Text>
        ) : workouts.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.infoText}>
              No workouts found yet. Go back and use the + button to add one.
            </Text>
          </View>
        ) : (
          workouts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.workoutCard}
              onPress={() => handleWorkoutPress(item)}
            >
              {item.imageKey && exerciseImages[item.imageKey] ? (
                <Image
                  source={exerciseImages[item.imageKey]}
                  style={styles.workoutImage}
                />
              ) : null}

              <Text style={styles.workoutTitle}>{item.title}</Text>
              <Text style={styles.workoutDescription}>{item.description}</Text>
              <Text style={styles.workoutMeta}>
                Category: {item.category || "N/A"}
              </Text>
              <Text style={styles.workoutMeta}>
                Status: {item.completed ? "Done" : "To Do"}
              </Text>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ViewWorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
  },
  workoutCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  workoutDescription: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
    lineHeight: 22,
  },
  workoutMeta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  workoutImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "cover",
  },
  backButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});