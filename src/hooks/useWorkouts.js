import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import storageKeys from "../constants/storageKeys";
import defaultWorkouts from "../data/defaultWorkouts";
import { getExerciseImage } from "../constants/images";

const attachImages = (items) => {
  return items.map((item) => ({
    ...item,
    image: getExerciseImage(item.imageKey),
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

      const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);

      if (storedWorkouts) {
        const parsedWorkouts = JSON.parse(storedWorkouts);
        setData(attachImages(parsedWorkouts));
      } else {
        await AsyncStorage.setItem(
          storageKeys.workouts,
          JSON.stringify(defaultWorkouts)
        );
        setData(attachImages(defaultWorkouts));
      }
    } catch (err) {
      console.log("useWorkouts error:", err);
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

export default useWorkouts;