import { useState, useEffect, useCallback } from "react";

import defaultWorkouts from "../data/defaultWorkouts";
import { getExerciseImage } from "../constants/images";
import { getWorkouts, saveWorkouts } from "../services/storageService";

// Attach the correct image source to each workout.
// This now supports BOTH:
// 1. built-in local images using imageKey
// 2. remote images using imageUri
const attachImages = (items) => {
  return items.map((item) => ({
    ...item,

    // Keep image for backward compatibility with any screens
    // that still read item.image directly.
    image: getExerciseImage(item.imageKey, item.imageUri),

    // Also normalize status so older workouts still work correctly.
    status: item.status || (item.completed ? "Done" : "To Do"),
  }));
};

const useWorkouts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const storedWorkouts = await getWorkouts();

      if (storedWorkouts.length > 0) {
        setData(attachImages(storedWorkouts));
      } else {
        // Seed storage with default workouts the first time the app runs.
        await saveWorkouts(defaultWorkouts);
        setData(attachImages(defaultWorkouts));
      }
    } catch (err) {
      console.log("useWorkouts error:", err);
      setError("Failed to load workouts.");
      setData([]);
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

export default useWorkouts;