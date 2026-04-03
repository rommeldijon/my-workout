import { useState, useEffect, useCallback } from "react";

import defaultWorkouts from "../data/defaultWorkouts";
import { getExerciseImage } from "../constants/images";
import { getWorkouts, saveWorkouts } from "../services/storageService";

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

      const storedWorkouts = await getWorkouts();

      if (storedWorkouts.length > 0) {
        setData(attachImages(storedWorkouts));
      } else {
        await saveWorkouts(defaultWorkouts);
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

export default useWorkouts;S