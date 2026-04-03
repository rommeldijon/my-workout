import AsyncStorage from "@react-native-async-storage/async-storage";
import storageKeys from "../constants/storageKeys";

export const getWorkouts = async () => {
  const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);
  return storedWorkouts ? JSON.parse(storedWorkouts) : [];
};

export const saveWorkouts = async (workouts) => {
  await AsyncStorage.setItem(storageKeys.workouts, JSON.stringify(workouts));
};

export const addWorkout = async (newWorkout) => {
  const existingWorkouts = await getWorkouts();
  const updatedWorkouts = [...existingWorkouts, newWorkout];
  await saveWorkouts(updatedWorkouts);
  return updatedWorkouts;
};