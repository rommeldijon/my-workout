import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "workouts";

const exerciseImages = {
  pushup: require("../../assets/exercises/push_ups.png"),
  squat: require("../../assets/exercises/squat.png"),
  jumpingjacks: require("../../assets/exercises/jumping_jacks.png"),
  plank: require("../../assets/exercises/plank_on_elbows.png"),
};

const defaultExercises = [
  {
    id: "1",
    title: "Push Ups",
    description:
      "A bodyweight exercise that strengthens the chest, shoulders, and triceps. Do for 10 mins - 3 sets of 15 reps",
    category: "Upper Body Strengthening",
    completed: false,
    imageKey: "pushup",
  },
  {
    id: "2",
    title: "Squats",
    description:
      "A lower-body exercise that targets the thighs, hips, and glutes. Do for 15 mins - 3 sets of 15 reps",
    category: "Lower Body Strengthening",
    completed: false,
    imageKey: "squat",
  },
  {
    id: "3",
    title: "Jumping Jacks",
    description:
      "A full-body cardio exercise that improves endurance and coordination. Do for 10 mins - 3 sets of 15 reps",
    category: "Quick Warm-ups",
    completed: false,
    imageKey: "jumpingjacks",
  },
  {
    id: "4",
    title: "Plank on Elbows",
    description:
      "A core-strengthening exercise that improves stability and posture. Do for 15 mins - 3 reps, hold for 30 secs. each",
    category: "Core Strengthening",
    completed: false,
    imageKey: "plank",
  },
];

const attachImages = (items) => {
  return items.map((item) => ({
    ...item,
    image: exerciseImages[item.imageKey] || null,
  }));
};

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const storedWorkouts = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedWorkouts) {
        const parsedWorkouts = JSON.parse(storedWorkouts);
        setData(attachImages(parsedWorkouts));
      } else {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(defaultExercises)
        );
        setData(attachImages(defaultExercises));
      }
    } catch (err) {
      console.log("useFetch error:", err);
      setError("Failed to load workouts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return {
    data,
    loading,
    error,
    refetch: fetchWorkouts,
  };
};

export default useFetch;